import {FC} from 'react'
import useSidebar from '../lib/useSidebar'

const Sidebar: FC = () => {
  const {state} = useSidebar()
  const {show, Content} = state

  console.log(state)
  return show && (
    <div className="fixed w-72 h-screen bg-white shadow">
        <Content />
    </div>
  )
}

export default Sidebar