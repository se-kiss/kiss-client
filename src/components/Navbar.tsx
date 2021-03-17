import Link from 'next/link'
import {useRouter} from 'next/router'
import {FC} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faBell} from '@fortawesome/free-solid-svg-icons'
import useModal, {ModalActionTypes} from '../lib/useModal'
import useSidebar, {SidebarActionTypes} from '../lib/useSidebar'
import usePlaylistForm, {
  PlaylistFormActionType,
  PlaylistFormType,
} from '../lib/usePlaylistForm'
import {PlaylistForm} from '../components/Playlist'
import styled from 'styled-components'
import {Query} from '../types/generated/graphql'
import {gql, useQuery} from '@apollo/client'
import {NotificationSidebar} from './Notification'

const Container = styled.div`
  background: #ff8a83;
`

const IconButton = styled.div`
  color: #ed827b;
  background: white;
  cursor: pointer;

  &:hover {
    color: white;
    background: #ed827b;
  }
`

const Button = styled.button`
  color: #ed827b;

  &: focus {
    outline: none;
  }
`

const GET_USER = gql`
  query GetUser {
    user {
      _id
      firstName
      lastName
    }
  }
`

const NavbarEnd: FC = () => {
  const router = useRouter()
  const {dispatch: dispatchModal} = useModal()
  const {dispatch: dispatchPlaylistForm} = usePlaylistForm()
  const {dispatch} = useSidebar()

  const {loading, data} = useQuery<Pick<Query, 'user'>>(GET_USER)

  if (loading) {
    return <h1>Loading...</h1>
  }

  const {user} = data
  const onMyProfileClick = () => {
    router.push(`/profile/${user[0]._id}`)
  }

  const onPlaylistAddClick = () => {
    dispatchPlaylistForm({
      type: PlaylistFormActionType.ModifyForm,
      payload: {
        type: PlaylistFormType.Create,
      },
    })

    dispatchModal({
      type: ModalActionTypes.ShowModal,
      payload: {
        Content: PlaylistForm,
      },
    })
  }

  const onNotificationClick = () => {
    dispatch({
      type: SidebarActionTypes.ShowSidebar,
      payload: {
        Content: NotificationSidebar,
      },
    })
  }

  if (!true) {
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
      <div
        className="flex flex-row items-center mx-4 cursor-pointer"
        onClick={onMyProfileClick}
      >
        <div className="w-7 h-7 bg-white rounded-full mr-2" />
        <h1 className="text-md font-medium text-white">User</h1>
      </div>

      <IconButton
        className="w-9 h-9 shadow rounded-full mx-4 flex justify-center items-center cursor-pointer"
        onClick={onPlaylistAddClick}
      >
        <FontAwesomeIcon icon={faPlus} className="text-md font-medium" />
      </IconButton>

      <IconButton
        className="w-9 h-9 shadow rounded-full mx-4 flex justify-center items-center cursor-pointer"
        onClick={onNotificationClick}
      >
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
