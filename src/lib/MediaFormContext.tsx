import {FC, createContext, useReducer, Reducer, Dispatch} from 'react'

export enum MediaTypes {
  Article,
  Video,
}

interface MediaFormState {
  mediaType: MediaTypes
}

interface IMediaFormContext {
  state: MediaFormState
  dispatch: Dispatch<Partial<MediaFormState>>
}

export const initialState = {
  mediaType: MediaTypes.Article,
}

export const MediaFormContext = createContext<IMediaFormContext>({
  state: initialState,
  dispatch: () => null,
})

const reducer: Reducer<MediaFormState, Partial<MediaFormState>> = (
  prev,
  current
) => {
  return {
    ...prev,
    ...current,
  }
}

export const MediaFormProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <MediaFormContext.Provider value={{state, dispatch}}>
      {children}
    </MediaFormContext.Provider>
  )
}
