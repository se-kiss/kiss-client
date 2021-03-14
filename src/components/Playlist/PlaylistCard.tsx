import {FC} from 'react'

const PlaylistCard: FC = () => {
  return (
    <div className="bg-white w-3/4 rounded-lg shadow-xl p-4 my-8 mx-auto cursor-pointer">
      <div className="flex flex-row items-center">
        <div className="w-8 h-8 rounded-full bg-red-400 mr-4" />

        <div>
          <h2 className="text-sm text-gray-700 font-medium">Owner</h2>
          <h4 className="text-xs text-gray-700 font-normal">Feb 2</h4>
        </div>
      </div>

      <div className="px-4 mt-2 mx-8">
        <h1 className="text-xl text-gray-700 font-medium"></h1>

        <div className="flex flex-row flex-wrap items-center">
        </div>

        <div className="flex flex-row flex-wrap items-center">
        </div>
      </div>
    </div>
  )
}

export default PlaylistCard
