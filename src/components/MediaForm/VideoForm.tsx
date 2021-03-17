import {FC, createRef, useState, useEffect} from 'react'
import useMediaForm, {MediaFormActionTypes} from '../../lib/useMediaForm'
import {MediaFormHeader} from './'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUpload} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import axios from 'axios'

const Button = styled.button`
  color: white;
  background: #ff8a83;
`

const VideoForm: FC = () => {
  const [videoUri, setVideoUri] = useState(null)
  const [selectedFile, selectFile] = useState(null)
  const {state: formState, dispatch: dispatchForm} = useMediaForm()
  const {description} = formState
  const FileInputRef = createRef<HTMLInputElement>()

  useEffect(() => {
    if (selectedFile) {
      const postVideo = async () => {
        const data = new FormData()
  
        data.append('video', selectedFile)

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_UPLOAD_URL}/upload/video`,
          data
        )

        // <iframe src="https://player.vimeo.com/${`video/524891127`}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="1280" height="720" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Video"></iframe>
        setVideoUri(`https://player.vimeo.com/${res.uri}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`)
        // dispatchForm({payload: {videoId: `https://player.vimeo.com/${res.uri}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}})
      }

      postVideo()
    }
  }, [selectedFile])

  const onUploadVideo = () => {
    FileInputRef.current.click()
  }

  console.log(videoUri)

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

        <input
          type="file"
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
