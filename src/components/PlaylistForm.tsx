import {useRouter} from 'next/router'
import {FC, useContext} from 'react'
import {
  ModalContext,
  initialState as initialModalState,
} from '../lib/ModalContext'
import styled from 'styled-components'

const Button = styled.button`
  background: #626aaa;
  color: white;

  &:focus {
    outline: none;
  }
`

const LinkText = styled.h4`
  color: #626aaa;
`

const PlaylistForm: FC = () => {
  const router = useRouter()
  const {dispatch} = useContext(ModalContext)

  const onSubmit = () => {
    router.push('/playlists/id')
  }

  return (
    <div className="px-8 py-2">
      <h1 className="text-2xl font-bold">Create Playlist</h1>

      <div className="mt-8">
        <h2 className="text-md font-semibold mb-1">Title</h2>
        <input
          className="w-full text-xl rounded-sm shadow-lg py-2 pl-4"
          placeholder="Title"
          name="title"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-md font-semibold mb-1">Description</h2>
        <textarea
          className="w-full h-24 text-xl rounded-sm shadow-lg py-2 pl-4 resize-none overflow-hidden"
          placeholder="Content"
        />
      </div>

      <div className="flex flex-row justify-center items-center mt-8">
        <LinkText
          className="text-md font-medium mx-6 cursor-pointer"
          onClick={() => dispatch({...initialModalState})}
        >
          Cancel
        </LinkText>

        <Button
          className="rounded px-4 py-1 text-xl font-medium mx-6"
          onClick={onSubmit}
        >
          Create
        </Button>
      </div>
    </div>
  )
}

export default PlaylistForm
