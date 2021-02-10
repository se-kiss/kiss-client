import {FC, createContext, useReducer, Reducer, Dispatch} from 'react'
import {
  playlists,
  tags,
  media,
  users,
  PlaylistType,
  TagType,
  MediaType,
  UserType,
} from './data'

type MockState = {
  playlists: PlaylistType[]
  tags: TagType[]
  media: MediaType[]
  users: UserType[]
}

const initialState: MockState = {
  playlists,
  tags,
  media,
  users,
}

export enum ActionTypes {}

type ActionType = {
  type: ActionTypes
  payload: any
}

const reducer: Reducer<MockState, ActionType> = (state, action) => {
  switch (action.type) {
    default:
      return state
  }
}

interface IMockContext {
  state: MockState
  dispatch: Dispatch<ActionType>
}

export const MockContext = createContext<IMockContext>({
  state: initialState,
  dispatch: () => null,
})

export const MockProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <MockContext.Provider value={{state, dispatch}}>
      {children}
    </MockContext.Provider>
  )
}
