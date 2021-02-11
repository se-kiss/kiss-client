import {FC, createContext, useReducer, Dispatch, Reducer} from 'react'

export enum PlaylistFormMode {
  Create = 'CREATE',
  Edit = 'EDIT',
}

interface PlaylistFormState {
  mode: PlaylistFormMode
  title: string
  description?: string
}

interface IPlaylistFormContext {
  state: PlaylistFormState
  dispatch: Dispatch<Partial<PlaylistFormState>>
}

export const initialState: PlaylistFormState = {
  mode: PlaylistFormMode.Create,
  title: '',
  description: '',
}

export const PlaylistFormContext = createContext<IPlaylistFormContext>({
  state: initialState,
  dispatch: () => null,
})

const reducer: Reducer<PlaylistFormState, Partial<PlaylistFormState>> = (
  prev,
  current
) => {
  return {
    ...prev,
    ...current,
  }
}

export const PlaylistFormProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <PlaylistFormContext.Provider value={{state, dispatch}}>
      {children}
    </PlaylistFormContext.Provider>
  )
}
