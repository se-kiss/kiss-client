import styled from 'styled-components'

type TagProps = {
  color?: string
}

const Tag = styled.div<TagProps>`
  border-radius: 0.3rem;
  border: 1px solid ${({color}) => (color ? color : '#D1D5DB')};
  background: ${({color}) => (color ? color : 'white')};
  color: ${({color}) => (!color && '#9CA3AF')};
`

export default Tag
