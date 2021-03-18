import {FC, createRef, useState} from 'react'
import useMediaForm, {MediaFormActionTypes} from '../../lib/useMediaForm'
import {MediaFormHeader} from './'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFileAlt, faUpload} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import axios from 'axios'

const Button = styled.button`
  color: white;
  background: #ff8a83;
`

const VideoForm: FC = () => {
  const [loading, setLoading] = useState(null)
  const [selectedFile, selectFile] = useState(null)
  const {state: formState, dispatch: dispatchForm} = useMediaForm()
  const {description} = formState
  const FileInputRef = createRef<HTMLInputElement>()

  const onVideoSelect = () => {
    FileInputRef.current.click()
  }

  const onVideoUpload = () => {
    const postVideo = async () => {
      const data = new FormData()

      data.append('video', selectedFile)

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_UPLOAD_URL}/upload/video`,
        data
      )

      const videoId = res.data.uri
        ? `https://player.vimeo.com${res.data.uri}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`
        : null

      dispatchForm({type: MediaFormActionTypes.SetVideoId, payload: {videoId}})
      setLoading(false)
    }

    setLoading(true)
    postVideo()
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
      <div className="w-full h-80 bg-black rounded-t-xl flex flex-col justify-center items-center">
        <Button
          className={`text-lg font-medium px-8 py-1 my-2 rounded focus:outline-none ${
            selectedFile && 'bg-red-400'
          } hover:bg-red-400`}
          onClick={onVideoSelect}
        >
          <FontAwesomeIcon icon={faFileAlt} />
          <span className="ml-2">{!selectedFile ? 'Select File' : 'File'}</span>
        </Button>

        <Button
          className="text-lg font-medium px-8 py-1 my-2 rounded focus:outline-none hover:bg-red-400"
          onClick={onVideoUpload}
        >
          <FontAwesomeIcon icon={faUpload} />
          <span className="ml-2">
            {loading === null
              ? 'Upload'
              : loading
              ? 'Uploading...'
              : 'Complete'}
          </span>
        </Button>

        <input
          type="file"
          accept="video/*"
          className="hidden"
          ref={FileInputRef}
          onChange={(e) => selectFile(e.target.files[0])}
        />
      </div>

      <div className="px-10 py-6">
        <MediaFormHeader />

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
      </div>
    </>
  )
}

export default VideoForm
