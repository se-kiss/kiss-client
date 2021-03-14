import {NextPage} from 'next'
import {FC} from 'react'
import {Layout} from '../../../../components'
import {MediaFormProvider} from '../../../../lib/useMediaForm'

const SideBox: FC = () => {
  return (
    <div className="px-4 py-6">
      <h1 className="text-xl text-gray-700 font-bold">Select Media Type</h1>

      <div className="mt-4"></div>
    </div>
  )
}

const MediaForm: NextPage = () => {
  return (
    <MediaFormProvider>
      <Layout SideComponent={SideBox}>
        <div className="w-10/12 mt-8 mx-auto bg-white rounded-xl shadow-xl"></div>
      </Layout>
    </MediaFormProvider>
  )
}

export default MediaForm
