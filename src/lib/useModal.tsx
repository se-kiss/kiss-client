import {
  FC,
  useReducer,
  createContext,
  useContext,
  Dispatch,
  Reducer,
} from 'react'

interface ModalState {
  show: boolean
  Content: FC<any>
}

const initialState: ModalState = {
  show: false,
  Content: null,
}

export enum ModalActionTypes {
  ShowModal = 'SHOW_MODAL',
  CloseModal = 'CLOSE_MODAL'
}

type ModalAction = {
  type: ModalActionTypes
  payload?: Partial<ModalState>
}

const reducer: Reducer<ModalState, ModalAction> = (state, action) => {
  switch (action.type) {
    case ModalActionTypes.ShowModal: {
      return {
        ...state,
        ...action.payload,
        show: true,
      }
    }

    case ModalActionTypes.CloseModal: {
      return initialState
    }

    default: return state
  }
}

interface IModalContext {
  state: ModalState
  dispatch: Dispatch<ModalAction>
}

const ModalContext = createContext<IModalContext>({
  state: initialState,
  dispatch: () => null,
})

export const ModalProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ModalContext.Provider value={{state, dispatch}}>
      {children}
    </ModalContext.Provider>
  )
}

const useModal = () => useContext(ModalContext)

export default useModal
