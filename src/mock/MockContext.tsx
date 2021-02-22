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
  search: {
    tagIds: string[]
  }
}

const initialState: MockState = {
  playlists,
  tags,
  media,
  users,
  search: {
    tagIds: [],
  },
}

export enum ActionTypes {
  AddSearchTag = 'ADD_SEARCH_TAG',
  RemoveSearchTag = 'REMOVE_SEARCH_TAG',
}

type ActionType = {
  type: ActionTypes
  payload: any
}

const reducer: Reducer<MockState, ActionType> = (state, action) => {
  const {search} = state
  switch (action.type) {
    case ActionTypes.AddSearchTag:
      return {
        ...state,
        search: {
          ...search,
          tagIds: search.tagIds.includes(action.payload.tagId)
            ? search.tagIds
            : [...search.tagIds, action.payload.tagId],
        },
      }

    case ActionTypes.RemoveSearchTag:
      return {
        ...state,
        search: {
          ...search,
          tagIds: search.tagIds.filter((tagId) => tagId !== action.payload.tagId)
        },
      }

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
