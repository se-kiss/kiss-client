import {useRouter} from 'next/router'
import {FC, useContext} from 'react'
import {MockContext} from '../../mock/MockContext'
import {MediaType, MediaTypes} from '../../mock/data'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faNewspaper, faVideo, faPlus} from '@fortawesome/free-solid-svg-icons'
import {faComment, faBookmark} from '@fortawesome/free-regular-svg-icons'
import styled from 'styled-components'

type TagProps = {
  color?: string
}

const Tag = styled.div<TagProps>`
  background: ${({color}) => (color ? color : 'white')};
`

type MediaCardProps = {
  media: MediaType
}

const MediaCard: FC<MediaCardProps> = ({media}) => {
  const {state} = useContext(MockContext)
  const {id, name, playlistId, type} = media
  const {playlists, users} = state

  const {ownerId} = playlists.find((playlist) => playlist.id === playlistId)
  const owner = users.find((user) => user.id === ownerId)

  const typeIcon = ((type) => {
    switch (type) {
      case MediaTypes.Article:
        return faNewspaper
      case MediaTypes.Video:
        return faVideo
    }
  })(type)

  const router = useRouter()
  const onCardClick = () => {
    router.push(`/playlists/${playlistId}/media/${id}`)
  }

  return (
    <div
      className="relative bg-white w-3/4 rounded-lg shadow-xl p-4 my-8 mx-auto cursor-pointer"
      onClick={onCardClick}
    >
      <div className="flex flex-row items-center">
        <div className="w-8 h-8 rounded-full bg-red-400 mr-4" />

        <div>
          <h2 className="text-sm text-gray-700 font-medium">{owner.name}</h2>
          <h4 className="text-xs text-gray-700 font-normal">Feb 2</h4>
        </div>
      </div>

      <div className="px-4 mt-2 mx-8">
        <h1 className="text-xl text-gray-700 font-medium">{name}</h1>

        <div className="flex flex-row flex-wrap items-center">
          <Tag color="#FF8A83" className="rounded my-2 mr-2 px-2 py-1 text-white text-xs font-medium"> 
            <FontAwesomeIcon icon={typeIcon} />
          </Tag>
        </div>

        <div className="flex flex-row items-center mt-2">
          <div className="flex flex-row items-center text-sm text-red-400 font-normal mr-8">
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            <h5>20,000</h5>
          </div>

          <div className="flex flex-row items-center text-sm text-red-400 font-normal mr-8">
            <FontAwesomeIcon icon={faComment} className="mr-1" />
            <h5>5,000</h5>
          </div>
        </div>
      </div>

      <div className="absolute top-3 right-3">
        <FontAwesomeIcon icon={faBookmark} color="#FF8A83" />
      </div>
    </div>
  )
}

export default MediaCard
