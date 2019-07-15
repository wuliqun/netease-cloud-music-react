import React from 'react'
import './search-input.scss'

interface Props{
    handleInput:(keyword:string)=>void,
    handleSubmit:()=>void,
    handleFocus:()=>void,
    handleClearInput:()=>void,
    value:string
}

class SearchInput extends React.Component<Props,object>{
    render():JSX.Element{
        return (
            <div className="search-input">
                <form action="#" method="get" className="search-form" onSubmit={this.submit.bind(this)}>
                    <div className="form-content">
                        <div className="search-icon"></div>
                        <div className="input-wrap">
                            <input 
                                type="search" 
                                name="input"
                                className="input" 
                                autoComplete="off"
                                value={ this.props.value }
                                onChange={this.handleChange.bind(this)}
                                onFocus={this.props.handleFocus}/>
                        </div>
                        {   
                            !!this.props.value &&
                            <div className="close" onClick={this.props.handleClearInput}>
                                <i className="close-icon"></i>
                            </div>
                        }
                    </div>
                </form>
            </div>
        )
    }
    submit(e:React.FormEvent<HTMLFormElement>):void{
        e.currentTarget.input.blur();
        e.preventDefault();
        this.props.handleSubmit();
    }
    handleChange(e:React.ChangeEvent<HTMLInputElement>):void{
        let value:string = e.target.value;
        this.props.handleInput(value);
    }
}

export default SearchInput