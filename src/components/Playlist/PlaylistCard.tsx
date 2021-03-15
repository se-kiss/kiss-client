import {useRouter} from 'next/router'
import {FC} from 'react'
import {Tag} from '../common'
import {
  Playlist,
  Query,
  QueryTagArgs,
  QueryUserArgs,
} from '../../types/generated/graphql'
import {gql, useQuery} from '@apollo/client'

type PlaylistCardProps = {
  playlist: Playlist
}

const GET_TAG = gql`
  query GetTag($args: GetTagsArgs) {
    tag(args: $args) {
      _id
      name
      color
    }
  }
`

const GET_OWNER = gql`
  query GetOwner($args: GetUsersArgs) {
    user(args: $args) {
      _id
      firstName
      lastName
    }
  }
`

const PlaylistCard: FC<PlaylistCardProps> = ({playlist}) => {
  const router = useRouter()
  const {_id, name, _updatedAt, tagIds, ownerId} = playlist
  const updatedDate = new Date(_updatedAt)
  const formatedDate = Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(updatedDate)

  const {loading: tagLoading, data: tagData} = useQuery<
    Pick<Query, 'tag'>,
    QueryTagArgs
  >(GET_TAG, {
    variables: {
      args: {
        ids: tagIds,
      },
    },
  })

  const {loading: userLoading, data: userData} = useQuery<
    Pick<Query, 'user'>,
    QueryUserArgs
  >(GET_OWNER, {
    variables: {
      args: {
        ids: [ownerId],
      },
    },
  })

  if (tagLoading || userLoading) {
    return <h1>Loading...</h1>
  }

  const {tag: tags} = tagData
  const {user} = userData
  const owner = user[0]

  return (
    <div
      className="bg-white w-3/4 rounded-lg shadow-xl p-4 my-8 mx-auto cursor-pointer"
      onClick={() => router.push(`/playlists/${_id}/media`)}
    >
      <div className="flex flex-row items-center">
        <div className="w-8 h-8 rounded-full bg-red-400 mr-4" />

        <div>
          <h2 className="text-sm text-gray-700 font-medium">{`${owner.firstName} ${owner.lastName}`}</h2>
          <h4 className="text-xs text-gray-700 font-normal">{formatedDate}</h4>
        </div>
      </div>

      <div className="px-4 mt-2 mx-8">
        <h1 className="text-xl text-gray-700 font-medium">{name}</h1>

        <div className="flex flex-row flex-wrap items-center">
          {tags.map(({_id, name, color}) => (
            <Tag
              key={_id}
              color={color}
              className="p-1 text-xs text-gray-700 mt-3 mr-3"
            >
              {name}
            </Tag>
          ))}
        </div>

        <div className="flex flex-row flex-wrap items-center"></div>
      </div>
    </div>
  )
}

export default PlaylistCard
