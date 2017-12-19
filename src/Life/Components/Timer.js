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
    this.interval = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  pause() {
    clearInterval(this.interval)
    this.setState({ isRunning: false })
  }

  start() {
    if (!this.state.isRunning) {
      this.interval = setInterval(() => this.tick(), 1000)
      this.setState({ isRunning: true })
    }
  }

  tick() {
    this.setState({ generation: this.state.generation + 1 })
    this.props.onTick(this.state.generation)
  }

  render() {
    return (
      <div className="timer">
        Generations: {this.state.generation}
        <Button id="Start" onClick={this.start} />
        <Button id="Pause" onClick={this.pause} />
      </div>
    )
  }
}