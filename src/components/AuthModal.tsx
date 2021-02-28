import {useRouter} from 'next/router'
import {FC} from 'react'
import styled from 'styled-components'

const Button = styled.button`
  color: white;
  background: #ff8a83;
`

const LinkText = styled.h2`
  color: #ff8a83;
`

const AuthModal: FC = () => {
  const router = useRouter()

  return (
    <div className="px-32 py-8">
      <h1 className="text-2xl font-semibold text-gray-700 text-center">
        Login to continue
      </h1>

      <div className="w-8/12 mx-auto mt-10">
        <img
          src="/undraw_Login_re_4vu2.svg"
          className="w-full h-18 object-contain"
        />
      </div>

      <div className="mt-10">
        <Button
          className="w-full my-3 px-8 py-2 text-xl font-medium rounded hover:bg-red-400 focus:outline-none"
          onClick={() => router.push('/login')}
        >
          Login
        </Button>

        <LinkText
          className="text-xl font-medium text-center my-3 cursor-pointer hover:color-red-400"
          onClick={() => router.push('/register')}
        >
          Register
        </LinkText>
      </div>
    </div>
  )
}

export default AuthModal
