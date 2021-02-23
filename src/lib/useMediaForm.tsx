import {createContext, useReducer, useContext, Dispatch, FC, Reducer} from 'react'
import {MediaTypes} from '../mock/data'

type MediaFormState = {
  type: MediaTypes
}

const initialState: MediaFormState = {
  type: MediaTypes.Article,
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
  dispatch: Dispatch<any>
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
