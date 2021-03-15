import {useRouter} from 'next/router'
import {FC} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faNewspaper, faVideo, faPlus} from '@fortawesome/free-solid-svg-icons'
import {faComment} from '@fortawesome/free-regular-svg-icons'
import styled from 'styled-components'
import {Media, MediaType} from '../../types/generated/graphql'

type TagProps = {
  color?: string
}

const Tag = styled.div<TagProps>`
  background: ${({color}) => (color ? color : 'white')};
`

type MediaCardProps = {
  media: Media
}

const MediaCard: FC<MediaCardProps> = ({media}) => {
  const router = useRouter()
  const {_id, name, playlistId, type, _updatedAt} = media

  const onCardClick = () => {
    router.push(`/playlists/${playlistId}/media/${_id}`)
  }

  const updatedDate = new Date(_updatedAt)
  const formatedDate = Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(updatedDate)

  const typeIcon = ((type) => {
    switch (type) {
      case MediaType.Article: return faNewspaper
      case MediaType.Clip: return faVideo
    }
  })(type)

  return (
    <div
      className="relative bg-white w-3/4 rounded-lg shadow-xl p-4 my-8 mx-auto cursor-pointer"
      onClick={onCardClick}
    >
      <div className="flex flex-row items-center">
        <div className="w-8 h-8 rounded-full bg-red-400 mr-4" />

        <div>
          <h2 className="text-sm text-gray-700 font-medium">Owner</h2>
          <h4 className="text-xs text-gray-700 font-normal">{formatedDate}</h4>
        </div>
      </div>

      <div className="px-4 mt-2 mx-8">
        <h1 className="text-xl text-gray-700 font-medium">{name}</h1>

        <div className="flex flex-row flex-wrap items-center">
          <Tag
            color="#FF8A83"
            className="rounded my-2 mr-2 px-2 py-1 text-white text-xs font-medium"
          >
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
    </div>
  )
}

export default MediaCard
