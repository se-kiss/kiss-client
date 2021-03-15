import {NextPage} from 'next'
import {FC, useState} from 'react'
import {Layout} from '../../components'
import {Tag} from '../../components/common'
import {PlaylistCard} from '../../components/Playlist'
import {Playlist} from '../../types/generated/graphql'

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

  const [tagIds, setTagIds] = useState([])
  const onTagClick = (id) => {
    const ids = tagIds.includes(id)
      ? tagIds.filter((tagId) => tagId !== id)
      : [...tagIds, id]

    setTagIds(ids)
  }

  return (
    <div className="px-4 py-6">
      <input
        type="text"
        className="w-full py-1 pl-2 rounded border border-gray-300 focus:outline-none"
        placeholder="Search"
      />

      <div className="mt-4 p-2">
        <h2 className="text-md text-gray-700 font-medium">Tags</h2>
        <div className="w-full flex flex-row flex-wrap mt-2">
          {tags.map(({id, name, color}) => (
            <Tag
              key={id}
              color={tagIds.includes(id) && color}
              className="px-2 py-1 text-sm text-gray-700 mt-1 mr-1 cursor-pointer"
              onClick={() => onTagClick(id)}
            >
              {name}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  )
}

const Playlists: NextPage = () => {
  const playlists: Partial<Playlist>[] = [
    {
      _id: '1',
      name: 'Playlist 1',
    },
    {
      _id: '2',
      name: 'Playlist 2',
    },
  ]
  
  return (
    <Layout SideComponent={SideBox}>
      <div className="px-10 mt-8 mx-auto">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist._id} playlist={playlist} />
        ))}
      </div>
    </Layout>
  )
}

export default Playlists
