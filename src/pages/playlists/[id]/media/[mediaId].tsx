import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {FC} from 'react'
import {Layout, AuthModal, CommentSidebar} from '../../../../components'
import {HorizontalLine} from '../../../../components/common'
import useModal, {ModalActionTypes} from '../../../../lib/useModal'
import useSidebar, {SidebarActionTypes} from '../../../../lib/useSidebar'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons'
import {faComment, faBookmark} from '@fortawesome/free-regular-svg-icons'
import styled from 'styled-components'
import {gql, useQuery} from '@apollo/client'
import {
  Media,
  MediaType,
  Query,
  QueryMediaArgs,
} from '../../../../types/generated/graphql'

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
          },
        })
      },
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
          <h4 className="text-lg text-gray-700 font-medium">Owner</h4>
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
  media: Media
}

const MediaComponent: FC<MediaComponentProps> = ({media}) => {
  switch (media.type) {
    case MediaType.Article:
      return <Article media={media} />
    case MediaType.Clip:
      return <Video media={media} />
  }
}

const Article: FC<MediaComponentProps> = ({media}) => {
  const {name, paragraph} = media
  return (
    <div className="bg-white w-10/12 h-auto px-10 pt-6 pb-20 rounded-xl shadow-xl">
      <h1 className="text-2xl text-gray-700 font-semibold">{name}</h1>
      {paragraph.map((text, index) => (
        <p
          key={`paragraph-${index}`}
          className="text-lg text-gray-700 font-normal mt-4"
        >
          {text}
        </p>
      ))}
    </div>
  )
}

const Video: FC<MediaComponentProps> = ({media}) => {
  const {name, description} = media
  return (
    <div className="bg-white w-10/12 h-auto rounded-xl shadow-xl">
      <iframe className="w-full h-80 rounded-t-xl" />
      <div className="px-10 pt-4 pb-8">
        <h1 className="text-2xl text-gray-700 font-semibold">{name}</h1>
        <p className="text-md text-gray-700 font-normal mt-2">{description}</p>
      </div>
    </div>
  )
}

const GET_MEDIA = gql`
  query GetMedia($args: GetMediaArgs) {
    media(args: $args) {
      _id
      name
      description
      paragraph
      type
    }
  }
`

const MediaPage: NextPage = () => {
  const router = useRouter()
  const {mediaId} = router.query

  if (!mediaId) {
    return <h1>Loading...</h1>
  }

  const {loading, data} = useQuery<Pick<Query, 'media'>, QueryMediaArgs>(
    GET_MEDIA,
    {
      variables: {
        args: {
          ids: [mediaId as string],
        },
      },
    }
  )

  if (loading) {
    return <h1>Loading...</h1>
  }

  const {media} = data

  return (
    <Layout SideComponent={SideBox}>
      <div className="px-10 mt-8 mx-auto flex flex-row justify-center">
        <MediaComponent media={media[0]} />
      </div>
    </Layout>
  )
}

export default MediaPage
