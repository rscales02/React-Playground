import React from 'react'
import Button from '../../Universal-Components/Components/Button'

export default class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.pause = this.pause.bind(this)
    this.start = this.start.bind(this)

    this.state = {
      generation: 0,
      isRunning: true
    }
  }

  componentDidMount() {
    this.interval = setTimeout(() => this.tick(), 10)
  }

  componentWillUnmount() {
    clearTimeout(this.interval)
  }

  pause() {
    clearTimeout(this.interval)
    this.setState({ isRunning: false })
  }

  start() {
    if (!this.state.isRunning) {
      this.interval = setTimeout(() => this.tick(), 10)
      this.setState({ isRunning: true })
    }
  }

  tick() {
    this.componentDidMount()
    this.setState({ generation: this.state.generation + 1 })
    this.props.onTick(this.state.generation)
  }

  render() {
    return (
      <div className="timer">
        Generations: {this.state.generation}
        <Button id="Start" onClick={this.start} />
        <Button id="Pause" onClick={this.pause} />
        {this.props.children}
      </div>
    )
  }
}