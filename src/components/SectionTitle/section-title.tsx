import React from 'react'
import './section-title.scss'

interface Props{
    name:string
}

class SectionTitle extends React.Component<Props>{
    render():JSX.Element{
        return (
            <h3 className="section-title">
                <span className="txt">{this.props.name}</span>
            </h3>
        )
    }
}
export default SectionTitle