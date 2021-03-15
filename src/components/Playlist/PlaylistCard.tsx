import {useRouter} from 'next/router'
import {FC} from 'react'
import {Tag} from '../common'
import {Playlist} from '../../types/generated/graphql'

type PlaylistCardProps = {
  playlist: Partial<Playlist>
}

const PlaylistCard: FC<PlaylistCardProps> = ({playlist}) => {
  const router = useRouter()
  const {_id, name} = playlist

  const tags = [
    {
      id: 0,
      name: 'Science',
      color: '#ff934f',
    },
    {
      id: 1,
      name: 'Art',
      color: '#91F5AD',
    },
    {
      id: 2,
      name: 'Japanese',
      color: '#AEC5EB',
    },
  ]

  return (
    <div
      className="bg-white w-3/4 rounded-lg shadow-xl p-4 my-8 mx-auto cursor-pointer"
      onClick={() => router.push(`/playlists/${_id}/media`)}
    >
      <div className="flex flex-row items-center">
        <div className="w-8 h-8 rounded-full bg-red-400 mr-4" />

        <div>
          <h2 className="text-sm text-gray-700 font-medium">Owner</h2>
          <h4 className="text-xs text-gray-700 font-normal">Feb 2</h4>
        </div>
      </div>

      <div className="px-4 mt-2 mx-8">
        <h1 className="text-xl text-gray-700 font-medium">{name}</h1>

        <div className="flex flex-row flex-wrap items-center">
          {tags.map(({id, name, color}) => (
            <Tag
              key={id}
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
