import {GetServerSideProps, NextPage} from 'next'
import {Layout} from '../components'

const Home: NextPage = () => {
  return (
    <Layout>
      <h1>Hello World!</h1>
    </Layout>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
    redirect: {
      destination: '/demo/playlists'
    }
  }
}
