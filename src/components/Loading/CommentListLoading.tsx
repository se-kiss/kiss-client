import {FC} from 'react'
import ContentLoader from 'react-content-loader'

const CommentListLoading: FC = () => {
  const attribute = {
    circle: {
      cx: 20,
      cy: 20,
      r: 16,
    },
    rect: {
      x: 60,
      y: 10,
      rx: 5,
      ry: 5,
      width: 160,
      height: 20,
    },
  }

  const items = new Array(3).fill(null).map((value, index) => (
    <>
      <circle {...{...attribute.circle, cy: attribute.circle.cy + (index * 70)}} />
      <rect {...{...attribute.rect, y: attribute.rect.y + (index * 70)}} />
    </>
  ))
  return (
    <ContentLoader className="h-4/5 mt-2">
      {items}
    </ContentLoader>
  )
}

export default CommentListLoading
