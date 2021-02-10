import {NextPage} from 'next'
import {FC, useContext, useRef} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faNewspaper, faVideo, faUpload} from '@fortawesome/free-solid-svg-icons'
import {Layout, HorizontalLine} from '../../../../components'
import {
  MediaFormProvider,
  MediaFormContext,
  MediaTypes,
  initialState as initialMediaState,
} from '../../../../lib/MediaFormContext'
import styled from 'styled-components'

type MediaTypeProps = {
  active?: boolean
}

type TagProps = {
  color?: string
}

const MediaType = styled.div<MediaTypeProps>`
  ${({active}) =>
    active
      ? `
    color: white;
    background: #626aaa;
  `
      : `
    color: #626aaa;
    background: white;
  `}

  &:hover {
    color: white;
    background: #626aaa;
  }
`

const Button = styled.button`
  background: #267dcd;
  color: white;

  &:focus {
    outline: none;
  }
`

const Tag = styled.div<TagProps>`
  background: ${({color}) => (color ? color : 'white')};
  color: white;
`

const SideBox: FC = () => {
  const {state, dispatch} = useContext(MediaFormContext)

  const mediaTypes = [
    {
      name: 'Article',
      icon: faNewspaper,
      type: MediaTypes.Article,
    },
    {
      name: 'Video',
      icon: faVideo,
      type: MediaTypes.Video,
    },
  ]

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">Select Media Type</h1>

      <div className="mt-4">
        {mediaTypes.map(({name, icon, type}) => (
          <MediaType
            key={type}
            className="flex flex-row items-center rounded my-2 py-2 pl-2 cursor-pointer"
            active={type === state.mediaType}
            onClick={() =>
              dispatch({
                ...initialMediaState,
                mediaType: type,
                title: state.title,
              })
            }
          >
            <FontAwesomeIcon icon={icon} className="mr-4" />
            <h4 className="text-lg font-medium">{name}</h4>
          </MediaType>
        ))}
      </div>

      <HorizontalLine className="my-4" />

      <div>
        <Button className="w-full rounded text-xl font-medium my-1 py-1">
          Create
        </Button>
      </div>
    </div>
  )
}

const TagField: FC = () => {
  const tags = [
    {
      name: 'Science',
      color: '#ff4090',
    },
    {
      name: 'Art',
      color: '#9fb4ff',
    },
    {
      name: 'Math',
      color: '#fbe1ff',
    },
  ]

  return (
    <div className="my-12">
      <h2 className="text-md font-semibold mb-4">Tags</h2>

      <select multiple size={5} className="w-1/3 h-20 shadow mb-4">
        {tags.map(({name}) => (
          <option key={name} className="text-md font-medium py-4 pl-2">{name}</option>
        ))}
      </select>

      <div className="flex flex-row flex-wrap">
        {tags.map(({name, color}) => (
          <Tag
            key={name}
            color={color}
            className="rounded p-1 mr-2 mb-2 font-bold"
          >
            {name}
          </Tag>
        ))}
      </div>
    </div>
  )
}

const ArticleForm: FC = () => {
  const {state, dispatch} = useContext(MediaFormContext)

  return (
    <div className="w-full h-full px-10 py-10">
      <div className="mb-6">
        <h2 className="text-md font-semibold mb-1">Title</h2>
        <input
          className="w-full text-xl rounded-sm shadow-lg py-2 pl-4"
          placeholder="Title"
          name="title"
          value={state.title}
          onChange={(e) => dispatch({[e.target.name]: e.target.value})}
        />
      </div>

      <TagField />

      <div className="my-12">
      <h2 className="text-md font-semibold mb-1">Content</h2>
        <textarea
          className="w-full h-60 text-xl rounded-sm shadow-lg py-2 pl-4 resize-none overflow-hidden"
          placeholder="Content"
        />
      </div>
    </div>
  )
}

const VideoForm: FC = () => {
  const {state, dispatch} = useContext(MediaFormContext)
  const videoInput = useRef(null)

  const onUploadClick = () => {
    videoInput.current.click()
  }

  return (
    <div className="w-full h-full">
      <div className="bg-black w-full h-80 flex justify-center items-center rounded-t">
        <Button
          className="rounded text-lg font-medium px-4 py-1"
          onClick={onUploadClick}
        >
          <FontAwesomeIcon icon={faUpload} className="mr-2" />
          <span>Upload</span>
        </Button>
        <input
          type="file"
          accept="video/*"
          ref={videoInput}
          className="hidden"
        />
      </div>

      <div className="w-full h-full px-10 py-4">
        <div>
          <h2 className="text-md font-semibold mb-1">Title</h2>
          <input
            className="w-full text-xl rounded-sm shadow-lg py-2 pl-4"
            placeholder="Title"
            name="title"
            value={state.title}
            onChange={(e) => dispatch({[e.target.name]: e.target.value})}
          />
        </div>

        <TagField />

        <div className="mt-8">
          <h2 className="text-md font-semibold mb-1">Description</h2>
          <textarea
            className="w-full h-24 text-xl rounded-sm shadow-lg py-2 pl-4 resize-none overflow-hidden"
            placeholder="Description"
          />
        </div>
      </div>
    </div>
  )
}

const Form: FC = () => {
  const {state} = useContext(MediaFormContext)

  switch (state.mediaType) {
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
        <div className="bg-white w-10/12 h-full mx-auto mt-2 rounded shadow">
          <Form />
        </div>
      </Layout>
    </MediaFormProvider>
  )
}

export default MediaForm
