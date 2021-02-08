import {FC} from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background: #d8e6f3;
`

const Brand = styled.h1`
  color: #626aaa;
`

const Navbar: FC = () => {
  return (
    <Container className="w-full h-14 bg-gray-200 px-8 flex flex-row  justify-between items-center">
      <Brand className="text-xl font-bold">KiSS</Brand>
    </Container>
  )
}

export default Navbar