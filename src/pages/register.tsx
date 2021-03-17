import {Layout} from '../components'
import {NextPage} from 'next'
import {useRouter} from 'next/router'
import styled from 'styled-components'
import useRegister, {RegisterProvider} from '../lib/useRegister'
import {gql, useMutation} from '@apollo/client'
import {
  Mutation,
  MutationCreateUserArgs,
  MutationLoginArgs,
  MutationRegisterArgs,
} from '../types/generated/graphql'

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

const CREATE_USER = gql`
  mutation CreateUser($args: CreateUserArgs!) {
    createUser(args: $args) {
      _id
    }
  }
`

const REGISTER = gql`
  mutation Register($args: CreateIdentityArgs!) {
    register(args: $args) {
      userId
    }
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
  const {state, dispatch} = useRegister()
  const router = useRouter()
  const [createUser] = useMutation<
    Pick<Mutation, 'createUser'>,
    MutationCreateUserArgs
  >(CREATE_USER)

  const [register] = useMutation<
    Pick<Mutation, 'register'>,
    MutationRegisterArgs
  >(REGISTER)

  const [login] = useMutation<Pick<Mutation, 'login'>, MutationLoginArgs>(LOGIN)

  const onSubmit = () => {
    const {firstName, lastName, email, password} = state
    createUser({
      variables: {args: {firstName, lastName}},
      update: (cache, {data}) => {
        register({
          variables: {
            args: {
              userId: data.createUser._id,
              email,
              password,
            },
          },
          update: () => {
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
          },
        })
      },
    })
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="bg-white w-8/12 h-auto px-10 pt-6 pb-20 rounded-xl shadow-xl px-14">
        <h4 className="text-2xl text-gray-700 font-semibold text-center my-7">
          Register
        </h4>

        <div className="mt-3">
          <h3 className="text-lg text-gray-700 font-medium mb-2">Email</h3>
          <input
            type="text"
            name="username"
            value={state.email}
            onChange={(e) => {
              dispatch({email: e.target.value})
            }}
            className="w-full border border-gray-300 pl-2 py-1 text-lg rounded focus:outline-none"
          />
        </div>

        <div className="mt-3">
          <h3 className="text-lg text-gray-700 font-medium mb-2">First Name</h3>
          <input
            type="text"
            name="username"
            value={state.firstName}
            onChange={(e) => {
              dispatch({firstName: e.target.value})
            }}
            className="w-full border border-gray-300 pl-2 py-1 text-lg rounded focus:outline-none"
          />
        </div>

        <div className="mt-3">
          <h3 className="text-lg text-gray-700 font-medium mb-2">Last Name</h3>
          <input
            type="text"
            name="username"
            value={state.lastName}
            onChange={(e) => {
              dispatch({lastName: e.target.value})
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

        <div className="mt-3">
          <h3 className="text-lg text-gray-700 font-medium mb-2">
            Confirm Password
          </h3>
          <input
            type="password"
            name="confirmpassword"
            value={state.confirmPassword}
            onChange={(e) => {
              dispatch({confirmPassword: e.target.value})
            }}
            className="w-full border border-gray-300 pl-2 py-1 text-lg rounded focus:outline-none"
          />
        </div>

        <div className="mt-10">
          <Button className="focus:outline-none" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

const Register: NextPage = () => {
  return (
    <Layout>
      <RegisterProvider>
        <Form />
      </RegisterProvider>
    </Layout>
  )
}

export default Register
