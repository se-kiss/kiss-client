import {faUpload, faFileAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {GetServerSideProps, NextPage} from 'next'
import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  color: white;
  background: #ff8a83;
`

const Home: NextPage = () => {
  return (
    <>
      <div className="w-full h-80 bg-black rounded-t-xl flex justify-center items-center">
        <Button className="text-lg font-medium px-8 py-1 mx-4 rounded focus:outline-none hover:bg-red-400">
          <FontAwesomeIcon icon={faFileAlt} />
          <span className="ml-2">Select Video</span>
        </Button>

        <button className="text-lg font-medium px-8 py-1 mx-4 rounded bg-gray-400 text-white focus:outline-none">
          <FontAwesomeIcon icon={faUpload} />
          <span className="ml-2">Upload</span>
        </button>

        <input type="file" className="hidden" />
      </div>
    </>
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
