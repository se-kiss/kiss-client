import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {FC, useContext} from 'react'
import {Layout, HorizontalLine, AuthModal, CommentSidebar} from '../../../../components'
import useModal, {ModalActionTypes} from '../../../../lib/useModal'
import useSidebar, {SidebarActionTypes} from '../../../../lib/useSidebar'
import {MockContext} from '../../../../mock/MockContext'
import {MediaTypes, MediaType} from '../../../../mock/data'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons'
import {faComment, faBookmark} from '@fortawesome/free-regular-svg-icons'
import styled from 'styled-components'

const Button = styled.button`
  background: #ed827b;
  color: white;

  &:focus {
    outline: none;
  }
`

const MenuButton = styled.div`
  background: white;
  color: #ed827b;

  &:hover {
    background: #ed827b;
    color: white;
  }
`

const SideBox: FC = () => {
  const router = useRouter()
  const {id} = router.query

  const {state: mockState} = useContext(MockContext)
  const {playlists, users} = mockState
  const {ownerId} = playlists.find((playlist) => playlist.id === id)
  const owner = users.find((user) => user.id === ownerId)

  const {dispatch: dispatchModal} = useModal()
  const {dispatch: dispatchSidebar} = useSidebar()

  const onAuthModalShow = () => {
    dispatchModal({
      type: ModalActionTypes.ShowModal,
      payload: {
        Content: AuthModal,
      },
    })
  }

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
      onClick: () => {
        dispatchSidebar({
          type: SidebarActionTypes.ShowSidebar,
          payload: {
            Content: CommentSidebar,
          }
        })
      }
    },
    {
      name: 'Bookmark',
      icon: faBookmark,
    },
  ]

  return (
    <div className="px-4 py-6">
      <div className="flex flex-row items-start">
        <div className="w-7 h-7 rounded-full bg-red-400 mr-4" />
        <div>
          <h4 className="text-lg text-gray-700 font-medium">{owner.name}</h4>
          <Button className="px-4 rounded text-sm font-medium">Follow</Button>
        </div>
      </div>

      <HorizontalLine className="my-4" />

      <div>
        {menuButtons.map(({name, icon, onClick}) => (
          <MenuButton
            key={name}
            className="rounded p-2 cursor-pointer flex flex-row items-center"
            onClick={true ? onClick : onAuthModalShow}
          >
            <FontAwesomeIcon icon={icon} />
            <span className="text-md font-medium ml-4">{name}</span>
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
    <div className="bg-white w-10/12 h-auto px-10 pt-6 pb-20 rounded-xl shadow-xl">
      <h1 className="text-2xl text-gray-700 font-semibold">{name}</h1>
      <p className="text-lg text-gray-700 font-normal mt-4">{content}</p>
    </div>
  )
}

const Video: FC<MediaComponentProps> = ({media}) => {
  const {name, description, url} = media
  return (
    <div className="bg-white w-10/12 h-auto rounded-xl shadow-xl">
      <iframe src={url} className="w-full h-80 rounded-t-xl" />
      <div className="px-10 pt-4 pb-8">
        <h1 className="text-2xl text-gray-700 font-semibold">{name}</h1>
        <p className="text-md text-gray-700 font-normal mt-2">{description}</p>
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
      case MediaTypes.Article:
        return Article
      case MediaTypes.Video:
        return Video
    }
  })(media.type)

  return (
    <Layout SideComponent={SideBox}>
      <div className="px-10 mt-8 mx-auto flex flex-row justify-center">
        <MediaComponent media={media} />
      </div>
    </Layout>
  )
}

export default Media
