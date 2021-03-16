import {FC} from 'react'
import {OutlinedButton} from '../common'

type MediaFormButtonsProps = {
  update?: boolean
  onSubmit: () => void
  onCancel: () => void
}

const MediaFormButtons: FC<MediaFormButtonsProps> = ({
  update,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="mt-16 flex flex-row justify-around">
      <OutlinedButton
        className="text-lg font-medium px-8 py-1 rounded focus:outline-none"
        onClick={onCancel}
      >
        Cancel
      </OutlinedButton>

      <OutlinedButton
        className="text-lg font-medium px-8 py-1 rounded focus:outline-none"
        onClick={onSubmit}
      >
        {!update ? 'Create' : 'Update'}
      </OutlinedButton>
    </div>
  )
}

export default MediaFormButtons
