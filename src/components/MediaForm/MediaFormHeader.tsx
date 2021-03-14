import {FC, useContext} from 'react'
import useMediaForm, {MediaFormActionTypes} from '../../lib/useMediaForm'
import {MockContext} from '../../mock/MockContext'
import styled from 'styled-components'

type TagProps = {
  color?: string
}

const Tag = styled.div<TagProps>`
  border-color ${({color}) => (color ? color : 'lightgray')};
  background: ${({color}) => (color ? color : 'white')};
`

const MediaFormHeader: FC = () => {
  const {state: formState, dispatch: dispatchForm} = useMediaForm()
  const {state: mockState} = useContext(MockContext)
  const {tags} = mockState

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

        <div className="w-full flex flex-row flex-wrap">
          {tags.map(({id, name, color}) => (
            <Tag
              key={id}
              color={color}
              className="rounded my-1 mr-2 px-2 text-sm text-gray-700 font-medium border cursor-pointer"
            >
              {name}
            </Tag>
          ))}
        </div>
      </div>
    </>
  )
}

export default MediaFormHeader
