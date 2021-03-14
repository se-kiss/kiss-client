import {FC} from 'react'
import useModal, {ModalActionTypes} from '../../lib/useModal'
import usePlaylistForm, {PlaylistFormProvider} from '../../lib/usePlaylistForm'
import {OutlinedButton} from '../'

const Form: FC = () => {
  const {state: formState, dispatch: dispatchForm} = usePlaylistForm()
  const {dispatch: dispatchModal} = useModal()

  const clearForm = () =>
    dispatchForm({
      name: '',
      description: '',
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
    onModalClose()
  }

  return (
    <div className="flex-1 p-8">
      <h1 className="text-2xl text-gray-700 font-semibold">Create Playlist</h1>

      <div className="mt-4">
        <h3 className="text-lg text-gray-700 font-medium mb-2">Name</h3>
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={(e) => dispatchForm({[e.target.name]: e.target.value})}
          className="w-full border border-gray-300 pl-2 py-1 text-lg rounded focus:outline-none"
        />
      </div>

      <div className="mt-6">
        <h3 className="text-lg text-gray-700 font-medium mb-2">Description</h3>
        <textarea
          name="description"
          onChange={(e) => dispatchForm({[e.target.name]: e.target.value})}
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
          onClick={onPlaylistCreate}
        >
          Create
        </OutlinedButton>
      </div>
    </div>
  )
}

const PlaylistForm: FC = () => {
  return (
    <PlaylistFormProvider>
      <div className="flex flex-row p-6">
        <div className="flex-1 m-auto">
          <img src="/undraw_knowledge_g5gf.svg" />
        </div>

        <Form />
      </div>
    </PlaylistFormProvider>
  )
}

export default PlaylistForm
