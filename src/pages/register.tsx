import {Layout} from '../components'
import {NextPage} from 'next'
import styled from 'styled-components'
import useRegister,{RegisterProvider} from '../lib/useRegister'

const Button = styled.button`
    border: 1px solid #ff8a83;  
    color: white;
    background: #ff8a83;
    width: 100%;
    padding: 0.4rem 0rem;
    
    &:hover {
        background: #FF645C;
        color: white;
    }
`

const Form = () => {
    const {state,dispatch} = useRegister()

    function validatename(name){
        var regName = /^[a-zA-Z]+$/;
        if(!regName.test(name)){return false} return true
    }
    
    function validateusername(uname){
        var reguName = /^[a-zA-Z0-9]+$/
        if(!reguName.test(uname)){return false} return true
    }

    function confirmpassword(p,cp){
        if(p !== cp){return false} return true
    }

    const onSubmit = () => {
        validatename(state.firstName)
        validatename(state.lastName)
        validateusername(state.userName)
        validateusername(state.password)
        confirmpassword(state.password,state.confirmPassword)
    
    }
    return(
        <div className="w-full h-screen flex flex-col justify-center items-center">
                <div className="bg-white w-8/12 h-auto px-10 pt-6 pb-20 rounded-xl shadow-xl px-14">
                    <h4 className="text-2xl text-gray-700 font-semibold text-center my-7">Register</h4>
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <h3 className="text-lg text-gray-700 font-medium mb-2">FirstName</h3>
                            <input
                                type="text"
                                name="firstname"
                                value={state.firstName}
                                onChange= { (e) => {dispatch({firstName:e.target.value})}}
                                className="w-full border border-gray-300 pl-2 py-1 text-lg rounded focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col ml-44">
                            <h3 className="text-lg text-gray-700 font-medium mb-2">LastName</h3>
                            <input
                                type="text"
                                name="lastname"
                                value={state.lastName}
                                onChange= { (e) => {dispatch({lastName:e.target.value})}}
                                className="w-full border border-gray-300 pl-2 py-1 text-lg rounded focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <h3 className="text-lg text-gray-700 font-medium mb-2">Username</h3>
                        <input
                            type="text"
                            name="username"
                            value={state.userName}
                            onChange= { (e) => {dispatch({userName:e.target.value})}}
                            className="w-full border border-gray-300 pl-2 py-1 text-lg rounded focus:outline-none"
                        />
                    </div>
                    <div className="mt-3">
                        <h3 className="text-lg text-gray-700 font-medium mb-2">Password</h3>
                        <input
                            type="password"
                            name="password"
                            value={state.password}
                            onChange= { (e) => {dispatch({password:e.target.value})}}
                            className="w-full border border-gray-300 pl-2 py-1 text-lg rounded focus:outline-none"
                        />
                    </div>
                    <div className="mt-3">
                        <h3 className="text-lg text-gray-700 font-medium mb-2">Confirm Password</h3>
                        <input
                            type="password"
                            name="confirmpassword"
                            value={state.confirmPassword}
                            onChange= { (e) => {dispatch({confirmPassword:e.target.value})}}
                            className="w-full border border-gray-300 pl-2 py-1 text-lg rounded focus:outline-none"
                        />
                    </div>
                    <div className="mt-7">
                        <Button onClick={onSubmit}>Submit</Button>
                    </div>
                </div>
            </div>
    )
}

const Register: NextPage = () => {
    return(
        <Layout>
            <RegisterProvider>
                <Form/>
            </RegisterProvider>
        </Layout>
    )
}

export default Register