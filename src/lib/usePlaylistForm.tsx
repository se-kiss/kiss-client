import {
  FC,
  createContext,
  Dispatch,
  useReducer,
  Reducer,
  useContext,
} from 'react'

type PlaylistFormState = {
  name: string
  description: string
}

const initialState: PlaylistFormState = {
  name: '',
  description: '',
}

const reducer: Reducer<PlaylistFormState, Partial<PlaylistFormState>> = (
  prev,
  current
) => {
  return {
    ...prev,
    ...current,
  }
}

interface IPlaylistFormContext {
  state: PlaylistFormState
  dispatch: Dispatch<any>
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
