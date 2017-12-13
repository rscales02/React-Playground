import React from 'react'

export default class TextArea extends React.Component {
    constructor(props) {
        super(props)

        this.textChange = this.textChange.bind(this)

        this.state = {
            text: this.props.text || []
        }
    }

    textChange(e) {
        let input = e.target.value

        this.setState({
            value: input
        })

        this.props.onChange(this.props.id, input)
    }

    render() {
        return (
            <p>
                <label>{this.props.label}</label>
                <textarea id={this.props.id}
                    value={this.state.value}
                    onChange={this.textChange} />
            </p>
        )
    }
}