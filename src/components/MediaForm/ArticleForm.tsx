import React, {FC} from 'react'
import useMediaForm, {MediaFormActionTypes} from '../../lib/useMediaForm'
import {MediaFormHeader} from './'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faTimes} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const OutlinedButton = styled.button`
  border: 1px solid #ff8a83;
  color: #ff8a83;

  &:hover {
    color: white;
    background: #ff8a83;
  }
`

const ArticleForm: FC = () => {
  const {state: formState, dispatch: dispatchForm} = useMediaForm()
  const {paragraph, paragraphIndex} = formState

  const onAddParagraph = () => {
    dispatchForm({
      type: MediaFormActionTypes.AddParagraph,
    })
  }

  const onEditParagraph = (text: string, index: number) => {
    dispatchForm({
      type: MediaFormActionTypes.EditParagraph,
      payload: {
        paragraph: {
          index,
          text,
        },
      },
    })
  }

  const onRemoveParagraph = (index: number) => {
    dispatchForm({
      type: MediaFormActionTypes.RemoveParagraph,
      payload: {
        paragraph: {
          index,
        },
      },
    })
  }

  const onFocusParagraph = (index: number) => {
    dispatchForm({
      type: MediaFormActionTypes.FocusParagraph,
      payload: {
        paragraph: {
          index,
        },
      },
    })
  }

  return (
    <div className="px-10 py-6">
      <MediaFormHeader />

      <div className="mt-8">
        <h3 className="text-md text-gray-700 font-medium mb-2">Content</h3>
        {paragraph.map((text, index) => (
          <div key={`paragraph-${index}`} className="relative my-2 pt-2 pr-1">
            <textarea
              rows={8}
              className="w-full border border-gray-300 pl-2 py-1 text-lg rounded resize-none focus:outline-none"
              value={text}
              onChange={(e) => onEditParagraph(e.target.value, index)}
              onFocus={() => onFocusParagraph(index)}
            />

            {index !== 0 && paragraphIndex === index && (
              <OutlinedButton
                className="absolute w-4 h-4 bg-white top-0 right-0 flex justify-center items-center rounded-full focus:outline-none"
                onClick={() => onRemoveParagraph(index)}
              >
                <FontAwesomeIcon icon={faTimes} size="xs" />
              </OutlinedButton>
            )}
          </div>
        ))}

        <div className="mt-4">
          <OutlinedButton
            className="w-8 h-8 rounded-full focus:outline-none"
            onClick={onAddParagraph}
          >
            <FontAwesomeIcon icon={faPlus} />
          </OutlinedButton>
        </div>
      </div>
    </div>
  )
}

export default ArticleForm
