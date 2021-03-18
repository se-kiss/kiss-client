import {NextPage} from 'next'
import {FC} from 'react'
import {Layout} from '../../components'
import {Tag} from '../../components/common'
import {PlaylistCard} from '../../components/Playlist'
import {MediaType, Playlist, Query} from '../../types/generated/graphql'
import {gql, useQuery} from '@apollo/client'
import {faNewspaper} from '@fortawesome/free-regular-svg-icons'
import {faMicrophoneAlt, faVideo} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {SideBoxLoading} from '../../components/Loading'
import {MainLoading} from '../../components/Loading'
import useSearch, {SearchProvider} from '../../lib/useSearch'

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
  const {state, dispatch} = useSearch()
  const {text, tagIds, typeIds} = state

  const onTagClick = (id: string) => {
    const ids = tagIds.includes(id)
      ? tagIds.filter((tagId) => tagId !== id)
      : [...tagIds, id]

    dispatch({tagIds: ids})
  }

  const onTypeClick = (type: MediaType) => {
    const ids = typeIds.includes(type)
      ? typeIds.filter((typeId) => typeId !== type)
      : [...typeIds, type]

    dispatch({typeIds: ids})
  }

  const {loading, data} = useQuery<Pick<Query, 'tag'>>(GET_TAGS)

  if (loading) {
    return <SideBoxLoading />
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
        value={text}
        onChange={(e) => dispatch({text: e.target.value})}
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
        profileImageId
      }
      _updatedAt
    }
  }
`

type PlaylistListProps = {
  playlists: Playlist[]
}

const PlaylistList: FC<PlaylistListProps> = ({playlists}) => {
  // const {state} = useSearch()
  // const {tagIds, typeIds} = state

  // const filtered = playlists.map((playlist) => ({
  //   playlist,
  //   tagIds: playlist?.media.map(({tagIds}) => tagIds),
  //   typeIds: playlist?.media.map(({type}) => type),
  // })).filter((item) => item.tagIds.includes(tagIds))
  // .map(({playlist}) => playlist)

  return (
    <div className="px-10 mt-8 mx-auto">
    {playlists.map((playlist) => (
      <PlaylistCard key={playlist._id} playlist={playlist} />
    ))}
  </div>
  )
}

const Playlists: NextPage = () => {
  const {loading, data} = useQuery<Pick<Query, 'playlists'>>(GET_PLAYLISTS)

  if (loading) {
    return <MainLoading />
  }

  const {playlists} = data


  return (
    <SearchProvider>
      <Layout SideComponent={SideBox}>
        <PlaylistList playlists={playlists} />
      </Layout>
    </SearchProvider>
  )
}

export default Playlists
