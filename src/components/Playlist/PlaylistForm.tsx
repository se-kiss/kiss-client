import {FC} from 'react'
import useModal, {ModalActionTypes} from '../../lib/useModal'
import styled from 'styled-components'

const OutlinedButton = styled.button`
  border: 1px solid #ff8a83;
  color: #ff8a83;

  &:hover {
    color: white;
    background: #ff8a83;
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
    <div className="flex flex-row p-6">
      <div className="flex-1 m-auto">
        <img src="/undraw_knowledge_g5gf.svg" className="" />
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-2xl text-gray-700 font-semibold">
          Create Playlist
        </h1>

        <div className="mt-4">
          <h3 className="text-lg text-gray-700 font-medium mb-2">Name</h3>
          <input
            type="text"
            className="w-full border border-gray-400 pl-2 py-1 text-lg rounded focus:outline-none"
          />
        </div>

        <div className="mt-6">
          <h3 className="text-lg text-gray-700 font-medium mb-2">
            Description
          </h3>
          <textarea rows={4} className="w-full border border-gray-400 pl-2 py-1 text-lg rounded resize-none focus:outline-none" />
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
    </div>
  )
}

export default PlaylistForm
