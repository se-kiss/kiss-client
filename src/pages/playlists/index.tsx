import {NextPage} from 'next'
import {FC, useContext} from 'react'
import {Layout} from '../../components'
import {ActionTypes, MockContext} from '../../mock/MockContext'
import {PlaylistCard} from '../../components/Playlist'
import styled from 'styled-components'

type TagProps = {
  color?: string
}

const Tag = styled.div<TagProps>`
  border-color ${({color}) => (color ? color : 'lightgray')};
  background: ${({color}) => (color ? color : 'white')};
`

const SideBox: FC = () => {
  const {state, dispatch} = useContext(MockContext)
  const {tags, search} = state

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
              color={search.tagIds.includes(id) ? color : undefined}
              className="rounded my-1 mr-2 px-2 text-sm text-gray-700 font-medium border cursor-pointer"
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
