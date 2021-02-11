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
    name: 'Japanese',
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
  url?: string
}

export const media: MediaType[] = [
  {
    id: '1',
    playlistId: '1',
    name: 'Media 1',
    type: MediaTypes.Article,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fames ac turpis egestas integer eget aliquet nibh praesent. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Massa id neque aliquam vestibulum. Molestie a iaculis at erat. At consectetur lorem donec massa sapien faucibus et molestie ac. Semper feugiat nibh sed pulvinar proin gravida. In est ante in nibh. Molestie a iaculis at erat pellentesque adipiscing commodo elit at. Enim ut sem viverra aliquet eget. Sed faucibus turpis in eu mi bibendum neque egestas. Convallis tellus id interdum velit laoreet id. Consectetur purus ut faucibus pulvinar elementum.',
  },
  {
    id: '2',
    playlistId: '1',
    name: 'Media 2',
    type: MediaTypes.Video,
    url: 'https://www.youtube.com/embed/K1CX6hWwqz8?start=015',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna sit amet purus gravida. Ac odio tempor orci dapibus ultrices.',
  },
  {
    id: '3',
    playlistId: '2',
    name: 'Media 3',
    type: MediaTypes.Article,
    content:
      'Tempor orci dapibus ultrices in iaculis nunc sed augue. Lacus luctus accumsan tortor posuere. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Ac tortor dignissim convallis aenean et tortor. Ut sem nulla pharetra diam sit. Morbi enim nunc faucibus a pellentesque sit. Senectus et netus et malesuada fames ac turpis. Sodales neque sodales ut etiam sit amet nisl purus. Id venenatis a condimentum vitae sapien pellentesque. Nisl pretium fusce id velit ut tortor pretium. Egestas congue quisque egestas diam. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Sed enim ut sem viverra aliquet eget sit amet tellus. Integer malesuada nunc vel risus commodo viverra maecenas accumsan.',
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
