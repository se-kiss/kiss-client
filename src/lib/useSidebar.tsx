import {FC, createContext, useReducer, Reducer, Dispatch, useContext} from 'react'

type SidebarState = {
  show: boolean
  Content: FC<any>
}

const initialState: SidebarState = {
  show: false,
  Content: null,
}

export enum SidebarActionTypes {
  ShowSidebar = 'SHOW_SIDEBAR',
  HideSidebar = 'HIDE_SIDEBAR',
}

type SidebarAction = {
  type: SidebarActionTypes
  payload?: Partial<SidebarState>
}

const reducer: Reducer<SidebarState, SidebarAction> = (state, action) => {
  switch (action.type) {
    case SidebarActionTypes.ShowSidebar:
      return {
        ...state,
        ...action.payload,
        show: true,
      }

    case SidebarActionTypes.HideSidebar:
      return {
        ...state,
        show: false,
        Content: null,
      }

    default:
      return state
  }
}

interface ISidebarContext {
  state: SidebarState
  dispatch: Dispatch<SidebarAction>
}

const SidebarContext = createContext<ISidebarContext>({
  state: initialState,
  dispatch: () => null,
})

export const SidebarProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <SidebarContext.Provider value={{state, dispatch}}>
      {children}
    </SidebarContext.Provider>
  )
}

const useSidebar = () => useContext(SidebarContext)

export default useSidebar