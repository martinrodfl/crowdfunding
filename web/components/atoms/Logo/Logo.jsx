import React from 'react';

class Logo extends React.Component {
  render() {
    return (
      <div className="logo">
        <p>{this.props.text}</p>
      </div>
    );
  }
}

export default Logo;
