import {NextPage} from 'next'
import {FC} from 'react'
import {Layout} from '../../../../components'
import {HorizontalLine} from '../../../../components/common'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
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
  const menuButtons = [
    {
      name: 'Add Media',
      icon: faPlus,
    },
  ]

  return (
    <div className="px-4 py-6">
      <div>
        <h1 className="text-xl text-gray-700 font-bold"></h1>

        <div className="flex flex-row flex-wrap items-center"></div>

        <p className="text-md text-gray-700 font-medium mt-2"></p>
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
