import React from 'react'

import './bottom.scss'

class Bottom extends React.Component<object,object>{
    render():JSX.Element{
        return (
            <div className="song-detail-bottom">
                <div className="btn btn-open">打 开</div>
                <div className="btn btn-dld">下 载</div>
            </div>
        )
    }
}

export default Bottom