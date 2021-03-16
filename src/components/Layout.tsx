import {FC} from 'react'
import {Navbar, Modal, Sidebar} from './'
import {ModalProvider} from '../lib/useModal'
import {SidebarProvider} from '../lib/useSidebar'
import {PlaylistFormProvider} from '../lib/usePlaylistForm'
import styled from 'styled-components'

const PageContainer = styled.div`
  min-width: 1024px;
  min-height: calc(100vh - 4rem);
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
      <SidebarProvider>
        <PlaylistFormProvider>
          <Navbar />

          <PageContainer className="px-8 pt-14 flex flex-row justify-center">
            <div className="flex-1 h-full flex flex-row justify-center pt-8">
              {SideComponent && (
                <div className="w-auto lg:w-60 h-auto bg-white fixed rounded-lg shadow-lg">
                  <SideComponent />
                </div>
              )}
            </div>

            <MainContainer className="h-full">{children}</MainContainer>

            <div className="flex-1 h-full">
              <Sidebar />
            </div>
          </PageContainer>

          <Modal />
        </PlaylistFormProvider>
      </SidebarProvider>
    </ModalProvider>
  )
}

export default Layout
