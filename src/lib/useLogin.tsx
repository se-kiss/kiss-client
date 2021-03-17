import {
    createContext,
    FC,
    useReducer,
    useContext
} from 'react'

type LoginState = {
    userName: string
    password: string
}

const initialState: LoginState = {
    userName: '',
    password: ''
}

interface ILoginContext {
    state: LoginState
    dispatch: any
}

const LoginContext = createContext<ILoginContext>({
    state: initialState,
    dispatch: () => null,
})

const reducer = (
    prev,
    current
) => {
    return{
        ...prev,...current
    }
}

export const LoginProvider: FC = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState)

    return(
        <LoginContext.Provider value={{state,dispatch}}>
            {children}
        </LoginContext.Provider>
    )
}

const useLogin = () => useContext(LoginContext)

export default useLogin