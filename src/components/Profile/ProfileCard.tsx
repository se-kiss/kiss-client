import {useRouter} from 'next/router'
import {FC} from 'react'
import {Tag} from '../common'
import {User} from '../../types/generated/graphql'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserFriends} from '@fortawesome/free-solid-svg-icons'

type ProfileCardProps = {
    user: User
}

const ProfileCard: FC<ProfileCardProps> = ({user}) => {
    const {_id, firstName, lastName} = user
    
    return(
        <div className="bg-white w-3/4 rounded-lg shadow-xl p-4 my-8 mx-auto">
            <div className="flex justify-center">
                <img className="rounded-full w-32 h-32 " 
                src="https://i.guim.co.uk/img/media/6ec0b8a5d96c74c104809a2b967da8aeb7818f20/0_1136_4815_2891/master/4815.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=95d878999b63c1cfeacd71dd3d3cea6e" alt="" />
            </div>
            <h1 className="text-center text-2xl font-semibold text-gray-800">{`${firstName} ${lastName}`}</h1>
            <div className="flex justify-center items-center mt-4 text-gray-700">
                <FontAwesomeIcon icon={faUserFriends} />
                <h1 className="px-2 text-sm">100000 followers</h1>
            </div>
        </div>
    )
}

export default ProfileCard