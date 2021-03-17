import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {FC} from 'react'
import {Layout, AuthModal, CommentSidebar} from '../../components'
import {HorizontalLine, OutlinedButton} from '../../components/common'
import useModal, {ModalActionTypes} from '../../lib/useModal'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons'
import {
  faComment,
  faBookmark,
} from '@fortawesome/free-regular-svg-icons'
import styled from 'styled-components'
import {gql, useQuery} from '@apollo/client'
import {
  User,
  Query,
  QueryUserArgs,
} from '../../types/generated/graphql'
import {ProfileCard} from '../../components/Profile'
import {PlaylistCard} from '../../components/Playlist'



const Profile: NextPage = () => {
  const router = useRouter()
  const {userId} = router.query

  if (!userId) {
    return <h1>Loading...</h1>
  }

const GET_USER = gql`
  query GetUser {
    user {
      _id
      firstName
      lastName
      playlists {
        _id
        name
        tags {
          _id
          name
          color
        }
        user {
          _id
          firstName
          lastName
        }
        _updatedAt
      }
    }
  }
`

  const {loading, data} = useQuery<Pick<Query, 'user'>, QueryUserArgs>(
    GET_USER,
    {
      variables: {
        args: {
          ids: [userId as string],
        },
      },
    }
  )

  if (loading) {
    return <h1>Loading...</h1>
  }

  const {user} = data
  //todo: connect users with api

    return (
      <Layout>
        <div className="px-10 mt-8 mx-auto">
        {/* {user.map((currentUser) => (
          <ProfileCard key={currentUser._id} user={currentUser} />
        ))} */}
        <ProfileCard key={user[0]._id} user={user[0]} />
        <div className="px-10 mt-8 mx-auto">
        {user[0].playlists.map((playlist) => (
          <PlaylistCard key={playlist._id} playlist={playlist} />
        ))}
        </div>
      </div>
      </Layout>
    )
  }
  
  export default Profile