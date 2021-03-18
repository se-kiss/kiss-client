import {createContext, FC, useReducer, useContext, Dispatch} from 'react'
import { MediaType } from '../types/generated/graphql'

type SearchState = {
  text: string
  tagIds: string[]
  typeIds: MediaType[]
}

const initialState: SearchState = {
  text: '',
  tagIds: [],
  typeIds: [],
}

interface ISearchContext {
  state: SearchState
  dispatch: Dispatch<Partial<SearchState>>
}

const SearchContext = createContext<ISearchContext>({
  state: initialState,
  dispatch: () => null,
})

const reducer = (prev, current) => {
  return {
    ...prev,
    ...current,
  }
}

export const SearchProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <SearchContext.Provider value={{state, dispatch}}>
      {children}
    </SearchContext.Provider>
  )
}

const useSearch = () => useContext(SearchContext)

export default useSearch
