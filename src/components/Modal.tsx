import {FC, useContext} from 'react'
import {ModalContext, initialState as initialModalState} from '../lib/ModalContext'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: 0.75;
`

const Container = styled.div`
  top: 10%;
  left: 30%;
`

const Card: FC = ({children}) => {
  const {dispatch} = useContext(ModalContext)

  return (
    <div className="relative w-full h-full">
      <Container className="absolute left-1/3 bg-white w-2/5 h-auto rounded">
        <div className="relative w-full h-full">
          <div className="absolute top-0 right-0">
            <FontAwesomeIcon
              icon={faTimes}
              className="cursor-pointer mr-2 text-gray-500"
              onClick={() => dispatch({...initialModalState})}
            />
          </div>
          {children}
        </div>
      </Container>
    </div>
  )
}

const Modal: FC = () => {
  const {state} = useContext(ModalContext)
  const {show, Content: ModalContent} = state

  if (!show) {
    return null
  }

  return (
    <div className="absolute top-0 left-0 w-screen h-screen">
      <Background />
      <Card>
        <ModalContent />
      </Card>
    </div>
  )
}

export default Modal
