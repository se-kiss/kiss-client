import {FC} from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background: #d8e6f3;
`

const Brand = styled.h1`
  color: #626aaa;
`

const LinkText = styled.h1`
  color: #626aaa;
  cursor: pointer;
`

const Button = styled.button`
  background: #626aaa;
  color: white;

  &: focus {
    outline: none;
  }
`

const NavbarEnd: FC = () => {
  return (
    <div className="flex flex-row items-center">
      <LinkText className="text-lg font-medium mx-4">Login</LinkText>
      <Button className="px-4 py-2 text-md font-medium rounded mx-4">
        Register
      </Button>
    </div>
  )
}

const Navbar: FC = () => {
  return (
    <Container className="fixed w-full h-14 bg-gray-200 px-12 flex flex-row  justify-between items-center">
      <Brand className="text-2xl font-bold">KiSS</Brand>
      <NavbarEnd />
    </Container>
  )
}

export default Navbar
