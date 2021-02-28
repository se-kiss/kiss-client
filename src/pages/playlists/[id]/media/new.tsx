import {NextPage} from 'next'
import {FC, useContext, createRef} from 'react'
import {Layout} from '../../../../components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faTimes,
  faUpload,
  faVideo,
} from '@fortawesome/free-solid-svg-icons'
import {faNewspaper} from '@fortawesome/free-regular-svg-icons'
import useMediaForm, {
  MediaFormActionTypes,
  MediaFormProvider,
} from '../../../../lib/useMediaForm'
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

const Button = styled.button`
  color: white;
  background: #ff8a83;
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

const FormHeader: FC = () => {
  const {state: formState, dispatch: dispatchForm} = useMediaForm()
  const {state: mockState} = useContext(MockContext)
  const {tags} = mockState

  const onEditName = (name) => {
    dispatchForm({
      type: MediaFormActionTypes.EditName,
      payload: {
        name,
      },
    })
  }

  return (
    <>
      <div>
        <h3 className="text-md text-gray-700 font-medium mb-2">Name</h3>
        <input
          type="text"
          className="w-full py-1 pl-2 rounded border border-gray-300 focus:outline-none"
          value={formState.name}
          onChange={(e) => onEditName(e.target.value)}
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
    </>
  )
}

const FormButtons: FC = () => {
  return (
    <div className="mt-16 flex flex-row justify-around">
      <OutlinedButton className="text-lg font-medium px-8 py-1 rounded focus:outline-none">
        Cancel
      </OutlinedButton>

      <OutlinedButton className="text-lg font-medium px-8 py-1 rounded focus:outline-none">
        Create
      </OutlinedButton>
    </div>
  )
}

const ArticleForm: FC = () => {
  const {state: formState, dispatch: dispatchForm} = useMediaForm()
  const {paragraph, paragraphIndex} = formState

  const onAddParagraph = () => {
    dispatchForm({
      type: MediaFormActionTypes.AddParagraph,
    })
  }

  const onEditParagraph = (text, index) => {
    dispatchForm({
      type: MediaFormActionTypes.EditParagraph,
      payload: {
        paragraph: {
          index,
          text,
        },
      },
    })
  }

  const onRemoveParagraph = (index) => {
    dispatchForm({
      type: MediaFormActionTypes.RemoveParagraph,
      payload: {
        paragraph: {
          index,
        },
      },
    })
  }

  const onFocusParagraph = (index) => {
    dispatchForm({
      type: MediaFormActionTypes.FocusParagraph,
      payload: {
        paragraph: {
          index,
        },
      },
    })
  }

  return (
    <div className="px-10 py-6">
      <FormHeader />

      <div className="mt-8">
        <h3 className="text-md text-gray-700 font-medium mb-2">Content</h3>
        {paragraph.map((text, index) => (
          <div key={`paragraph-${index}`} className="relative my-2 pt-2 pr-1">
            <textarea
              rows={8}
              className="w-full border border-gray-300 pl-2 py-1 text-lg rounded resize-none focus:outline-none"
              value={text}
              onChange={(e) => onEditParagraph(e.target.value, index)}
              onFocus={() => onFocusParagraph(index)}
            />

            {index !== 0 && paragraphIndex === index && (
              <OutlinedButton
                className="absolute w-4 h-4 bg-white top-0 right-0 flex justify-center items-center rounded-full focus:outline-none"
                onClick={() => onRemoveParagraph(index)}
              >
                <FontAwesomeIcon icon={faTimes} size="xs" />
              </OutlinedButton>
            )}
          </div>
        ))}

        <div className="mt-4">
          <OutlinedButton
            className="w-8 h-8 rounded-full focus:outline-none"
            onClick={onAddParagraph}
          >
            <FontAwesomeIcon icon={faPlus} />
          </OutlinedButton>
        </div>
      </div>

      <FormButtons />
    </div>
  )
}

const VideoForm: FC = () => {
  const {state: formState, dispatch: dispatchForm} = useMediaForm()
  const {description} = formState
  const FileInputRef = createRef<HTMLInputElement>()

  const onUploadVideo = () => {
    FileInputRef.current.click()
  }

  const onEditDescription = (text: string) => {
    dispatchForm({
      type: MediaFormActionTypes.EditDescription,
      payload: {
        description: text,
      },
    })
  }

  return (
    <>
      <div className="w-full h-80 bg-black rounded-t-xl flex justify-center items-center">
        <Button
          className="text-lg font-medium px-8 py-1 rounded focus:outline-none hover:bg-red-400"
          onClick={onUploadVideo}
        >
          <FontAwesomeIcon icon={faUpload} />
          <span className="ml-2">Upload</span>
        </Button>

        <input type="file" className="hidden" ref={FileInputRef} />
      </div>

      <div className="px-10 py-6">
        <FormHeader />

        <div className="mt-8">
          <h3 className="text-md text-gray-700 font-medium mb-2">
            Description
          </h3>
          <textarea
            rows={8}
            className="w-full border border-gray-300 pl-2 py-1 text-lg rounded resize-none focus:outline-none"
            value={description}
            onChange={(e) => onEditDescription(e.target.value)}
          />
        </div>

        <FormButtons />
      </div>
    </>
  )
}

const Form: FC = () => {
  const {state: formState} = useMediaForm()
  console.log(formState)

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
