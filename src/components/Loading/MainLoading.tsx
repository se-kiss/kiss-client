import {NextPage} from 'next'
import {Layout} from '..'
import {SideBoxLoading} from '.' 
import {FC} from 'react'
import ContentLoader from 'react-content-loader'

const PlaylistCardLoading: FC = () => {
    return(
        <div className="bg-white w-3/4 rounded-lg shadow-xl p-4 my-8 mx-auto cursor-pointer">
            <ContentLoader height={125}>
            </ContentLoader>
        </div>
    )
}
const PlaylistsPageLoading: NextPage = () => {
  return (
    <Layout SideComponent={SideBoxLoading}>
        <PlaylistCardLoading/>
    </Layout>
  )
}

export default PlaylistsPageLoading
