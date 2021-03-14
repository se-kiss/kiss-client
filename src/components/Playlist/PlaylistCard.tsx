// import {useRouter} from 'next/router'
import {FC} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faNewspaper, faVideo} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import {
  GetMediaArgs,
  GetTagsArgs,
  MediaType,
  Playlist,
  Query,
} from '../../types/generated/graphql'
import {gql, useQuery} from '@apollo/client'

type TagProps = {
  color?: string
}

const Tag = styled.div<TagProps>`
  background: ${({color}) => (color ? color : 'white')};
`

type PlaylistCardProps = {
  playlist: Playlist
}

const GET_TAG_BY_IDS = gql`
  query GetTagsByIds($ids: [String!]) {
    tag(args: {ids: $ids}) {
      _id
      name
      color
    }
  }
`

const GET_MEDIA_BY_PLAYLIST_ID = gql`
  query GetMediaByPlaylistId($filter: GetMediaFilter) {
    media(args: {filter: $filter}) {
      type
    }
  }
`

const PlaylistCard: FC<PlaylistCardProps> = ({playlist}) => {
  // const router = useRouter()

  // TODO: refactor to resolve field
  const {data: tagsData, loading: tagsLoading} = useQuery<
    Pick<Query, 'tag'>,
    GetTagsArgs
  >(GET_TAG_BY_IDS, {
    variables: {
      ids: playlist.tagIds,
    },
  })

  const {data: mediaData, loading: mediaLoading} = useQuery<
    Pick<Query, 'media'>,
    GetMediaArgs
  >(GET_MEDIA_BY_PLAYLIST_ID, {
    variables: {
      filter: {
        playlistId: playlist._id,
      },
    },
  })

  if (tagsLoading || mediaLoading) return <h1>Loading...</h1>
  const {tag} = tagsData
  const {media} = mediaData

  const types = media.map(({type}) => {
    const icon = ((type) => {
      switch (type) {
        case MediaType.Article:
          return faNewspaper
        case MediaType.Clip:
          return faVideo
      }
    })(type)

    return {type, icon}
  })

  // const onCardClick = () => {
  //   router.push(`/playlists/${playlist._id}/media`)
  // }

  return (
    <div className="bg-white w-3/4 rounded-lg shadow-xl p-4 my-8 mx-auto cursor-pointer">
      <div className="flex flex-row items-center">
        <div className="w-8 h-8 rounded-full bg-red-400 mr-4" />

        <div>
          <h2 className="text-sm text-gray-700 font-medium">Owner</h2>
          <h4 className="text-xs text-gray-700 font-normal">Feb 2</h4>
        </div>
      </div>

      <div className="px-4 mt-2 mx-8">
        <h1 className="text-xl text-gray-700 font-medium">{playlist.name}</h1>

        <div className="flex flex-row flex-wrap items-center">
          {tag.map(({_id, name, color}) => (
            <Tag
              key={_id}
              color={color}
              className="rounded my-2 mr-2 px-2 py-1 text-gray-700 text-xs font-medium"
            >
              {name}
            </Tag>
          ))}
        </div>

        <div className="flex flex-row flex-wrap items-center">
          {types.map(({type, icon}) => (
            <div key={type} className="rounded my-2 mr-1 px-2 ">
              <FontAwesomeIcon icon={icon} className="text-red-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlaylistCard
