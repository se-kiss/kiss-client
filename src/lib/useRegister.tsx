import {
    createContext,
    FC,
    useReducer,
    useContext,
    Dispatch,
    Reducer
} from 'react'

type RegisterState = {
    profileImageId: string
    email: string
    firstName: string
    lastName: string
    password: string
    confirmPassword: string
}

const initialState: RegisterState = {
    profileImageId: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
}

interface IRegisterContext {
    state: RegisterState
    dispatch: Dispatch<Partial<RegisterState>>
}

const RegisterContext = createContext<IRegisterContext>({
    state: initialState,
    dispatch: () => null,
})

const reducer: Reducer<RegisterState, Partial<RegisterState>> = (
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