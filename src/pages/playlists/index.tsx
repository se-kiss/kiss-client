import {NextPage} from 'next'
import {FC, useState} from 'react'
import {Layout} from '../../components'
import {Tag} from '../../components/common'
import {PlaylistCard} from '../../components/Playlist'
import {MediaType, Query} from '../../types/generated/graphql'
import {gql, useQuery} from '@apollo/client'
import {faNewspaper} from '@fortawesome/free-regular-svg-icons'
import {faMicrophoneAlt, faVideo} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const GET_TAGS = gql`
  query GetTags {
    tag {
      _id
      name
      color
    }
  }
`

const SideBox: FC = () => {
  const [tagIds, setTagIds] = useState([])
  const [typeIds, setTypeIds] = useState([])

  const onTagClick = (id: string) => {
    const ids = tagIds.includes(id)
      ? tagIds.filter((tagId) => tagId !== id)
      : [...tagIds, id]

    setTagIds(ids)
  }

  const onTypeClick = (type: MediaType) => {
    const ids = typeIds.includes(type)
      ? typeIds.filter((typeId) => typeId !== type)
      : [...typeIds, type]

    setTypeIds(ids)
  }

  const {loading, data} = useQuery<Pick<Query, 'tag'>>(GET_TAGS)

  if (loading) {
    return <h1>Loading...</h1>
  }

  const {tag: tags} = data

  const types = [
    {
      type: MediaType.Article,
      icon: faNewspaper,
    },
    {
      type: MediaType.Clip,
      icon: faVideo,
    },
    {
      type: MediaType.Podcast,
      icon: faMicrophoneAlt,
    },
  ]

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
          {tags.map(({_id, name, color}) => (
            <Tag
              key={_id}
              color={tagIds.includes(_id) ? color : undefined}
              className="px-2 py-1 text-sm text-gray-700 mt-1 mr-1 cursor-pointer"
              onClick={() => onTagClick(_id)}
            >
              {name}
            </Tag>
          ))}
        </div>
      </div>

      <div className="mt-4 p-2">
        <h2 className="text-md text-gray-700 font-medium">Types</h2>
        <div className="w-full flex flex-row flex-wrap">
          {types.map(({type, icon}) => (
            <div
              key={type}
              className="mt-2 mr-4 cursor-pointer"
              onClick={() => onTypeClick(type)}
            >
              <FontAwesomeIcon
                icon={icon}
                size="lg"
                color={typeIds.includes(type) ? '#FF8A83' : '#D1D5DB'}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const GET_PLAYLISTS = gql`
  query GetPlaylists {
    playlists {
      _id
      name
      tags {
        _id
        name
        color
      }
      user {
        _id
        firstName
        lastName
      }
      _updatedAt
    }
  }
`

const Playlists: NextPage = () => {
  const {loading, data} = useQuery<Pick<Query, 'playlists'>>(GET_PLAYLISTS)

  if (loading) {
    return <h1>Loading...</h1>
  }

  console.log(data)
  const {playlists} = data

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
