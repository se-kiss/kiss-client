import {FC} from 'react'
import styled from 'styled-components'

const OutlinedButton = styled.button`
  border: 1px solid #ff8a83;
  color: #ff8a83;

  &:hover {
    color: white;
    background: #ff8a83;
  }
`

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
