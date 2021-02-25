import {NextPage} from 'next'
import {FC, useContext} from 'react'
import {Layout} from '../../../../components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faVideo} from '@fortawesome/free-solid-svg-icons'
import {faNewspaper} from '@fortawesome/free-regular-svg-icons'
import useMediaForm, {MediaFormProvider} from '../../../../lib/useMediaForm'
import {MediaTypes} from '../../../../mock/data'
import {MockContext} from '../../../../mock/MockContext'
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

type TagProps = {
  color?: string
}

const Tag = styled.div<TagProps>`
  border-color ${({color}) => (color ? color : 'lightgray')};
  background: ${({color}) => (color ? color : 'white')};
`

const OutlinedButton = styled.button`
  border: 1px solid #ff8a83;
  color: #ff8a83;

  &:hover {
    color: white;
    background: #ff8a83;
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
            onClick={() => dispatchForm({type})}
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

const ArticleForm: FC = () => {
  const {state: formState, dispatch: dispatchForm} = useMediaForm()
  const {state: mockState} = useContext(MockContext)
  const {tags} = mockState

  return (
    <div>
      <div>
        <h3 className="text-md text-gray-700 font-medium mb-2">Name</h3>
        <input
          name="name"
          type="text"
          className="w-full py-1 pl-2 rounded border border-gray-300 focus:outline-none"
          value={formState.name}
          onChange={(e) => dispatchForm({[e.target.name]: e.target.value})}
        />
      </div>

      <div className="mt-8">
        <h3 className="text-md text-gray-700 font-medium mb-2">Tags</h3>

        <div className="w-full flex flex-row flex-wrap">
          {tags.map(({id, name, color}) => (
            <Tag
              key={id}
              color={color}
              className="rounded my-1 mr-2 px-2 text-sm text-gray-700 font-medium border cursor-pointer"
            >
              {name}
            </Tag>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-md text-gray-700 font-medium mb-2">Content</h3>
        <textarea
          rows={8}
          className="w-full border border-gray-300 pl-2 py-1 text-lg rounded resize-none focus:outline-none"
        />
      </div>

      <div className="mt-8 flex flex-row justify-around">
        <OutlinedButton className="text-lg font-medium px-8 py-1 rounded focus:outline-none">
          Cancel
        </OutlinedButton>

        <OutlinedButton className="text-lg font-medium px-8 py-1 rounded focus:outline-none">
          Create
        </OutlinedButton>
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
      return null
    default:
      return null
  }
}

const MediaForm: NextPage = () => {
  return (
    <MediaFormProvider>
      <Layout SideComponent={SideBox}>
        <div className="w-10/12 px-10 py-6 mt-8 mx-auto bg-white rounded-xl shadow-xl">
          <Form />
        </div>
      </Layout>
    </MediaFormProvider>
  )
}

export default MediaForm
