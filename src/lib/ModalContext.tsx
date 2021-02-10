import {FC, useReducer, createContext, Dispatch, Reducer} from 'react'

interface ModalState {
  show: boolean
  Content: FC<any>
} 

interface IModalContext {
  state: ModalState
  dispatch: Dispatch<Partial<ModalState>>
}

export const initialState: ModalState = {
  show: false,
  Content: null
}

export const ModalContext = createContext<IModalContext>({
  state: initialState,
  dispatch: () => null
})

const reducer: Reducer<ModalState, Partial<ModalState>> = (prev, current) => {
  return {
    ...prev,
    ...current,
  }
}

export const ModalProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ModalContext.Provider value={{state, dispatch}}>
      {children}
    </ModalContext.Provider>
  )
}