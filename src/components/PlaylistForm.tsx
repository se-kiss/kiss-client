import {FC} from 'react'
import useModal, {ModalActionTypes} from '../lib/useModal'
import styled from 'styled-components'

const OutlinedButton = styled.button`
  border: 2px solid #626aaa;
  color: #626aaa;

  &:hover {
    color: white;
    background: #626aaa;
  }
`

const PlaylistForm: FC = () => {
  const {dispatch: dispatchModal} = useModal()
  const onModalClose = () => {
    dispatchModal({
      type: ModalActionTypes.CloseModal,
    })
  }

  return (
    <div className="px-10 py-4">
      <h1 className="text-2xl font-semibold">Create Playlist</h1>

      <div className="mt-4">
        <h3 className="text-lg font-normal mb-2">Name</h3>
        <input
          type="text"
          className="w-full border border-gray-400 pl-2 py-1 text-lg rounded focus:outline-none"
        />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-normal mb-2">Description</h3>
        <input
          type="text"
          className="w-full border border-gray-400 pl-2 py-1 text-lg rounded focus:outline-none"
        />
      </div>

      <div className="mt-8 flex flex-row justify-around">
        <OutlinedButton
          className="text-lg font-medium px-4 py-1 rounded focus:outline-none"
          onClick={onModalClose}
        >
          Cancel
        </OutlinedButton>

        <OutlinedButton className="text-lg font-medium px-4 py-1 rounded focus:outline-none">
          Create
        </OutlinedButton>
      </div>
    </div>
  )
}

export default PlaylistForm
