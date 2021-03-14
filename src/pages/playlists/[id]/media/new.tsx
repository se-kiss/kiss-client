import {NextPage} from 'next'
import {FC} from 'react'
import {Layout} from '../../../../components'
import {ArticleForm, VideoForm} from '../../../../components/MediaForm'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faVideo} from '@fortawesome/free-solid-svg-icons'
import {faNewspaper} from '@fortawesome/free-regular-svg-icons'
import useMediaForm, {
  MediaFormActionTypes,
  MediaFormProvider,
} from '../../../../lib/useMediaForm'
import {MediaTypes} from '../../../../mock/data'
import styled from 'styled-components'

type TypeButtonProp = {
  active?: boolean
}

const TypeButton = styled.div<TypeButtonProp>`
  background: ${({active}) => (active ? '#ED827B' : 'white')};
  color: ${({active}) => (active ? 'white' : '#ED827B')};

  &:hover {
    background: #ed827b;
    color: white;
  }
`

const SideBox: FC = () => {
  const typeButtons = [
    {
      type: MediaTypes.Article,
      name: 'Article',
      icon: faNewspaper,
    },
    {
      type: MediaTypes.Video,
      name: 'Video',
      icon: faVideo,
    },
  ]

  const {state: formState, dispatch: dispatchForm} = useMediaForm()

  return (
    <div className="px-4 py-6">
      <h1 className="text-xl text-gray-700 font-bold">Select Media Type</h1>

      <div className="mt-4">
        {typeButtons.map(({type, name, icon}) => (
          <TypeButton
            key={name}
            active={formState.type === type}
            onClick={() =>
              dispatchForm({
                type: MediaFormActionTypes.EditType,
                payload: {
                  type,
                },
              })
            }
            className="rounded p-2 cursor-pointer flex flex-row items-center"
          >
            <FontAwesomeIcon icon={icon} />
            <span className="text-md font-medium ml-4">{name}</span>
          </TypeButton>
        ))}
      </div>
    </div>
  )
}

const Form: FC = () => {
  const {state: formState} = useMediaForm()

  switch (formState.type) {
    case MediaTypes.Article:
      return <ArticleForm />
    case MediaTypes.Video:
      return <VideoForm />
    default:
      return null
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
