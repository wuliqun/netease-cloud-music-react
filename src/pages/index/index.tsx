import React from 'react'
import SiteHeader from 'components/SiteHeader'
import IndexTab from 'components/IndexTab'

class IndexCommon extends React.Component<object,object>{
    render():JSX.Element{
        return (
            <div>
                <SiteHeader />
                <IndexTab />
                { this.props.children }
            </div>
        )
    }
}

export default IndexCommon