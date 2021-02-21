import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {FC, useContext} from 'react'
import {Layout} from '../../../../components'
import {MockContext} from '../../../../mock/MockContext'
import {MediaTypes, MediaType} from '../../../../mock/data'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons'
import {faComment, faBookmark} from '@fortawesome/free-regular-svg-icons'
import styled from 'styled-components'

const Button = styled.button`
  background: #626aaa;
  color: white;

  &:focus {
    outline: none;
  }
`

const HorizontalLine = styled.hr`
  border-color: #626aaa;
  border-top-width: 1px;
`

const MenuButton = styled.div`
  background: white;
  color: #626aaa;

  &:hover {
    background: #626aaa;
    color: white;
  }
`

const SideBox: FC = () => {
  const router = useRouter()
  const {id} = router.query

  const {state} = useContext(MockContext)
  const {playlists, users} = state
  const {ownerId} = playlists.find((playlist) => playlist.id === id)
  const owner = users.find((user) => user.id === ownerId)

  const menuButtons = [
    {
      name: 'Upvote',
      icon: faArrowUp,
    },
    {
      name: 'Downvote',
      icon: faArrowDown,
    },
    {
      name: 'Comment',
      icon: faComment,
    },
    {
      name: 'Bookmark',
      icon: faBookmark,
    },
  ]

  return (
    <div className="p-4">
      <div className="flex flex-row items-start">
        <div className="w-8 h-8 rounded-full bg-gray-500 mr-4" />
        <div>
          <h4 className="text-lg font-medium">{owner.name}</h4>
          <Button className="px-4 rounded text-sm">Follow</Button>
        </div>
      </div>

      <HorizontalLine className="w-full my-4" />

      <div>
        {menuButtons.map(({name, icon}) => (
          <MenuButton
            key={name}
            className="rounded p-2 cursor-pointer flex flex-row items-center"
          >
            <FontAwesomeIcon icon={icon} size="lg" />
            <span className="text-lg font-medium ml-4">{name}</span>
          </MenuButton>
        ))}
      </div>
    </div>
  )
}

type MediaComponentProps = {
  media: MediaType
}

const Article: FC<MediaComponentProps> = ({media}) => {
  const {name, content} = media
  return (
    <div className="bg-white w-9/12 h-auto px-10 py-4 rounded-xl shadow-xl">
      <h1 className="text-3xl font-semibold">{name}</h1>
      <p className="text-lg mt-8">{content}</p>
    </div>
  )
}

const Video: FC<MediaComponentProps> = ({media}) => {
  const {name, description, url} = media
  return (
    <div className="bg-white w-9/12 h-auto rounded-xl shadow-xl">
      <iframe src={url} className="w-full h-80 rounded-t-xl" />
      <div className="px-10 py-4">
        <h1 className="text-3xl font-semibold">{name}</h1>
        <p className="text-lg mt-4">{description}</p>
      </div>
    </div>
  )
}

const Media: NextPage = () => {
  const router = useRouter()
  const {mediaId} = router.query

  const {state} = useContext(MockContext)
  const {media: mockMedia} = state
  const media = mockMedia.find((mediaOne) => mediaOne.id === mediaId)

  const MediaComponent = ((type) => {
    switch (type) {
      case MediaTypes.Article: return Article
      case MediaTypes.Video: return Video
    }
  })(media.type)

  return (
    <Layout SideComponent={SideBox}>
      <div className="px-10 mt-8 flex flex-row justify-center">
        <MediaComponent media={media} />
      </div>
    </Layout>
  )
}

export default Media
