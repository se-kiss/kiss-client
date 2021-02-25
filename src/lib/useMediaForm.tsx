import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  FC,
  Reducer,
} from 'react'
import {MediaTypes} from '../mock/data'

type MediaFormState = {
  type: MediaTypes
  name: string
  paragraph?: string[]
  paragraphIndex: number
}

const initialState: MediaFormState = {
  type: MediaTypes.Article,
  name: '',
  paragraph: [''],
  paragraphIndex: 0,
}

export enum MediaFormActionTypes {
  EditType = 'EDIT_TYPE',
  EditName = 'EDIT_NAME',
  AddParagraph = 'ADD_PARAGRAPH',
  EditParagraph = 'EDIT_PARAGRAPH',
  RemoveParagraph = 'REMOVE_PARAGRAPH',
  FocusParagraph = 'FOCUS_PARAGRAPH',
}

type MediaFormPayload = Partial<Omit<MediaFormState, 'paragraph'>> & {
  paragraph?: {
    index?: number
    text?: string
  }
}

type MediaFormAction = {
  type: MediaFormActionTypes
  payload?: MediaFormPayload
}

const reducer: Reducer<MediaFormState, MediaFormAction> = (state, action) => {
  switch (action.type) {
    case MediaFormActionTypes.EditType:
      return {...state, type: action.payload.type}

    case MediaFormActionTypes.EditName:
      return {...state, name: action.payload.name}

    case MediaFormActionTypes.AddParagraph: {
      const paragraph = [...state.paragraph, '']
      return {
        ...state,
        paragraph,
      }
    }

    case MediaFormActionTypes.EditParagraph: {
      const {paragraph: payloadParagraph} = action.payload
      const paragraph = state.paragraph.map((text, index) =>
        payloadParagraph.index === index ? payloadParagraph.text : text
      )
      return {
        ...state,
        paragraph,
      }
    }

    case MediaFormActionTypes.RemoveParagraph: {
      const {paragraph: payloadParagraph} = action.payload
      const paragraph = state.paragraph.filter(
        (text, index) => index !== payloadParagraph.index
      )
      return {
        ...state,
        paragraph,
      }
    }

    case MediaFormActionTypes.FocusParagraph:
      return {
        ...state,
        paragraphIndex: action.payload.paragraph.index,
      }

    default:
      return state
  }
}

interface IMediaContext {
  state: MediaFormState
  dispatch: Dispatch<MediaFormAction>
}

const MediaFormContext = createContext<IMediaContext>({
  state: initialState,
  dispatch: () => null,
})

export const MediaFormProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <MediaFormContext.Provider value={{state, dispatch}}>
      {children}
    </MediaFormContext.Provider>
  )
}

const useMediaForm = () => useContext(MediaFormContext)

export default useMediaForm
