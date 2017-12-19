import React from 'react'
import Square from './Square'
import Timer from './Timer'

require('../Style/Board.scss')

export default class Board extends React.Component {
  constructor(props) {
    super(props)
    this.onTimerTick = this.onTimerTick.bind(this)

    this.state = {
      generation: null
    }
  }

  onTimerTick(gen) {
    this.setState({
      generation: gen
    })
  }

  

  render() {
    return (
      <div>
        <Timer onTick={this.onTimerTick} />
        <div className="board">
          {[...Array(this.props.numSquares).keys()].map((item, index) => {
            return <Square key={index} />
          })}
        </div>
      </div>
    )
  }
}