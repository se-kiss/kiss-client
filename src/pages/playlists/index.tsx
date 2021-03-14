import {NextPage} from 'next'
import {FC} from 'react'
import {Layout} from '../../components'

const SideBox: FC = () => {
  return (
    <div className="px-4 py-6">
      <input
        type="text"
        className="w-full py-1 pl-2 rounded border border-gray-300 focus:outline-none"
        placeholder="Search"
      />

      <div className="mt-4 p-2">
        <h2 className="text-md text-gray-700 font-medium">Tags</h2>
        <div className="w-full flex flex-row flex-wrap mt-2"></div>
      </div>
    </div>
  )
}

const Playlists: NextPage = () => {
  return (
    <Layout SideComponent={SideBox}>
      <div className="px-10 mt-8 mx-auto"></div>
    </Layout>
  )
}

export default Playlists
