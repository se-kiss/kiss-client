import {Layout} from '../components'
import {NextPage} from 'next'
import styled from 'styled-components'

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

const Login: NextPage = () => {
    return(
        <Layout>
            <div className="w-full h-screen flex flex-col justify-center items-center">
                <div className="bg-white w-8/12 h-auto px-10 pt-6 pb-20 rounded-xl shadow-xl px-14">
                    <div>
                        <h3 className="text-lg text-gray-700 font-medium mb-2">Username</h3>
                        <input
                            type="text"
                            name="name"
                            className="w-full border border-gray-300 pl-2 py-1 text-lg rounded focus:outline-none"
                        />
                    </div>
                    <div className="mt-3">
                        <h3 className="text-lg text-gray-700 font-medium mb-2">Password</h3>
                        <input
                            type="password"
                            name="password"
                            className="w-full border border-gray-300 pl-2 py-1 text-lg rounded focus:outline-none"
                        />
                    </div>
                    <div className="mt-4">
                        <Button>Login</Button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Login