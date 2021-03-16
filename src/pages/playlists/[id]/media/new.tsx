import {faNewspaper} from '@fortawesome/free-regular-svg-icons'
import {faVideo} from '@fortawesome/free-solid-svg-icons'
import {NextPage} from 'next'
import {FC} from 'react'
import {Layout} from '../../../../components'
import {ArticleForm, VideoForm} from '../../../../components/MediaForm'
import useMediaForm, {
  MediaFormActionTypes,
  MediaFormProvider,
} from '../../../../lib/useMediaForm'
import {MediaType} from '../../../../types/generated/graphql'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { HorizontalLine } from '../../../../components/common'

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

const Form: FC = () => {
  const {state: formState} = useMediaForm()

  switch (formState.mediaType) {
    case MediaType.Article:
      return <ArticleForm />
    case MediaType.Clip:
      return <VideoForm />
  }
}

const MediaForm: NextPage = () => {
  return (
    <MediaFormProvider>
      <Layout SideComponent={SideBox}>
        <div className="w-10/12 mt-8 mx-auto bg-white rounded-xl shadow-xl">
          <Form />
        </div>
      </Layout>
    </MediaFormProvider>
  )
}

export default MediaForm
