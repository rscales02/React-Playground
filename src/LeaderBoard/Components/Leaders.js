import React from 'react';

require("../Style/Leaders.scss")

class Leaders extends React.Component{
    
    
    render() {
        return (
            <tr>
                <td>{this.props.id}</td>
                <td><div className="inline img"><img src={this.props.avatar} /></div><div className="inline name">{this.props.userName}</div></td>
                <td>{this.props.recent}</td>
                <td>{this.props.allTime}</td>
            </tr>
        )
    }
}
export default Leaders;