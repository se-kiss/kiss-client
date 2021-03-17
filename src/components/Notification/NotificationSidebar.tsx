import {FC} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import useSidebar, {SidebarActionTypes} from '../../lib/useSidebar'
import {gql, useQuery} from '@apollo/client'
import {Notification, Query} from '../../types/generated/graphql'
import {HorizontalLine} from '../common'

const GET_NOTIFICATIONS = gql`
  query GetNotification {
    notification {
      _id
      notificationType
      ownerUser {
        _id
        firstName
        lastName
      }
      _createdAt
    }
  }
`

// type NotificationItemProps = {
//   notification: Notification
// }

// const NotificationItem: FC<NotificationItemProps> = ({notification}) => {
//   const {ownerUser: owner, _createdAt} = notification
//   const createdDate = new Date(_createdAt)
//   const formatedDate = Intl.DateTimeFormat('en-US', {
//     month: 'short',
//     day: 'numeric',
//   }).format(createdDate)

//   return (
//     <div>
//       <h2 className="">
//         {owner.firstName} {owner.lastName} posts
//       </h2>
//       <h4 className="">{formatedDate}</h4>
//     </div>
//   )
// }

const NotificationSidebar: FC = () => {
  // const {loading, data} = useQuery<Pick<Query, 'notification'>>(
  //   GET_NOTIFICATIONS
  // )

  const {dispatch} = useSidebar()
  const onSidebarHide = () => {
    dispatch({
      type: SidebarActionTypes.HideSidebar,
    })
  }

  // if (loading) {
  //   return <h1>Loading...</h1>
  // }

  // const {notification} = data

  return (
    <div className="p-4 w-full h-full">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-500">Notifications</h1>

        <FontAwesomeIcon
          icon={faTimes}
          className="cursor-pointer mr-2 text-gray-500"
          onClick={onSidebarHide}
        />
      </div>

      <div className="overflow-y-auto h-full mt-2">
        {/* {notification.map((noti, index) => (
          <>
            {index !== 0 && <HorizontalLine className="my-4" />}
            <NotificationItem key={noti._id} notification={noti} />
          </>
        ))} */}
      </div>
    </div>
  )
}

export default NotificationSidebar
