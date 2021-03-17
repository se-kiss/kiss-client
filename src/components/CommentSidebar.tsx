import {FC} from 'react'
import {useRouter} from 'next/router'
import {CommentCard} from '../components/comments'
import {gql, useQuery} from '@apollo/client'
import {Comment,Query,QueryCommentsArgs} from '../types/generated/graphql'



const CommentSidebar: FC = () => {
  const router = useRouter()
  const {userId} = router.query

  if (!userId) {
    return <h1>Loading...</h1>
  }

  const GET_COMMENT = gql`
  query GetComment($args: GetCommentArgs) {
    media(args: $args) {
      _id
      text
      user
      media
      _createdAt
    }
  }
  `
  //todo : finish this shit
  // const {loading, data} = useQuery<Pick<Query, 'comments'>, QueryCommentsArgs>(
  //   GET_COMMENT,
  //   {
  //     variables: {
  //       args: {
  //         ids: [userId as string],
  //       },
  //     },
  //   }
  // )

  // if (loading) {
  //   return <h1>Loading...</h1>
  // }

  // const {user} = data

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold text-gray-500">Comments</h1>
    </div>
  )
}

export default CommentSidebar