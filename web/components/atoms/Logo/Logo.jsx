import React, { Component } from 'react';


class PageTitle extends Component {
    state = {  } 
    render() { 
        return (
            <div  className="logo">
                <p className='text'>{this.props.text}</p>
            </div>
        );
    }
}
 
export default PageTitle;