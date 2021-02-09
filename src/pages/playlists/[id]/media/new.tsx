import {NextPage} from 'next'
import {FC, useContext, useRef} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faNewspaper, faVideo, faUpload} from '@fortawesome/free-solid-svg-icons'
import {Layout} from '../../../../components'
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

const HorizontalLine = styled.hr`
  width: 100%;
  border-color: #626aaa;
  border-width: 1px;
`

const Button = styled.button`
  background: #267dcd;
  color: white;

  &:focus {
    outline: none;
  }
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
    <div className="px-4 py-4">
      <h1 className="text-lg font-bold">Select Media Type</h1>

      <div className="mt-4">
        {mediaTypes.map(({name, icon, type}) => (
          <MediaType
            key={type}
            className="flex flex-row items-center rounded my-2 py-2 pl-2 cursor-pointer"
            active={type === state.mediaType}
            onClick={() => dispatch({...initialMediaState, mediaType: type})}
          >
            <FontAwesomeIcon icon={icon} className="mr-4" />
            <h4 className="text-lg font-medium">{name}</h4>
          </MediaType>
        ))}
      </div>

      <HorizontalLine />

      <div className="mt-4">
        <Button className="w-full rounded text-xl font-medium my-1 py-1">
          Create
        </Button>
      </div>
    </div>
  )
}

const ArticleForm: FC = () => {
  return (
    <div className="w-full h-full px-10 py-10">
      <div>
        <h2 className="text-md font-semibold mb-1">Title</h2>
        <input
          className="w-full text-xl rounded-sm shadow-lg py-2 pl-4"
          placeholder="Title"
        />
      </div>
    </div>
  )
}

const VideoForm: FC = () => {
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
          />
        </div>

        <div className="mt-8">
          <h2 className="text-md font-semibold mb-1">Description</h2>
          <input
            className="w-full text-xl rounded-sm shadow-lg py-2 pl-4"
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
