import React from 'react'

require('../Style/Button.scss')

export default class Button extends React.Component {

    render() {
        return <button type="button" onClick={this.props.onClick}>{this.props.id}</button>
    }
}