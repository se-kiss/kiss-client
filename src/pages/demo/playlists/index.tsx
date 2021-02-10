import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {FC, useContext} from 'react'
import {Layout} from '../../../components'
import {PlaylistType} from '../../../mock/data'
import {MockContext} from '../../../mock/MockContext'
import styled from 'styled-components'

type TagProps = {
  color?: string
}

const Tag = styled.div<TagProps>`
  background: ${({color}) => (color ? color : 'white')};
`

const Card = styled.div`
  color: #626aaa;
`

type PlaylistCardProps = {
  playlist: PlaylistType
}

const PlaylistCard: FC<PlaylistCardProps> = ({playlist}) => {
  const router = useRouter()
  const {state} = useContext(MockContext)
  const {users, tags: mockTags} = state

  const {id, name, ownerId, tagIds} = playlist
  const owner = users.find((user) => user.id === ownerId)
  const tags = tagIds.map((tagId) =>
    mockTags.find((mockTag) => mockTag.id === tagId)
  )

  const onCardClick = () => {
    router.push(`/demo/playlists/${id}/media`)
  }

  return (
    <Card className="bg-white w-9/12 rounded-lg shadow-xl p-4 my-8 cursor-pointer" onClick={onCardClick}>
      <div className="flex flex-row items-center">
        <div className="w-8 h-8 rounded-full bg-gray-500 mr-4" />

        <div>
          <h2 className="text-md font-medium">{owner.name}</h2>
          <h4 className="text-sm font-normal">Feb 2</h4>
        </div>
      </div>

      <div className="px-4 mt-2">
        <h1 className="text-xl font-semibold">{name}</h1>

        <div className="flex flex-row flex-wrap items-center mt-4">
          {tags.map(({id, name, color}) => (
            <Tag key={id} color={color} className="rounded mr-2 px-2 text-black">
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
  const {playlists} = state
  console.log(state)
  return (
    <Layout>
      <div className="px-10 mt-8 mx-auto">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </Layout>
  )
}

export default Playlists
