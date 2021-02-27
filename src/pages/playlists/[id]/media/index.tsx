import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {FC, useContext} from 'react'
import {Layout, HorizontalLine} from '../../../../components'
import {MockContext} from '../../../../mock/MockContext'
import {MediaCard} from '../../../../components/Media'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

type TagProps = {
  color?: string
}

const Tag = styled.div<TagProps>`
  background: ${({color}) => (color ? color : 'white')};
`

const MenuButton = styled.div`
  background: white;
  color: #ED827B;

  &:hover {
    background: #ED827B;
    color: white;
  }
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

  const menuButtons = [
    {
      name: 'Add Media',
      icon: faPlus,
      onClick: () => {
        router.push('/playlists/1/media/new')
      }
    },
  ]

  return (
    <div className="px-4 py-6">
      <div>
        <h1 className="text-xl text-gray-700 font-bold">{name}</h1>

        <div className="flex flex-row flex-wrap items-center">
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

      <HorizontalLine className="my-4" />

      <div>
        {menuButtons.map(({name, icon, onClick}) => (
          <MenuButton
            key={name}
            className="rounded p-2 cursor-pointer flex flex-row items-center"
            onClick={onClick}
          >
            <FontAwesomeIcon icon={icon} />
            <span className="text-md font-medium ml-4">{name}</span>
          </MenuButton>
        ))}
      </div>
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
