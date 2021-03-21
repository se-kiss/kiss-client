import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {Layout} from '../../components'
import {gql, useQuery} from '@apollo/client'
import {
  Query,
  QueryUserArgs,
} from '../../types/generated/graphql'
import {ProfileCard} from '../../components/Profile'
import {PlaylistCard} from '../../components/Playlist'
import {MainLoading} from '../../components/Loading'

const GET_USER = gql`
  query GetUser($args: GetUsersArgs) {
    user(args: $args) {
      _id
      firstName
      lastName
      profileImageId
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

// const GET_ME = gql`
//   query GetMe {
//     me {
//       userId
//     }
//   }
// `

const Profile: NextPage = () => {
  const router = useRouter()
  const {userId} = router.query

  if (!userId) {
    return <MainLoading />
  }

  const {loading: userLoading, data: userData} = useQuery<Pick<Query, 'user'>, QueryUserArgs>(
    GET_USER,
    {
      variables: {
        args: {
          ids: [userId as string],
        },
      },
    }
  )

  // const {loading: meLoading, data: meData} = useQuery<Pick<Query, 'me'>>(
  //   GET_ME
  // )

  if (userLoading) {
    return <MainLoading />
  }

  const {user} = userData
  // const {me} = meData

  return (
    <Layout>
      <div className="px-10 mt-8 mx-auto">
        <ProfileCard user={user[0]} {...{user: user[0]}} />
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
