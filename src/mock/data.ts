export type PlaylistType = {
  id: string,
  name: string,
  ownerId: string,
  description?: string
  tagIds: string[]
  mediaIds: string[]
}

export const playlists: PlaylistType[] = [
  {
    id: '1',
    name: 'Playlist 1',
    ownerId: '1',
    description: '',
    tagIds: ['1', '2'],
    mediaIds: ['1', '2'],
  },
]

export type TagType = {
  id: string
  name: string
  color: string
}

export const tags: TagType[] = [
  {
    id: '1',
    name: 'Physics',
    color: '#FF9B9B',
  },
  {
    id: '2',
    name: 'Biology',
    color: '#D9FEA9',
  },
  {
    id: '3',
    name: 'Math',
    color: '#DCE2FF',
  },
]

export enum MediaTypes {
  Article = 'ARTICLE',
  Video = 'VIDEO',
}

export type MediaType = {
  id: string
  name: string
  type: MediaTypes
  content?: string
  description?: string 
}

export const media: MediaType[] = [
  {
    id: '1',
    name: 'Media 1',
    type: MediaTypes.Article,
    content: '',
  },
  {
    id: '2',
    name: 'Media 2',
    type: MediaTypes.Video,
    description: '',
  },
]

export type UserType = {
  id: string
  name: string
}

export const users: UserType[] = [
  {
    id: '1',
    name: 'Author 1'
  }
]