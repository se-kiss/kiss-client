import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {FC} from 'react'
import {Layout} from '../../../../components'
import {
  HorizontalLine,
  Tag,
  OutlinedButton,
} from '../../../../components/common'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import usePlaylistForm, {
  PlaylistFormActionType,
  PlaylistFormType,
} from '../../../../lib/usePlaylistForm'
import useModal, {ModalActionTypes} from '../../../../lib/useModal'
import styled from 'styled-components'
import {gql, useQuery, useMutation} from '@apollo/client'
import {
  Mutation,
  MutationDeletePlaylistArgs,
  Playlist,
  Query,
  QueryPlaylistsArgs,
} from '../../../../types/generated/graphql'
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons'
import {MediaCard} from '../../../../components/Media'
import {PlaylistForm} from '../../../../components/Playlist'

const MenuButton = styled.div`
  background: white;
  color: #ed827b;

  &:hover {
    background: #ed827b;
    color: white;
  }
`

const DELETE_PLAYLIST = gql`
  mutation DeletePlaylist($args: DeletePlaylistArgs!) {
    deletePlaylist(args: $args) {
      _id
    }
  }
`

const ConfirmDeletePlaylist: FC = () => {
  const router = useRouter()
  const {id: playlistId} = router.query

  const {dispatch: dispatchModal} = useModal()
  const [deletePlaylist] = useMutation<
    Pick<Mutation, 'deletePlaylist'>,
    MutationDeletePlaylistArgs
  >(DELETE_PLAYLIST)

  if (!playlistId) {
    return <h1>Loading...</h1>
  }

  const closeModal = () =>
    dispatchModal({
      type: ModalActionTypes.CloseModal,
    })

  const onModalClose = () => {
    closeModal()
  }

  const onConfirm = () => {
    deletePlaylist({
      variables: {
        args: {
          _id: playlistId as string,
        },
      },
      update: (cache) => {
        cache.reset()
        router.push('/playlists')
      },
    })
    closeModal()
  }

  return (
    <div className="p-8">
      <h1 className="w-full h-60 flex-1 text-2xl text-gray-700 text-center font-medium">
        Delete This Playlist ?
      </h1>

      <div className="flex flex-row justify-around">
        <OutlinedButton
          className="text-lg font-medium px-4 py-1 rounded focus:outline-none"
          onClick={onModalClose}
        >
          Cancel
        </OutlinedButton>
        <OutlinedButton
          className="text-lg font-medium px-4 py-1 rounded focus:outline-none"
          onClick={onConfirm}
        >
          Confirm
        </OutlinedButton>
      </div>
    </div>
  )
}

const GET_PLAYLIST = gql`
  query GetPlaylist($args: GetPlaylistArgs) {
    playlists(args: $args) {
      _id
      name
      description
      tags {
        _id
        name
        color
      }
      media {
        _id
        name
        description
        tags {
          _id
          name
          color
        }
        playlist {
          _id
          user {
            _id
            firstName
            lastName
          }
        }
        comments {
          _id
        }
        type
        paragraph
        _updatedAt
      }
    }
  }
`

type SideBoxProps = {
  playlist: Playlist
}

const SideBox: FC<SideBoxProps> = ({playlist}) => {
  const router = useRouter()
  const {id: playlistId} = router.query

  const {dispatch: dispatchModal} = useModal()
  const {dispatch: dispatchPlaylistForm} = usePlaylistForm()

  const {name, description, tags} = playlist

  const menuButtons = [
    {
      name: 'Add Media',
      icon: faPlus,
      onClick: () => {
        router.push(`/playlists/${playlistId}/media/new`)
      },
    },
    {
      name: 'Edit Playlist',
      icon: faPencilAlt,
      onClick: () => {
        dispatchPlaylistForm({
          type: PlaylistFormActionType.ModifyForm,
          payload: {
            type: PlaylistFormType.Edit,
            id: playlistId as string,
            name,
            description,
          },
        })

        dispatchModal({
          type: ModalActionTypes.ShowModal,
          payload: {Content: PlaylistForm},
        })
      },
    },
    {
      name: 'Delete Playlist',
      icon: faTrashAlt,
      onClick: () => {
        dispatchModal({
          type: ModalActionTypes.ShowModal,
          payload: {
            Content: ConfirmDeletePlaylist,
          },
        })
      },
    },
  ]

  return (
    <div className="px-4 py-6">
      <div>
        <h1 className="text-xl text-gray-700 font-bold">{name}</h1>

        <div className="flex flex-row flex-wrap items-center mt-1">
          {tags.map(({_id, name, color}) => (
            <Tag
              key={_id}
              color={color}
              className="px-1 text-xs text-gray-700 mt-1 mr-1"
            >
              {name}
            </Tag>
          ))}
        </div>

        <p className="text-sm text-gray-700 font-medium mt-2">{description}</p>
      </div>

      <HorizontalLine className="my-4" />

      <div>
        {menuButtons.map(({name, icon, onClick}) => (
          <MenuButton
            key={name}
            className="rounded p-2 cursor-pointer flex flex-row items-center"
            onClick={onClick}
          >
            <FontAwesomeIcon icon={icon} />
            <span className="text-md font-medium ml-4">{name}</span>
          </MenuButton>
        ))}
      </div>
    </div>
  )
}

const PlaylistPage: NextPage = () => {
  const router = useRouter()
  const {id: playlistId} = router.query

  if (!playlistId) {
    return <h1>Loading...</h1>
  }

  const {loading, data} = useQuery<
    Pick<Query, 'playlists'>,
    QueryPlaylistsArgs
  >(GET_PLAYLIST, {
    variables: {
      args: {
        ids: [playlistId as string],
      },
    },
  })

  if (loading) {
    return <h1>Loading...</h1>
  }

  const {playlists} = data
  const {media} = playlists[0]

  return (
    <Layout SideComponent={() => <SideBox playlist={playlists[0]} />}>
      <div className="px-10 mt-8 mx-auto">
        {media.map((mediaOne) => (
          <MediaCard key={mediaOne._id} media={mediaOne} />
        ))}
      </div>
    </Layout>
  )
}

export default PlaylistPage
