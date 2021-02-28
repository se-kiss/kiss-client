import {FC, createRef} from 'react'
import useMediaForm, {MediaFormActionTypes} from '../../lib/useMediaForm'
import {MediaFormHeader, MediaFormButtons} from './'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUpload} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const Button = styled.button`
  color: white;
  background: #ff8a83;
`

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

        <MediaFormButtons />
      </div>
    </>
  )
}

export default VideoForm