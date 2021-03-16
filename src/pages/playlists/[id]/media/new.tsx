import {faNewspaper} from '@fortawesome/free-regular-svg-icons'
import {faVideo} from '@fortawesome/free-solid-svg-icons'
import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {FC} from 'react'
import {Layout} from '../../../../components'
import {ArticleForm, VideoForm, MediaFormButtons} from '../../../../components/MediaForm'
import useMediaForm, {
  MediaFormActionTypes,
  MediaFormProvider,
} from '../../../../lib/useMediaForm'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {HorizontalLine} from '../../../../components/common'
import {gql, useMutation} from '@apollo/client'
import {
  Mutation,
  MutationCreateMediaArgs,
  MediaType,
} from '../../../../types/generated/graphql'

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

const SideBox: FC = () => {
  const {state: formState, dispatch: dispatchForm} = useMediaForm()
  const formTitle = 'Create Media'

  const mediaTypes = [
    {
      type: MediaType.Article,
      name: 'Article',
      icon: faNewspaper,
    },
    {
      type: MediaType.Clip,
      name: 'Video',
      icon: faVideo,
    },
  ]

  return (
    <div className="px-4 py-6">
      <h1 className="text-xl text-gray-700 font-semibold">{formTitle}</h1>

      <HorizontalLine className="my-4" />

      <h1 className="text-xl text-gray-700 font-semibold">Select Media Type</h1>

      <div className="mt-4">
        {mediaTypes.map(({type, name, icon}) => (
          <MenuButton
            key={type}
            active={type === formState.mediaType}
            className="rounded p-2 cursor-pointer flex flex-row items-center"
            onClick={() =>
              dispatchForm({
                type: MediaFormActionTypes.EditMediaType,
                payload: {mediaType: type},
              })
            }
          >
            <FontAwesomeIcon icon={icon} />
            <span className="text-md font-medium ml-4">{name}</span>
          </MenuButton>
        ))}
      </div>
    </div>
  )
}

const CREATE_MEDIA = gql`
  mutation CreateMedia($args: CreateMediaArgs!) {
    createMedia(args: $args) {
      _id
    }
  }
`

type FormProps = {
  playlistId: string
}

const Form: FC<FormProps> = ({playlistId}) => {
  const router = useRouter()
  const {state: formState} = useMediaForm()
  const [createMedia] = useMutation<
    Pick<Mutation, 'createMedia'>,
    MutationCreateMediaArgs
  >(CREATE_MEDIA)

  const onCreateClick = () => {
    const {name, tagIds, mediaType, paragraph} = formState

    createMedia({
      variables: {
        args: {
          playlistId,
          name,
          tagIds,
          type: mediaType,
          paragraph,
        },
      },
      update: (cache) => {
        cache.reset()
        router.push(`/playlists/${playlistId}/media`)
      }
    })
  }

  const FormComponent = ((type) => {
    switch (type) {
      case MediaType.Article:
        return ArticleForm
      case MediaType.Clip:
        return VideoForm
    }
  })(formState.mediaType)

  return (
    <div>
      <FormComponent />
      <div className="py-4">
        <MediaFormButtons onSubmit={onCreateClick} />
      </div>
    </div>
  )
}

const MediaForm: NextPage = () => {
  const router = useRouter()
  const {id: playlistId} = router.query

  if (!playlistId) {
    return <h1>Loading...</h1>
  }

  return (
    <MediaFormProvider>
      <Layout SideComponent={SideBox}>
        <div className="w-10/12 mt-8 mx-auto bg-white rounded-xl shadow-xl">
          <Form playlistId={playlistId as string} />
        </div>
      </Layout>
    </MediaFormProvider>
  )
}

export default MediaForm
