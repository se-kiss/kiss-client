import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {FC, useContext} from 'react'
import {Layout} from '../../../../components'
import {MockContext} from '../../../../mock/MockContext'
import {MediaType, MediaTypes} from '../../../../mock/data'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faNewspaper, faVideo, faPlus} from '@fortawesome/free-solid-svg-icons'
import {faComment, faBookmark} from '@fortawesome/free-regular-svg-icons'
import styled from 'styled-components'

const Card = styled.div`
  color: #626aaa;
`

type TagProps = {
  color?: string
}

const Tag = styled.div<TagProps>`
  background: ${({color}) => (color ? color : 'white')};
`

const SideBox: FC = () => {
  const {state} = useContext(MockContext)
  const {playlists, tags: mockTags} = state

  const router = useRouter()
  const {id} = router.query

  const {name, description, tagIds} = playlists.find(
    (playlist) => playlist.id === id
  )

  const tags = tagIds.map((tagId) =>
    mockTags.find((mockTag) => mockTag.id === tagId)
  )

  return (
    <div className="p-4">
      <h1 className="text-xl font-medium">{name}</h1>

      <div className="flex flex-row flex-wrap items-center mt-2">
        {tags.map(({id, name, color}) => (
          <Tag
            key={id}
            color={color}
            className="rounded mr-2 px-1 text-black text-sm"
          >
            {name}
          </Tag>
        ))}
      </div>

      <p className="text-md font-normal mt-4">{description}</p>
    </div>
  )
}

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
    <Card
      className="bg-white w-full rounded-lg shadow-xl p-4 my-8 cursor-pointer"
      onClick={onCardClick}
    >
      <div className="flex flex-row items-center">
        <div className="w-8 h-8 rounded-full bg-gray-500 mr-4" />

        <div>
          <h2 className="text-md font-medium">{owner.name}</h2>
          <h4 className="text-sm font-normal">Feb 2</h4>
        </div>
      </div>

      <div className="px-4 mt-2">
        <h1 className="text-xl font-semibold">{name}</h1>

        <div className="mt-2">
          <FontAwesomeIcon icon={typeIcon} size="lg" />
        </div>

        <div className="flex flex-row justify-between items-center mt-8">
          <div className="flex flex-row items-center">
            <FontAwesomeIcon icon={faPlus} className="mr-6" />
            <FontAwesomeIcon icon={faComment} className="mr-6" />
          </div>

          <FontAwesomeIcon icon={faBookmark} />
        </div>
      </div>
    </Card>
  )
}

const Playlist: NextPage = () => {
  const router = useRouter()
  const {id} = router.query

  const {state} = useContext(MockContext)
  const {playlists, media: mockMedia} = state
  const playlist = playlists.find((playlist) => playlist.id === id)
  const media = mockMedia.filter((media) => media.playlistId === playlist.id)

  return (
    <Layout SideComponent={SideBox}>
      <div className="px-10 mt-8 mx-auto">
        {media.map((mediaOne) => (
          <MediaCard key={mediaOne.id} media={mediaOne} />
        ))}
      </div>
    </Layout>
  )
}

export default Playlist
