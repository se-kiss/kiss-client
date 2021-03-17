import {
    createContext,
    FC,
    useReducer,
    useContext
} from 'react'

type RegisterState = {
    email: string
    firstName: string
    lastName: string
    password: string
    confirmPassword: string
}

const initialState: RegisterState = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
}

interface IRegisterContext {
    state: RegisterState
    dispatch: any
}

const RegisterContext = createContext<IRegisterContext>({
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

export const RegisterProvider: FC = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState)

    return(
        <RegisterContext.Provider value={{state,dispatch}}>
            {children}
        </RegisterContext.Provider>
    )
}

const useRegister = () => useContext(RegisterContext)

export default useRegister