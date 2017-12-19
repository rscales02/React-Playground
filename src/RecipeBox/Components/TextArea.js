import React from 'react'

export default class TextArea extends React.Component {
    constructor(props) {
        super(props)

        this.valueChange = this.valueChange.bind(this)

        this.state = {
            value: this.props.value || []
        }
    }

    componentWillReceiveProps(nextProps) {
        let normalizedValue = (nextProps.value || "")
        if (this.state.value != normalizedValue) {
            this.setState({
                value: normalizedValue
            })
        }
    }

    valueChange(e) {
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
                    onChange={this.valueChange} />
            </p>
        )
    }
}