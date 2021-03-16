import {FC} from 'react'
import {Comment} from '../../types/generated/graphql'


type CommentCardProps = {
  comment: Comment
}

const CommentCard: FC<CommentCardProps> = ({comment}) => {
  const {text} = comment
  return (
    <div className="flex flex-row items-center my-4">
      <div className="w-6 h-6 bg-red-400 rounded-full" />
      <h2 className="shadow p-2 ml-4">{text}</h2>
    </div>
  )
}

export default CommentCard