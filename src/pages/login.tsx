import {Layout} from '../components'
import {NextPage} from 'next'
import {useRouter} from 'next/router'
import styled from 'styled-components'
import useLogin, {LoginProvider} from '../lib/useLogin'
import {gql, useMutation} from '@apollo/client'
import {Mutation, MutationLoginArgs} from '../types/generated/graphql'

const Button = styled.button`
  border: 1px solid #ff8a83;
  color: white;
  background: #ff8a83;
  width: 100%;
  padding: 0.4rem 0rem;

  &:hover {
    background: #ff645c;
    color: white;
  }
`

const LOGIN = gql`
  mutation Login($args: LoginArgs!) {
    login(args: $args) {
      token
    }
  }
`

const Form = () => {
  const router = useRouter()
  const {state, dispatch} = useLogin()
  const [login] = useMutation<
    Pick<Mutation, 'login'>,
    MutationLoginArgs
  >(LOGIN)

  const onSubmit = () => {
    const {email, password} = state
    login({
      variables: {
        args: {
          email,
          password,
        },
      },
      update: (cache, {data}) => {
        localStorage.setItem('AUTH_TOKEN', data.login.token)
        cache.reset()
        router.push('/')
      }
    })
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="bg-white w-8/12 h-auto px-10 pt-6 pb-20 rounded-xl shadow-xl px-14">
        <h4 className="text-2xl text-gray-700 font-semibold text-center my-7">
          Login
        </h4>
        <div>
          <h3 className="text-lg text-gray-700 font-medium mb-2">Email</h3>
          <input
            type="text"
            name="name"
            value={state.email}
            onChange={(e) => {
              dispatch({email: e.target.value})
            }}
            className="w-full border border-gray-300 pl-2 py-1 text-lg rounded focus:outline-none"
          />
        </div>
        <div className="mt-3">
          <h3 className="text-lg text-gray-700 font-medium mb-2">Password</h3>
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={(e) => {
              dispatch({password: e.target.value})
            }}
            className="w-full border border-gray-300 pl-2 py-1 text-lg rounded focus:outline-none"
          />
        </div>
        <div className="mt-4">
          <Button className="focus:outline-none" onClick={onSubmit}>Login</Button>
        </div>
      </div>
    </div>
  )
}

const Login: NextPage = () => {
  return (
    <Layout>
      <LoginProvider>
        <Form />
      </LoginProvider>
    </Layout>
  )
}

export default Login