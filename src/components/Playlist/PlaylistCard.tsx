import {useRouter} from 'next/router'
import {FC} from 'react'
import {Tag} from '../common'
import {Playlist} from '../../types/generated/graphql'

type PlaylistCardProps = {
  playlist: Playlist
}

const PlaylistCard: FC<PlaylistCardProps> = ({playlist}) => {
  const router = useRouter()
  const {_id, name, _updatedAt, tags, user: owner} = playlist
  const updatedDate = new Date(_updatedAt)
  const formatedDate = Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(updatedDate)

  return (
    <div
      className="bg-white w-3/4 rounded-lg shadow-xl p-4 my-8 mx-auto cursor-pointer"
    >
      <div className="flex flex-row items-center" onClick={() => router.push(`/profile/${owner._id}`)}>
        <div className="w-8 h-8 rounded-full bg-red-400 mr-4" />

        <div>
          <h2 className="text-sm text-gray-700 font-medium">{`${owner.firstName} ${owner.lastName}`}</h2>
          <h4 className="text-xs text-gray-700 font-normal">{formatedDate}</h4>
        </div>
      </div>

      <div 
        className="px-4 mt-2 mx-8"
        onClick={() => router.push(`/playlists/${_id}/media`)}>
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
