import {FC} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {CommentBox, CommentCard} from './'
import useSidebar, {SidebarActionTypes} from '../../lib/useSidebar'
import {Media, Query, QueryCommentsArgs} from '../../types/generated/graphql'
import {gql, useQuery} from '@apollo/client'

const GET_COMMENTS = gql`
  query GetComments($args: GetCommentsArgs) {
    comments(args: $args) {
      _id
      text
      user {
        _id
        firstName
        lastName
      }
    }
  }
`

type CommentSidebarProps = {
  media: Media
}

const CommentSidebar: FC<CommentSidebarProps> = ({media}) => {
  const {loading, data} = useQuery<Pick<Query, 'comments'>, QueryCommentsArgs>(
    GET_COMMENTS,
    {
      variables: {
        args: {
          filters: {
            mediaId: media._id,
          },
        },
      },
    }
  )

  const {dispatch} = useSidebar()
  const onSidebarHide = () => {
    dispatch({
      type: SidebarActionTypes.HideSidebar,
    })
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  const {comments} = data

  return (
    <div className="p-4 w-full h-full">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-500">Comments</h1>

        <FontAwesomeIcon
          icon={faTimes}
          className="cursor-pointer mr-2 text-gray-500"
          onClick={onSidebarHide}
        />
      </div>

      <div className="overflow-y-auto h-4/5 mt-2">
        {comments.map((comment) => (
          <CommentCard key={comment._id} comment={comment} />
        ))}
      </div>

      <CommentBox media={media} />
    </div>
  )
}

export default CommentSidebar
