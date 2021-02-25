import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  FC,
  Reducer,
} from 'react'
import {MediaTypes} from '../mock/data'

type MediaFormState = {
  type: MediaTypes
  name: string
}

const initialState: MediaFormState = {
  type: MediaTypes.Article,
  name: '',
}

const reducer: Reducer<MediaFormState, Partial<MediaFormState>> = (
  prev,
  current
) => {
  return {
    ...prev,
    ...current,
  }
}

interface IMediaContext {
  state: MediaFormState
  dispatch: Dispatch<Partial<MediaFormState>>
}

const MediaFormContext = createContext<IMediaContext>({
  state: initialState,
  dispatch: () => null,
})

export const MediaFormProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <MediaFormContext.Provider value={{state, dispatch}}>
      {children}
    </MediaFormContext.Provider>
  )
}

const useMediaForm = () => useContext(MediaFormContext)

export default useMediaForm
