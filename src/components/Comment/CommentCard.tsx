import {gql, useMutation} from '@apollo/client'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {FC, useState} from 'react'
import {
  Comment,
  Me,
  Mutation,
  MutationDeleteCommentArgs,
} from '../../types/generated/graphql'

type CommentCardProps = {
  comment: Comment
  me: Me
}

const DELETE_COMMENT = gql`
  mutation DeleteComment($args: DeleteCommentArgs!) {
    deleteComment(args: $args) {
      _id
    }
  }
`

const CommentCard: FC<CommentCardProps> = ({comment, me}) => {
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

  console.log(me?.userId, comment.user._id)
  return (
    <div
      className="flex flex-row justify-between items-center my-4"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex flex-row items-center">
        {/* <div className="w-6 h-6 bg-red-400 rounded-full" /> */}
        <div className="rounded-full w-6 h-6 bg-red-400">
          {comment?.user?.profileImageId && (
            <img className="rounded-full w-full h-6" src={comment?.user?.profileImageId} />
          )}
        </div>
        <h2 className="shadow p-2 ml-4 mr-6">{text}</h2>
      </div>

      {/* TODO: replace hardcord */}
      {comment.user._id === me?.userId && hover && (
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
