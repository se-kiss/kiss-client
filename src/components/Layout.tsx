import {FC} from 'react'
import {Navbar, Modal} from './'
import {ModalProvider} from '../lib/ModalContext'
import styled from 'styled-components'

const PageContainer = styled.div`
  min-height: calc(100vh - 3.5rem);
`

const MainContainer = styled.div`
  flex: 3;
`

type LayoutProps = {
  SideComponent?: FC<any>
}

const Layout: FC<LayoutProps> = ({children, SideComponent}) => {
  return (
    <ModalProvider>
      <Navbar />

      <PageContainer className="px-8 pt-14 flex flex-row justify-center">
        <div className="flex-1 h-full flex flex-row justify-center pt-8">
          {SideComponent && (
            <div className="w-auto lg:w-60 h-auto bg-white fixed shadow-lg">
              <SideComponent />
            </div>
          )}
        </div>

        <MainContainer className="h-full">{children}</MainContainer>

        <div className="flex-1 h-full"></div>
      </PageContainer>
          
      <Modal />
    </ModalProvider>
  )
}

export default Layout
