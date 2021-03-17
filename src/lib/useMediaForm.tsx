import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  FC,
  Reducer,
} from 'react'
import {MediaType} from '../types/generated/graphql'

enum MediaFormType {
  Create = 'CREATE',
  Edit = 'EDIT',
}

type MediaFormState = {
  type: MediaFormType
  mediaType: MediaType
  name: string
  paragraph?: string[]
  paragraphIndex: number
  description?: string
  tagIds: string[]
}

const initialState: MediaFormState = {
  type: MediaFormType.Create,
  mediaType: MediaType.Article,
  name: '',
  paragraph: [''],
  paragraphIndex: 0,
  description: '',
  tagIds: [],
}

export enum MediaFormActionTypes {
  EditMediaType = 'EDIT_MEDIA_TYPE',
  EditName = 'EDIT_NAME',
  EditTagIds = 'EDIT_TAG_IDS',
  SetParagraph = 'SET_PARAGRAPH',
  AddParagraph = 'ADD_PARAGRAPH',
  EditParagraph = 'EDIT_PARAGRAPH',
  RemoveParagraph = 'REMOVE_PARAGRAPH',
  FocusParagraph = 'FOCUS_PARAGRAPH',
  EditDescription = 'EDIT_DESCRIPTION',
  SetForm = 'SET_FORM',
  ResetForm = 'RESET_FORM',
}

type MediaFormPayload = Partial<Omit<MediaFormState, 'paragraph'>> & {
  paragraph?: {
    index?: number
    text?: string
    value?: string[]
  }
}

type MediaFormAction = {
  type: MediaFormActionTypes
  payload?: MediaFormPayload
}

const reducer: Reducer<MediaFormState, MediaFormAction> = (state, action) => {
  switch (action.type) {
    case MediaFormActionTypes.EditMediaType:
      return {...state, mediaType: action.payload.mediaType}

    case MediaFormActionTypes.EditName:
      return {...state, name: action.payload.name}

    case MediaFormActionTypes.EditTagIds:
      return {...state, tagIds: action.payload.tagIds}

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

    case MediaFormActionTypes.EditDescription:
      return {
        ...state,
        description: action.payload.description,
      }

    case MediaFormActionTypes.SetForm: {
      const {name, description, tagIds, mediaType, paragraph} = action.payload
      return {
        ...state,
        name,
        description,
        tagIds,
        mediaType,
        paragraph: paragraph.value,
      }
    }

    case MediaFormActionTypes.ResetForm:
      return initialState

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
