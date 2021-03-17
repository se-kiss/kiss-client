import {
    createContext,
    FC,
    useReducer,
    useContext,
    Dispatch
} from 'react'

type LoginState = {
    email: string
    password: string
}

const initialState: LoginState = {
    email: '',
    password: ''
}

interface ILoginContext {
    state: LoginState
    dispatch: Dispatch<Partial<LoginState>>
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