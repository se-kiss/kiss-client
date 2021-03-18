import {faNewspaper} from '@fortawesome/free-regular-svg-icons'
import {faMicrophoneAlt, faVideo} from '@fortawesome/free-solid-svg-icons'
import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {FC, useEffect} from 'react'
import {Layout} from '../../../../../components'
import {
  ArticleForm,
  VideoForm,
  MediaFormButtons,
  PodcastForm,
} from '../../../../../components/MediaForm'
import useMediaForm, {
  MediaFormActionTypes,
  MediaFormProvider,
} from '../../../../../lib/useMediaForm'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {HorizontalLine} from '../../../../../components/common'
import {gql, useMutation, useQuery} from '@apollo/client'
import {
  Mutation,
  MediaType,
  MutationUpdateMediaArgs,
  Media,
  Query,
  QueryMediaArgs,
} from '../../../../../types/generated/graphql'

type MenuButtonProps = {
  active?: boolean
}

const MenuButton = styled.div<MenuButtonProps>`
  background: ${({active}) => (active ? '#ed827b' : 'white')};
  color: ${({active}) => (active ? 'white' : '#ed827b')};

  &:hover {
    background: #ed827b;
    color: white;
  }
`

type SideBoxProps = {
  media: Media
}

const SideBox: FC<SideBoxProps> = ({media}) => {
  const mediaType = ((type) => {
    switch (type) {
      case MediaType.Article:
        return {
          type: MediaType.Article,
          name: 'Article',
          icon: faNewspaper,
        }

      case MediaType.Clip:
        return {
          type: MediaType.Clip,
          name: 'Video',
          icon: faVideo,
        }

      case MediaType.Podcast:
        return {
          type: MediaType.Podcast,
          name: 'Podcast',
          icon: faMicrophoneAlt,
        }
    }
  })(media.type)

  return (
    <div className="px-4 py-6">
      <h1 className="text-xl text-gray-700 font-semibold">Edit Media</h1>

      <HorizontalLine className="my-4" />

      <h1 className="text-xl text-gray-700 font-semibold">Media Type</h1>

      <div className="mt-4">
        <MenuButton active className="rounded p-2 flex flex-row items-center">
          <FontAwesomeIcon icon={mediaType.icon} />
          <span className="text-md font-medium ml-4">{mediaType.name}</span>
        </MenuButton>
      </div>
    </div>
  )
}

const UPDATE_MEDIA = gql`
  mutation UpdateMedia($args: UpdateMediaArgs!) {
    updateMedia(args: $args) {
      _id
    }
  }
`

type FormProps = {
  media: Media
}

const Form: FC<FormProps> = ({media}) => {
  const router = useRouter()
  const {state: formState, dispatch: dispatchForm} = useMediaForm()
  const [updateMedia] = useMutation<
    Pick<Mutation, 'updateMedia'>,
    MutationUpdateMediaArgs
  >(UPDATE_MEDIA)

  useEffect(() => {
    const {name, description, paragraph, tagIds, videoId, podcastKey} = media
    dispatchForm({
      type: MediaFormActionTypes.SetForm,
      payload: {
        name,
        description,
        tagIds,
        mediaType: media.type,
        paragraph: {
          value: paragraph,
        },
        videoId,
        podcastKey,
      },
    })
  }, [])

  const closeForm = () => {
    dispatchForm({type: MediaFormActionTypes.ResetForm})
    router.push(`/playlists/${media.playlist._id}/media/${media._id}`)
  }

  const onUpdateClick = () => {
    const {name, tagIds, paragraph, videoId, podcastKey} = formState

    updateMedia({
      variables: {
        args: {
          _id: media._id,
          name,
          tagIds,
          paragraph,
          videoId,
          podcastKey
        },
      },
      update: (cache) => {
        cache.reset()
        closeForm()
      },
    })
  }

  const FormComponent = ((type) => {
    switch (type) {
      case MediaType.Article:
        return ArticleForm
      case MediaType.Clip:
        return VideoForm
      case MediaType.Podcast:
        return PodcastForm
    }
  })(formState.mediaType)

  return (
    <div>
      <FormComponent />
      <div className="py-4">
        <MediaFormButtons
          update
          onSubmit={onUpdateClick}
          onCancel={closeForm}
        />
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
      tagIds
      playlist {
        _id
        user {
          _id
          firstName
          lastName
        }
      }
    }
  }
`

const MediaForm: NextPage = () => {
  const router = useRouter()
  const {id: playlistId, mediaId} = router.query

  if (!playlistId || !mediaId) {
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
    <MediaFormProvider>
      <Layout SideComponent={() => <SideBox media={media[0]} />}>
        <div className="w-10/12 mt-8 mx-auto bg-white rounded-xl shadow-xl">
          <Form media={media[0]} />
        </div>
      </Layout>
    </MediaFormProvider>
  )
}

export default MediaForm
