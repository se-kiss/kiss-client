import {NextPage} from 'next'
import {FC} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faNewspaper, faVideo} from '@fortawesome/free-solid-svg-icons'
import {Layout} from '../../../../components'
import styled from 'styled-components'

type MediaTypeProps = {
  active?: boolean
}

const MediaType = styled.div<MediaTypeProps>`
  ${({active}) =>
    active
      ? `
    color: white;
    background: #626aaa;
  `
      : `
    color: #626aaa;
    background: white;
  `}

  &:hover {
    color: white;
    background: #626aaa;
  }
`

const SideBox: FC = () => {
  const mediaTypes = [
    {
      name: 'Article',
      icon: faNewspaper,
      active: true,
    },
    {
      name: 'Video',
      icon: faVideo,
    },
  ]

  return (
    <div className="px-4 pt-4">
      <h1 className="text-lg font-bold">Select Media Type</h1>
      <div className="mt-4">
        {mediaTypes.map(({name, icon, active = false}) => (
          <MediaType
            key={name}
            className="flex flex-row items-center rounded my-2 py-2 pl-2 cursor-pointer"
            active={active}
          >
            <FontAwesomeIcon icon={icon} className="mr-4" />
            <h4 className="text-lg font-medium">{name}</h4>
          </MediaType>
        ))}
      </div>
    </div>
  )
}

const ArticleForm: FC = () => {
  return (
    <div className="w-full h-full">
      <div className="pt-10">
        <h2 className="text-md font-semibold mb-1">Title</h2>
        <input
          className="w-full text-xl rounded-sm shadow-lg py-2 pl-4"
          placeholder="Title"
        />
      </div>
    </div>
  )
}

const MediaForm: NextPage = () => {
  return (
    <Layout SideComponent={SideBox}>
      <div className="bg-white w-10/12 h-full mx-auto mt-2 px-10 rounded shadow">
        <ArticleForm />
      </div>
    </Layout>
  )
}

export default MediaForm
