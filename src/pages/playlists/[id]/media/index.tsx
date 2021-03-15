import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {FC} from 'react'
import {Layout} from '../../../../components'
import {HorizontalLine, Tag} from '../../../../components/common'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faEdit, faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import {gql, useQuery} from '@apollo/client'
import {
  Query,
  QueryMediaArgs,
  QueryPlaylistsArgs,
} from '../../../../types/generated/graphql'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { MediaCard } from '../../../../components/Media'

const MenuButton = styled.div`
  background: white;
  color: #ed827b;

  &:hover {
    background: #ed827b;
    color: white;
  }
`

const GET_PLAYLIST = gql`
  query GetPlaylist($args: GetPlaylistArgs) {
    playlists(args: $args) {
      _id
      name
      description
      tagIds
    }
  }
`

const SideBox: FC = () => {
  const router = useRouter()
  const {id: playlistId} = router.query

  if (!playlistId) {
    return <h1>Loading...</h1>
  }

  const {loading: playlistLoading, data: playlistData} = useQuery<
    Pick<Query, 'playlists'>,
    QueryPlaylistsArgs
  >(GET_PLAYLIST, {
    variables: {
      args: {
        ids: [playlistId as string,]
      },
    },
  })

  if (playlistLoading) {
    return <h1>Loading...</h1>
  }

  const {playlists} = playlistData
  const {name, description} = playlists[0]

  const menuButtons = [
    {
      name: 'Add Media',
      icon: faPlus,
      onClick: () => {
        router.push(`/playlists/${playlistId}/media/new`)
      }
    },
    {
      name: 'Edit Media',
      icon: faEdit,
    },
    {
      name: 'Edit Playlist',
      icon: faPencilAlt,
    },
    {
      name: 'Delete Playlist',
      icon: faTrashAlt,
    },
  ]

  const tags = [
    {
      id: 0,
      name: 'Science',
      color: '#ff934f',
    },
    {
      id: 1,
      name: 'Art',
      color: '#91F5AD',
    },
    {
      id: 2,
      name: 'Japanese',
      color: '#AEC5EB',
    },
  ]

  return (
    <div className="px-4 py-6">
      <div>
        <h1 className="text-xl text-gray-700 font-bold">{name}</h1>

        <div className="flex flex-row flex-wrap items-center mt-1">
          {tags.map(({id, name, color}) => (
            <Tag
              key={id}
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

const GET_MEDIA = gql`
  query GetMedia($args: GetMediaArgs) {
    media(args: $args) {
      _id
      playlistId
      name
      description
      tagIds
      type
      paragraph
      _updatedAt
    }
  }
`

const Playlist: NextPage = () => {
  const router = useRouter()
  const {id: playlistId} = router.query

  if (!playlistId) {
    return <h1>Loading...</h1>
  }

  const {loading, data} = useQuery<Pick<Query, 'media'>, QueryMediaArgs>(GET_MEDIA, {
    variables: {
      args: {
        filter: {
          playlistId: playlistId as string
        }
      }
    }
  })

  if (loading) {
    return <h1>Loading...</h1>
  }

  const {media} = data

  return (
    <Layout SideComponent={SideBox}>
      <div className="px-10 mt-8 mx-auto">
        {media.map((mediaOne) => (
          <MediaCard key={mediaOne._id} media={mediaOne} />
        ))}
      </div>
    </Layout>
  )
}

export default Playlist
