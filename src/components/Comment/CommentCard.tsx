import {gql, useMutation} from '@apollo/client'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {FC, useState} from 'react'
import {
  Comment,
  Mutation,
  MutationDeleteCommentArgs,
} from '../../types/generated/graphql'

type CommentCardProps = {
  comment: Comment
}

const DELETE_COMMENT = gql`
  mutation DeleteComment($args: DeleteCommentArgs!) {
    deleteComment(args: $args) {
      _id
    }
  }
`

const CommentCard: FC<CommentCardProps> = ({comment}) => {
  const {text} = comment
  const [hover, setHover] = useState(false)
  const [deleteComment] = useMutation<
    Pick<Mutation, 'deleteComment'>,
    MutationDeleteCommentArgs
  >(DELETE_COMMENT)

  const onDeleteClick = () => {
    deleteComment({
      variables: {
        args: {
          _id: comment._id,
        },
      },
      update: (cache) => {
        cache.reset()
      },
    })
  }

  return (
    <div
      className="flex flex-row justify-between items-center my-4"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex flex-row items-center">
        <div className="w-6 h-6 bg-red-400 rounded-full" />
        <h2 className="shadow p-2 ml-4 mr-6">{text}</h2>
      </div>

      {/* TODO: replace hardcord */}
      {comment.user._id === '605106b54d80c94de1f2d1d3' && hover && (
        <div>
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="text-gray-400 cursor-pointer hover:text-red-400"
            onClick={onDeleteClick}
          />
        </div>
      )}
    </div>
  )
}

export default CommentCard
