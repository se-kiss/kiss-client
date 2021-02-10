import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {FC, useContext} from 'react'
import {Layout, HorizontalLine, PlaylistForm} from '../../../../components'
import {ModalContext} from '../../../../lib/ModalContext'
import {
  PlaylistFormContext,
  PlaylistFormMode,
} from '../../../../lib/PlaylistFormContext'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

type MenuItemProps = {
  active?: boolean
}

const MenuItem = styled.div<MenuItemProps>`
  ${({active}) =>
    active
      ? `
    color: white;
    background: #626aaa;
`
      : `
    color: #626aaa;
    background: white;
`}

  &:hover {
    color: white;
    background: #626aaa;
  }
`

const SideBox: FC = () => {
  const router = useRouter()
  const {dispatch: dispatchModal} = useContext(ModalContext)
  const {dispatch: dispatchPlaylistForm} = useContext(PlaylistFormContext)

  const menuItems = [
    {
      name: 'Add Media',
      icon: faPlus,
      onClick: () => {
        router.push(`/playlists/${1}/media/new`)
      },
    },
    {
      name: 'Edit Playlist',
      icon: faEdit,
      onClick: () => {
        dispatchPlaylistForm({mode: PlaylistFormMode.Edit})
        dispatchModal({show: true, Content: PlaylistForm})
      },
    },
    {
      name: 'Delete Playlist',
      icon: faTrash,
    },
  ]

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Playlist</h1>
      <p className="text-md font-normal">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <HorizontalLine className="my-4" />

      <div>
        {menuItems.map(({name, icon, onClick}) => (
          <MenuItem
            key={name}
            className="flex flex-row items-center rounded my-2 py-2 pl-2 cursor-pointer"
            onClick={onClick}
          >
            <FontAwesomeIcon icon={icon} className="mr-4" />
            <h4 className="text-lg font-medium">{name}</h4>
          </MenuItem>
        ))}
      </div>
    </div>
  )
}

const Playlist: NextPage = () => {
  return (
    <Layout SideComponent={SideBox}>
      <h1>Playlist</h1>
    </Layout>
  )
}

export default Playlist
