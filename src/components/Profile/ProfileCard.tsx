import {FC} from 'react'
import {
  Me,
  Mutation,
  MutationUpdateSubscriptionArgs,
  Query,
  QuerySubscriptionsArgs,
  User,
} from '../../types/generated/graphql'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserFriends} from '@fortawesome/free-solid-svg-icons'
import {gql, useMutation, useQuery} from '@apollo/client'
import {OutlinedButton} from '../common'
import styled from 'styled-components'

const Button = styled.button`
  background: #ed827b;
  color: white;

  &:focus {
    outline: none;
  }
`

type ProfileCardProps = {
  user: User
  me: Me
}

const UPDATE_SUBSCRIPTION = gql`
  mutation UpdateSubscription($args: UpdateSubscriptionArgs!) {
    updateSubscription(args: $args) {
      _id
    }
  }
`

const GET_SUBSCRIPTION = gql`
  query GetSubscription($args: GetSubscriptionsArgs) {
    subscriptions(args: $args) {
      _id
      follower
      following
    }
  }
`

const ProfileCard: FC<ProfileCardProps> = ({user, me}) => {
  const {firstName, lastName, profileImageId} = user

  const {loading, data} = useQuery<
    Pick<Query, 'subscriptions'>,
    QuerySubscriptionsArgs
  >(GET_SUBSCRIPTION, {
    variables: {
      args: {
        ids: [user._id],
      },
    },
  })

  const [updateSubscription] = useMutation<
    Pick<Mutation, 'updateSubscription'>,
    MutationUpdateSubscriptionArgs
  >(UPDATE_SUBSCRIPTION)

  if (loading) {
    return null
  }

  const {subscriptions} = data
  const subscription = subscriptions[0]
  const alreadyFollow = subscription.following
    ? subscription?.following.includes(user._id)
    : false

  const onFollowClick = () => {
    updateSubscription({
      variables: {
        args: {
          userId: me.userId,
          following: user._id,
        },
      },
      update: (cache) => {
        cache.reset()
      },
    })
  }

  return (
    <div className="bg-white w-3/4 rounded-lg shadow-xl p-4 my-8 mx-auto">
      <div className="flex justify-center">
        <div className="rounded-full w-32 h-32 bg-red-400">
          {profileImageId && (
            <img className="rounded-full w-full h-32 " src={profileImageId} />
          )}
        </div>
      </div>
      <h1 className="text-center text-2xl font-semibold text-gray-800">{`${firstName} ${lastName}`}</h1>
      <div className="flex justify-center items-center mt-4 text-gray-700">
        <FontAwesomeIcon icon={faUserFriends} />
        <h1 className="px-2 text-sm">
          {subscription.follower ? subscription.follower.length : 0} followers
        </h1>
        <FontAwesomeIcon icon={faUserFriends} />
        <h1 className="px-2 text-sm">
          {subscription.following ? subscription.following.length : 0} following
        </h1>
        {me.userId !== user._id &&
          (!alreadyFollow ? (
            <OutlinedButton
              className="px-4 rounded text-sm font-medium focus:outline-none"
              onClick={onFollowClick}
            >
              Follow
            </OutlinedButton>
          ) : (
            <Button className="px-4 rounded text-sm font-medium cursor-default focus:outline-none">
              Follow
            </Button>
          ))}
      </div>
    </div>
  )
}

export default ProfileCard
