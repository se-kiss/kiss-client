import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {Layout} from '../../components'
import {gql, useQuery} from '@apollo/client'
import {Query, QueryUserArgs} from '../../types/generated/graphql'
import {ProfileCard} from '../../components/Profile'
import {PlaylistCard} from '../../components/Playlist'
import { MainLoading } from '../../components/Loading'

const Profile: NextPage = () => {
  const router = useRouter()
  const {userId} = router.query

  if (!userId) {
    return <MainLoading />
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
            profileImageId
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
    return <MainLoading />
  }

  const {user} = data

  return (
    <Layout>
      <div className="px-10 mt-8 mx-auto">
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
