import Link from 'next/link'
import {FC, useContext} from 'react'
import {PlaylistForm} from './'
import {ModalContext} from '../lib/ModalContext'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faBell} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const Container = styled.div`
  background: #d8e6f3;
`

const BrandText = styled.h1`
  color: #626aaa;
`

const LinkText = styled.h1`
  color: #626aaa;
`

const IconButton = styled.div`
  color: #626aaa;
  background: white;
  cursor: pointer;

  &:hover {
    color: white;
    background: #626aaa;
  }
`

const Button = styled.button`
  background: #626aaa;
  color: white;

  &: focus {
    outline: none;
  }
`

const NavbarEnd: FC = () => {
  const isLogin = true
  const {dispatch} = useContext(ModalContext)

  if (!isLogin) {
    return (
      <div className="flex flex-row items-center">
        <LinkText className="text-lg font-medium mx-4 cursor-pointer">
          Login
        </LinkText>

        <Button className="px-4 py-2 text-md font-medium rounded mx-4">
          Register
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-row items-center mx-4 cursor-pointer">
        <div className="w-8 h-8 bg-white rounded-full mr-2" />
        <LinkText className="text-lg font-medium">User</LinkText>
      </div>

      <IconButton
        className="w-10 h-10 shadow rounded-full mx-4 flex justify-center items-center cursor-pointer"
        onClick={() => dispatch({show: true, Content: PlaylistForm})}
      >
        <FontAwesomeIcon icon={faPlus} className="text-lg font-medium" />
      </IconButton>

      <IconButton className="w-10 h-10 shadow rounded-full mx-4 flex justify-center items-center cursor-pointer">
        <FontAwesomeIcon icon={faBell} className="text-lg font-medium" />
      </IconButton>
    </div>
  )
}

const Navbar: FC = () => {
  return (
    <Container className="fixed w-full h-14 bg-gray-200 px-12 flex flex-row  justify-between items-center">
      <Link href="/">
        <BrandText className="text-2xl font-bold cursor-pointer">
          KiSS
        </BrandText>
      </Link>

      <NavbarEnd />
    </Container>
  )
}

export default Navbar
