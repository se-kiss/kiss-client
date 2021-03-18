import {FC, createRef, useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import useMediaForm, {MediaFormActionTypes} from '../../lib/useMediaForm'
import {MediaFormHeader} from './'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFileAlt, faUpload} from '@fortawesome/free-solid-svg-icons'

const Button = styled.button`
  color: white;
  background: #ff8a83;
`

const PodcastForm: FC = () => {
  const [loading, setLoading] = useState(null)
  const [selectedFile, selectFile] = useState(null)
  const {state: formState, dispatch: dispatchForm} = useMediaForm()
  const {description} = formState
  const FileInputRef = createRef<HTMLInputElement>()

  const onPodcastSelect = () => {
    FileInputRef.current.click()
  }

  const onPodcastUpload = () => {
    const postPodcast = async () => {
      const data = new FormData()

      data.append('podcast', selectedFile)
      data.append('podcastName', selectedFile.name)

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_UPLOAD_URL}/upload/podcast`,
        data
      )

      // <iframe width="100%" height="120" src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2FNestZ671%2Fa77f8074b7fcc758ed2b387aac31ab17%2F" frameborder="0" ></iframe>
      const podcastKey = res.data.uri
        ? `https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=${res.data.uri}`
        : null

      console.log(podcastKey)

      dispatchForm({
        type: MediaFormActionTypes.SetPodcastKey,
        payload: {podcastKey},
      })
      setLoading(false)
    }

    setLoading(true)
    postPodcast()
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
      <div className="w-full h-36 bg-black rounded-t-xl flex flex-col justify-center items-center">
        <Button
          className={`text-lg font-medium px-8 py-1 my-2 rounded focus:outline-none ${
            selectedFile && 'bg-red-400'
          } hover:bg-red-400`}
          onClick={onPodcastSelect}
        >
          <FontAwesomeIcon icon={faFileAlt} />
          <span className="ml-2">{!selectedFile ? 'Select File' : 'File'}</span>
        </Button>

        <Button
          className="text-lg font-medium px-8 py-1 my-2 rounded focus:outline-none hover:bg-red-400"
          onClick={onPodcastUpload}
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
          accept="audio/*"
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

export default PodcastForm
