import {FC} from 'react'
import ContentLoader from 'react-content-loader'

const PlaylistsSideLoading: FC = () => {
    return(
        <div className="px-4 py-6">
            <input
                type="text"
                className="w-full py-1 pl-2 rounded border border-gray-300 focus:outline-none"
                placeholder="Search"
            />
            <ContentLoader height={165}>
                <rect x="13" y="35" rx="5" ry="5" width="35" height="18" />
                <rect x="13" y="67" rx="5" ry="5" width="75" height="25" />
                <rect x="13" y="119" rx="5" ry="5" width="50" height="18" />
                <rect x="13" y="143" rx="5" ry="5" width="20" height="15" />
                <rect x="38" y="143" rx="5" ry="5" width="20" height="15" />
                <rect x="63" y="143" rx="5" ry="5" width="20" height="15" />
            </ContentLoader>
        </div>
    )
}

export default PlaylistsSideLoading