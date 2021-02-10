import {NextPage} from 'next'
import {useContext} from 'react'
import {Layout} from '../../../components'
import {MockContext} from '../../../mock/MockContext'

const Playlists: NextPage = () => {
  const {state} = useContext(MockContext)
  console.log(state)
  return (
    <Layout>
      <div>
        <h1>Playlists</h1>
      </div>
    </Layout>
  )
}

export default Playlists