import {NextPage} from 'next'
import {FC} from 'react'
import {Layout} from '../../../../components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faVideo} from '@fortawesome/free-solid-svg-icons'
import {faNewspaper} from '@fortawesome/free-regular-svg-icons'
import useMediaForm, {MediaFormProvider} from '../../../../lib/useMediaForm'
import {MediaTypes} from '../../../../mock/data'
import styled from 'styled-components'

type TypeButtonProp = {
  active?: boolean
}

const TypeButton = styled.div<TypeButtonProp>`
  background: ${({active}) => active ? '#ED827B' : 'white'};
  color: ${({active}) => active ? 'white' : '#ED827B'};

  &:hover {
    background: #ED827B;
    color: white;
  }
`

const SideBox: FC = () => {
  const typeButtons = [
    {
      type: MediaTypes.Article,
      name: 'Article',
      icon: faNewspaper,
    },
    {
      type: MediaTypes.Video,
      name: 'Video',
      icon: faVideo,
    },
  ]

  const {state: formState, dispatch: dispatchForm} = useMediaForm()

  return (
    <div className="px-4 py-6">
      <h1 className="text-xl text-gray-700 font-bold">Select Media Type</h1>

      <div className="mt-4">
        {typeButtons.map(({type, name, icon}) => (
          <TypeButton
            key={name}
            active={formState.type === type}
            onClick={() => dispatchForm({type})}
            className="rounded p-2 cursor-pointer flex flex-row items-center"
          >
            <FontAwesomeIcon icon={icon} />
            <span className="text-md font-medium ml-4">{name}</span>
          </TypeButton>
        ))}
      </div>
    </div>
  )
}

const MediaForm: NextPage = () => {
  return (
    <MediaFormProvider>
      <Layout SideComponent={SideBox}></Layout>
    </MediaFormProvider>
  )
}

export default MediaForm
