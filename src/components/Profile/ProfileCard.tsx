import {useRouter} from 'next/router'
import {FC} from 'react'
import {Tag} from '../common'
import {User, Subscription} from '../../types/generated/graphql'
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
    // sub: Subscription
}

const ProfileCard: FC<ProfileCardProps> = ({user}) => {
    const {firstName, lastName} = user
    // const {userId,follower,following} = sub
    
    return(
        <div className="bg-white w-3/4 rounded-lg shadow-xl p-4 my-8 mx-auto">
            <div className="flex justify-center">
                <img className="rounded-full w-32 h-32 " 
                src="https://i.guim.co.uk/img/media/6ec0b8a5d96c74c104809a2b967da8aeb7818f20/0_1136_4815_2891/master/4815.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=95d878999b63c1cfeacd71dd3d3cea6e" alt="" />
            </div>
            <h1 className="text-center text-2xl font-semibold text-gray-800">{`${firstName} ${lastName}`}</h1>
            <div className="flex justify-center items-center mt-4 text-gray-700">
                <FontAwesomeIcon icon={faUserFriends} />
                <h1 className="px-2 text-sm">10000 followers</h1>
                <FontAwesomeIcon icon={faUserFriends} />
                <h1 className="px-2 text-sm">20000 following</h1>
                <Button className="px-4 rounded text-sm font-medium">Follow</Button>
                {/* <FontAwesomeIcon icon={faUserFriends} />
                <h1 className="px-2 text-sm">{`${follower}`} followers</h1>
                <FontAwesomeIcon icon={faUserFriends} />
                <h1 className="px-2 text-sm">{`${following}`} following</h1> */}
            </div>
        </div>
    )
}

export default ProfileCard