import {FC} from 'react'
import useMediaForm, {MediaFormActionTypes} from '../../lib/useMediaForm'

const MediaFormHeader: FC = () => {
  const {state: formState, dispatch: dispatchForm} = useMediaForm()

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

        <div className="w-full flex flex-row flex-wrap"></div>
      </div>
    </>
  )
}

export default MediaFormHeader
