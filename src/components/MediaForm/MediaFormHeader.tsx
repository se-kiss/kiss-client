import {FC} from 'react'
import useMediaForm, {MediaFormActionTypes} from '../../lib/useMediaForm'
import {gql, useQuery} from '@apollo/client'
import {Query} from '../../types/generated/graphql'
import {Tag} from '../common'

const GET_TAGS = gql`
  query GetTags {
    tag {
      _id
      name
      color
    }
  }
`

const MediaFormHeader: FC = () => {
  const {state: formState, dispatch: dispatchForm} = useMediaForm()
  const {loading, data} = useQuery<Pick<Query, 'tag'>>(GET_TAGS)

  if (loading) {
    return <h1>Loading...</h1>
  }

  const {tag: tags} = data

  const onEditName = (name: string) => {
    dispatchForm({
      type: MediaFormActionTypes.EditName,
      payload: {
        name,
      },
    })
  }

  const onTagClick = (id: string) => {
    const tagIds = formState.tagIds.includes(id)
      ? formState.tagIds.filter((tagId) => tagId !== id)
      : [...formState.tagIds, id]

    dispatchForm({
      type: MediaFormActionTypes.EditTagIds,
      payload: {
        tagIds,
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
          {tags.map(({_id, name, color}) => (
            <Tag
              key={_id}
              color={formState.tagIds.includes(_id) ? color : undefined}
              className="px-2 py-1 text-sm text-gray-700 mt-1 mr-1 cursor-pointer"
              onClick={() => onTagClick(_id)}
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
