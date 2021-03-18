import {FC} from 'react'
import {User} from '../../types/generated/graphql'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserFriends} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const Button = styled.button`
  background: #ed827b;
  color: white;

  &:focus {
    outline: none;
  }
`

type ProfileCardProps = {
  user: User
}

const ProfileCard: FC<ProfileCardProps> = ({user}) => {
  const {firstName, lastName, profileImageId} = user

  return (
    <div className="bg-white w-3/4 rounded-lg shadow-xl p-4 my-8 mx-auto">
      <div className="flex justify-center">
        <div className="rounded-full w-32 h-32 bg-red-400">
          {profileImageId && (
            <img
              className="rounded-full w-full h-32 "
              src={profileImageId}
              alt=""
            />
          )}
        </div>
      </div>
      <h1 className="text-center text-2xl font-semibold text-gray-800">{`${firstName} ${lastName}`}</h1>
      <div className="flex justify-center items-center mt-4 text-gray-700">
        <FontAwesomeIcon icon={faUserFriends} />
        <h1 className="px-2 text-sm">10000 followers</h1>
        <FontAwesomeIcon icon={faUserFriends} />
        <h1 className="px-2 text-sm">20000 following</h1>
        <Button className="px-4 rounded text-sm font-medium">Follow</Button>
      </div>
    </div>
  )
}

export default ProfileCard
