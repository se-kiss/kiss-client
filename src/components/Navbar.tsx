import Link from 'next/link'
import {FC, useContext} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faBell} from '@fortawesome/free-solid-svg-icons'
import useModal, {ModalActionTypes} from '../lib/useModal'
import {PlaylistForm} from '../components/Playlist'
import styled from 'styled-components'
import {MockContext} from '../mock/MockContext'

const Container = styled.div`
  background: #FF8A83;
`

const IconButton = styled.div`
  color: #ED827B;
  background: white;
  cursor: pointer;

  &:hover {
    color: white;
    background: #ED827B;
  }
`

const Button = styled.button`
  color: #ED827B;

  &: focus {
    outline: none;
  }
`

const NavbarEnd: FC = () => {
  const {dispatch: dispatchModal} = useModal()
  const {state} = useContext(MockContext)
  const {users} = state
  const user = users[0]

  const onPlaylistAddClick = () => {
    dispatchModal({
      type: ModalActionTypes.ShowModal,
      payload: {
        Content: PlaylistForm,
      },
    })
  }

  if (!user) {
    return (
      <div className="flex flex-row items-center">
        <h1 className="text-md text-white font-medium mx-4 cursor-pointer">
          Login
        </h1>

        <Button className="bg-white px-3 py-1 text-md font-semibold shadow-md rounded mx-4">
          Register
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-row items-center mx-4 cursor-pointer">
        <div className="w-7 h-7 bg-white rounded-full mr-2" />
        <h1 className="text-md font-medium text-white">{user.name}</h1>
      </div>

      <IconButton
        className="w-9 h-9 shadow rounded-full mx-4 flex justify-center items-center cursor-pointer"
        onClick={onPlaylistAddClick}
      >
        <FontAwesomeIcon icon={faPlus} className="text-md font-medium" />
      </IconButton>

      <IconButton className="w-9 h-9 shadow rounded-full mx-4 flex justify-center items-center cursor-pointer">
        <FontAwesomeIcon icon={faBell} className="text-md font-medium" />
      </IconButton>
    </div>
  )
}

const Navbar: FC = () => {
  return (
    <Container className="fixed z-10 w-full h-16 bg-gray-200 px-12 flex flex-row  justify-between items-center shadow">
      <Link href="/">
        <h1 className="text-xl text-white font-semibold cursor-pointer">
          KiSS
        </h1>
      </Link>

      <NavbarEnd />
    </Container>
  )
}

export default Navbar
