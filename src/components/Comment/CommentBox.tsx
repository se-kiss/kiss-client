import {FC, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import {gql, useMutation} from '@apollo/client'
import {
  Me,
  Media,
  Mutation,
  MutationCreateCommentArgs,
} from '../../types/generated/graphql'

const CREATE_COMMENT = gql`
  mutation CreateComment($args: CreateCommentArgs!) {
    createComment(args: $args) {
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

type CommentBoxProps = {
  media: Media
  me: Me
}

const CommentBox: FC<CommentBoxProps> = ({media, me}) => {
  const [text, setText] = useState('')
  const [createComment] = useMutation<
    Pick<Mutation, 'createComment'>,
    MutationCreateCommentArgs
  >(CREATE_COMMENT)

  const onSubmit = () => {
    createComment({
      variables: {
        args: {
          userId: me.userId,
          mediaId: media._id,
          text,
        },
      },
      update: (cache) => {
        cache.reset()
      },
    })

    setText('')
  }

  return (
    <div className="flex flex-row items-center">
      <input
        name="text"
        type="text"
        className="w-full border border-gray-300 pl-2 py-1 text-lg rounded focus:outline-none"
        value={text}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSubmit()
        }}
        onChange={(e) => setText(e.target.value)}
      />

      <FontAwesomeIcon
        icon={faPaperPlane}
        className="ml-2 text-red-400 cursor-pointer"
        onClick={onSubmit}
      />
    </div>
  )
}

export default CommentBox
