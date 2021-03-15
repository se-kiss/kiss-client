import {GetServerSideProps, NextPage} from 'next'
import {Layout} from '../components'
import {Tag} from '../components/common'

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="mt-8">
        <Tag color="red">Hello World!</Tag>
      </div>
    </Layout>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
    redirect: {
      destination: '/playlists'
    }
  }
}
