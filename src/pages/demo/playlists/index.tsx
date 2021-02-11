import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {FC, useContext} from 'react'
import {Layout} from '../../../components'
import {PlaylistType, MediaTypes} from '../../../mock/data'
import {ActionTypes, MockContext} from '../../../mock/MockContext'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faNewspaper, faVideo} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

type TagProps = {
  color?: string
}

const Tag = styled.div<TagProps>`
  border-color: ${({color}) => color};
  border-width: 2px;

  ${({color}) =>
    color
      ? `
    background: ${color};
  `
      : `
    background: white;
  `}
`

const Card = styled.div`
  color: #626aaa;
`

const SideBox: FC = () => {
  const {state, dispatch} = useContext(MockContext)
  const {tags, search} = state

  return (
    <div className="p-4">
      <input
        type="text"
        className="w-full py-1 pl-2 rounded shadow"
        placeholder="Search"
      />

      <div className="mt-4">
        <h2 className="text-md font-medium">Tags</h2>
        <div className="w-full flex flex-row flex-wrap mt-2">
          {tags.map(({id, name, color}) => (
            <Tag
              key={id}
              color={search.tagIds.includes(id) ? color : undefined}
              className="rounded my-1 mr-2 px-2 text-black cursor-pointer"
              onClick={() => {
                !search.tagIds.includes(id)
                  ? dispatch({
                      type: ActionTypes.AddSearchTag,
                      payload: {
                        tagId: id,
                      },
                    })
                  : dispatch({
                      type: ActionTypes.RemoveSearchTag,
                      payload: {
                        tagId: id,
                      },
                    })
              }}
            >
              {name}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  )
}

type PlaylistCardProps = {
  playlist: PlaylistType
}

const PlaylistCard: FC<PlaylistCardProps> = ({playlist}) => {
  const router = useRouter()
  const {state} = useContext(MockContext)
  const {users, tags: mockTags, media} = state

  const {id, name, ownerId, tagIds} = playlist
  const owner = users.find((user) => user.id === ownerId)
  const tags = tagIds.map((tagId) =>
    mockTags.find((mockTag) => mockTag.id === tagId)
  )

  const types = media
    .filter((mediaOne) => mediaOne.playlistId === id)
    .map(({type}) => {
      const icon = ((type) => {
        switch (type) {
          case MediaTypes.Article:
            return faNewspaper
          case MediaTypes.Video:
            return faVideo
        }
      })(type)
      
      return {type, icon}
    })

  const onCardClick = () => {
    router.push(`/demo/playlists/${id}/media`)
  }

  return (
    <Card
      className="bg-white w-full rounded-lg shadow-xl p-4 my-8 cursor-pointer"
      onClick={onCardClick}
    >
      <div className="flex flex-row items-center">
        <div className="w-8 h-8 rounded-full bg-gray-500 mr-4" />

        <div>
          <h2 className="text-md font-medium">{owner.name}</h2>
          <h4 className="text-sm font-normal">Feb 2</h4>
        </div>
      </div>

      <div className="px-4 mt-2">
        <h1 className="text-xl font-semibold">{name}</h1>

        <div className="flex flex-row flex-wrap items-center">
          {types.map(({type, icon}) => (
            <div key={type} className="rounded my-2 mr-2 px-2">
              <FontAwesomeIcon icon={icon} size="lg" />
            </div>
          ))}
        </div>

        <div className="flex flex-row flex-wrap items-center">
          {tags.map(({id, name, color}) => (
            <Tag
              key={id}
              color={color}
              className="rounded my-2 mr-2 px-2 text-black"
            >
              {name}
            </Tag>
          ))}
        </div>
      </div>
    </Card>
  )
}

const Playlists: NextPage = () => {
  const {state} = useContext(MockContext)
  const {playlists, search} = state

  // TODO: this is for demo
  console.log(search)
  const searchResults = []
  search.tagIds.forEach((tagId) => {
    const filtered = playlists.filter((playlist) =>
      playlist.tagIds.includes(tagId)
    )
    filtered.forEach((playlist) => {
      if (!searchResults.includes(playlist)) {
        searchResults.push(playlist)
      }
    })
  })

  const results = search.tagIds.length !== 0 ? searchResults : playlists

  return (
    <Layout SideComponent={SideBox}>
      <div className="px-10 mt-8 mx-auto">
        {results.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </Layout>
  )
}

export default Playlists
