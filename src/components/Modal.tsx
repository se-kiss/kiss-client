import {FC} from 'react'
import useModal, {ModalActionTypes} from '../lib/useModal'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 1024px;
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: 0.75;
`

const Container = styled.div`
  top: 10%;
  left: 20%;
`

const Card: FC = ({children}) => {
  const {dispatch} = useModal()
  const onModalClose = () => {
    dispatch({
      type: ModalActionTypes.CloseModal
    })
  }

  return (
    <div className="relative w-full h-full">
      <Container className="absolute bg-white w-3/5 h-auto rounded">
        <div className="relative w-full h-full">
          <div className="absolute top-0 right-0">
            <FontAwesomeIcon
              icon={faTimes}
              className="cursor-pointer mr-2 text-gray-500"
              onClick={onModalClose}
            />
          </div>
          {children}
        </div>
      </Container>
    </div>
  )
}

const Modal: FC = () => {
  const {state} = useModal()
  const {show, Content: ModalContent} = state

  if (!show) {
    return null
  }

  return (
    <div className="fixed z-20 top-0 left-0 w-screen h-screen">
      <Background />
      <Card>
        <ModalContent />
      </Card>
    </div>
  )
}

export default Modal
