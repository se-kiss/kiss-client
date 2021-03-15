import {
  FC,
  createContext,
  Dispatch,
  useReducer,
  Reducer,
  useContext,
} from 'react'

export enum PlaylistFormType {
  Create = 'CREATE',
  Edit = 'EDIT',
}

type PlaylistFormState = {
  type: PlaylistFormType
  name: string
  description: string
}

const initialState: PlaylistFormState = {
  type: PlaylistFormType.Create,
  name: '',
  description: '',
}

export enum PlaylistFormActionType {
  ModifyForm = 'MODIFY_FORM',
  ResetForm = 'RESET_FORM',
}

type PlaylistFormAction = {
  type: PlaylistFormActionType
  payload?: Partial<PlaylistFormState>
}

const reducer: Reducer<PlaylistFormState, PlaylistFormAction> = (
  state,
  action
) => {
  switch (action.type) {
    case PlaylistFormActionType.ModifyForm:
      return {...state, ...action.payload}
  
    case PlaylistFormActionType.ResetForm:
      return initialState
    default:
      return state
  }
}

interface IPlaylistFormContext {
  state: PlaylistFormState
  dispatch: Dispatch<PlaylistFormAction>
}

const PlaylistFormContext = createContext<IPlaylistFormContext>({
  state: initialState,
  dispatch: () => null,
})

export const PlaylistFormProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <PlaylistFormContext.Provider value={{state, dispatch}}>
      {children}
    </PlaylistFormContext.Provider>
  )
}

const usePlaylistForm = () => useContext(PlaylistFormContext)

export default usePlaylistForm
