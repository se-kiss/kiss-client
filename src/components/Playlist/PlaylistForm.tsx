import {useRouter} from 'next/router'
import {FC} from 'react'
import useModal, {ModalActionTypes} from '../../lib/useModal'
import usePlaylistForm, {
  PlaylistFormActionType,
  PlaylistFormType,
} from '../../lib/usePlaylistForm'
import {OutlinedButton} from '../common'
import {gql, useMutation} from '@apollo/client'
import {
  Mutation,
  MutationCreatePlaylistArgs,
  MutationUpdatePlaylistArgs,
} from '../../types/generated/graphql'

const CREATE_PLAYLIST = gql`
  mutation CreatePlaylist($args: CreatePlaylistArgs!) {
    createPlaylist(args: $args) {
      _id
      name
      ownerId
      description
      _createdAt
      _updatedAt
    }
  }
`

const UPDATE_PLAYLIST = gql`
  mutation UpdatePlaylist($args: UpdatePlaylistArgs!) {
    updatePlaylist(args: $args) {
      _id
      name
      ownerId
      description
      _createdAt
      _updatedAt
    }
  }
`

const Form: FC = () => {
  const router = useRouter()
  const {state: formState, dispatch: dispatchForm} = usePlaylistForm()
  const {dispatch: dispatchModal} = useModal()

  const [createPlaylist] = useMutation<
    Pick<Mutation, 'createPlaylist'>,
    MutationCreatePlaylistArgs
  >(CREATE_PLAYLIST)

  const [updatePlaylist] = useMutation<
    Pick<Mutation, 'updatePlaylist'>,
    MutationUpdatePlaylistArgs
  >(UPDATE_PLAYLIST)

  const formTitle = ((type) => {
    switch (type) {
      case PlaylistFormType.Create:
        return 'Create Playlist'
      case PlaylistFormType.Edit:
        return 'Edit Playlist'
    }
  })(formState.type)

  const clearForm = () =>
    dispatchForm({
      type: PlaylistFormActionType.ResetForm,
    })

  const closeModal = () =>
    dispatchModal({
      type: ModalActionTypes.CloseModal,
    })

  const onModalClose = () => {
    closeModal()
    clearForm()
  }

  const onPlaylistCreate = () => {
    const {name, description} = formState
    // TODO: Replace hardcode with userId
    createPlaylist({
      variables: {
        args: {
          name,
          description,
          ownerId: '605106b54d80c94de1f2d1d3',
        },
      },
      update: (cache, {data}) => {
        cache.reset()
        
        const {_id} = data.createPlaylist
        router.push(`/playlists/${_id}/media`)
      },
    })
    onModalClose()
  }

  const onPlaylistUpdate = () => {
    const {id: _id, name, description} = formState
    updatePlaylist({
      variables: {
        args: {
          _id,
          name,
          description,
        }
      },
      update: (cache) => {
        cache.reset()
      }
    })
    onModalClose()
  }

  return (
    <div className="flex-1 p-8">
      <h1 className="text-2xl text-gray-700 font-semibold">{formTitle}</h1>

      <div className="mt-4">
        <h3 className="text-lg text-gray-700 font-medium mb-2">Name</h3>
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={(e) =>
            dispatchForm({
              type: PlaylistFormActionType.ModifyForm,
              payload: {[e.target.name]: e.target.value},
            })
          }
          className="w-full border border-gray-300 pl-2 py-1 text-lg rounded focus:outline-none"
        />
      </div>

      <div className="mt-6">
        <h3 className="text-lg text-gray-700 font-medium mb-2">Description</h3>
        <textarea
          name="description"
          onChange={(e) =>
            dispatchForm({
              type: PlaylistFormActionType.ModifyForm,
              payload: {[e.target.name]: e.target.value},
            })
          }
          value={formState.description}
          rows={4}
          className="w-full border border-gray-300 pl-2 py-1 text-lg rounded resize-none focus:outline-none"
        />
      </div>

      <div className="mt-8 flex flex-row justify-around">
        <OutlinedButton
          className="text-lg font-medium px-4 py-1 rounded focus:outline-none"
          onClick={onModalClose}
        >
          Cancel
        </OutlinedButton>

        <OutlinedButton
          className="text-lg font-medium px-4 py-1 rounded focus:outline-none"
          onClick={
            formState.type === PlaylistFormType.Create
              ? onPlaylistCreate
              : onPlaylistUpdate
          }
        >
          {formState.type === PlaylistFormType.Create ? 'Create' : 'Update'}
        </OutlinedButton>
      </div>
    </div>
  )
}

const PlaylistForm: FC = () => {
  return (
    <div className="flex flex-row p-6">
      <div className="flex-1 m-auto">
        <img src="/undraw_knowledge_g5gf.svg" />
      </div>

      <Form />
    </div>
  )
}

export default PlaylistForm
