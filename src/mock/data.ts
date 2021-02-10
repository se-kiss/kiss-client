export type PlaylistType = {
  id: string
  name: string
  ownerId: string
  description?: string
  tagIds: string[]
}

export const playlists: PlaylistType[] = [
  {
    id: '1',
    name: 'Playlist 1',
    ownerId: '1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    tagIds: ['1', '2'],
  },
  {
    id: '2',
    name: 'Playlist 2',
    ownerId: '2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    tagIds: ['3'],
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
  playlistId: string
  name: string
  type: MediaTypes
  content?: string
  description?: string
}

export const media: MediaType[] = [
  {
    id: '1',
    playlistId: '1',
    name: 'Media 1',
    type: MediaTypes.Article,
    content: '',
  },
  {
    id: '2',
    playlistId: '1',
    name: 'Media 2',
    type: MediaTypes.Video,
    description: '',
  },
  {
    id: '3',
    playlistId: '2',
    name: 'Media 3',
    type: MediaTypes.Article,
    description: '',
  },
]

export type UserType = {
  id: string
  name: string
}

export const users: UserType[] = [
  {
    id: '0',
    name: 'Me',
  },
  {
    id: '1',
    name: 'Author 1',
  },
  {
    id: '2',
    name: 'Author 2',
  },
]
