import {NextPage} from 'next'
import {FC} from 'react'
import {Layout} from '../../../../components'
import {HorizontalLine, Tag} from '../../../../components/common'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faEdit} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const MenuButton = styled.div`
  background: white;
  color: #ed827b;

  &:hover {
    background: #ed827b;
    color: white;
  }
`

const SideBox: FC = () => {
  const tags = [
    {
      id: 0,
      name: 'Science',
      color: '#ff934f',
    },
    {
      id: 1,
      name: 'Art',
      color: '#91F5AD',
    },
    {
      id: 2,
      name: 'Japanese',
      color: '#AEC5EB',
    },
  ]

  const menuButtons = [
    {
      name: 'Add Media',
      icon: faPlus,
    },
    {
      name: 'Edit / Delete Media',
      icon: faEdit,
    },
  ]

  return (
    <div className="px-4 py-6">
      <div>
        <h1 className="text-xl text-gray-700 font-bold">Playlist Name</h1>

        <div className="flex flex-row flex-wrap items-center mt-1">
          {tags.map(({id, name, color}) => (
            <Tag
              key={id}
              color={color}
              className="px-1 text-xs text-gray-700 mt-1 mr-1"
            >
              {name}
            </Tag>
          ))}
        </div>

        <p className="text-md text-gray-700 font-medium mt-2">Description</p>
      </div>

      <HorizontalLine className="my-4" />

      <div>
        {menuButtons.map(({name, icon}) => (
          <MenuButton
            key={name}
            className="rounded p-2 cursor-pointer flex flex-row items-center"
          >
            <FontAwesomeIcon icon={icon} />
            <span className="text-md font-medium ml-4">{name}</span>
          </MenuButton>
        ))}
      </div>
    </div>
  )
}

const Playlist: NextPage = () => {
  return (
    <Layout SideComponent={SideBox}>
      <div className="px-10 mt-8 mx-auto"></div>
    </Layout>
  )
}

export default Playlist
