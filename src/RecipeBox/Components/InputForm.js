import React from 'react'

export default class InputForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: this.props.value || ""
        }
    }

    willReceiveProps(newProps) {
        if (this.props != newProps) {
            console.log(newProps)
            this.setState({
                defaultValue: this.props.defaultValue
            })
        }
    }

    handleChange(e) {
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
                <input
                    id={this.props.id}
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    defaultValue={this.state.defaultValue}
                />
            </p>
        )
    }
}