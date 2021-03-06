import {FC} from 'react'
import {OutlinedButton} from '../'

const MediaFormButtons: FC = () => {
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

export default MediaFormButtons
