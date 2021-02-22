import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {FC, useContext} from 'react'
import {Layout} from '../../../../components'
import {MockContext} from '../../../../mock/MockContext'
import {MediaCard} from '../../../../components/Media'
import styled from 'styled-components'

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
    <div className="px-4 py-6">
      <h1 className="text-xl text-gray-700 font-bold">{name}</h1>

      <div className="flex flex-row flex-wrap items-center mt-2">
        {tags.map(({id, name, color}) => (
          <Tag
            key={id}
            color={color}
            className="rounded my-2 mr-2 px-2 py-1 text-gray-700 text-xs font-medium"
          >
            {name}
          </Tag>
        ))}
      </div>

      <p className="text-md text-gray-700 font-medium mt-2">{description}</p>
    </div>
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
