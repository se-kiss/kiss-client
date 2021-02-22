import {useRouter} from 'next/router'
import {FC, useContext} from 'react'
import {MockContext} from '../../mock/MockContext'
import {PlaylistType, MediaTypes} from '../../mock/data'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faNewspaper, faVideo} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

type TagProps = {
  color?: string
}

const Tag = styled.div<TagProps>`
  border-color: ${({color}) => color};
  border-width: 2px;

  ${({color}) =>
    color
      ? `
    background: ${color};
  `
      : `
    background: white;
  `}
`

type PlaylistCardProps = {
  playlist: PlaylistType
}

const PlaylistCard: FC<PlaylistCardProps> = ({playlist}) => {
  const router = useRouter()
  const {state} = useContext(MockContext)
  const {users, tags: mockTags, media} = state

  const {id, name, ownerId, tagIds} = playlist
  const owner = users.find((user) => user.id === ownerId)
  const tags = tagIds.map((tagId) =>
    mockTags.find((mockTag) => mockTag.id === tagId)
  )

  const types = media
    .filter((mediaOne) => mediaOne.playlistId === id)
    .map(({type}) => {
      const icon = ((type) => {
        switch (type) {
          case MediaTypes.Article:
            return faNewspaper
          case MediaTypes.Video:
            return faVideo
        }
      })(type)
      
      return {type, icon}
    })

  const onCardClick = () => {
    router.push(`/playlists/${id}/media`)
  }

  return (
    <div
      className="bg-white w-3/4 rounded-lg shadow-xl p-4 my-8 mx-auto cursor-pointer"
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
          {tags.map(({id, name, color}) => (
            <Tag
              key={id}
              color={color}
              className="rounded my-2 mr-2 px-2 text-gray-700 text-xs font-medium"
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