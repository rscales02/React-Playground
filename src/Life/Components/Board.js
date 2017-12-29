import React from 'react'
import Square from './Square'
import Timer from './Timer'
import Button from '../../Universal-Components/Components/Button'

require('../Style/Board.scss')

export default class Board extends React.Component {
  constructor(props) {
    super(props)
    this.onTimerTick = this.onTimerTick.bind(this)
    this.onSquareClick = this.onSquareClick.bind(this)
    this.reset = this.reset.bind(this)

    let squares = []
    for (let index = 0; index < this.props.numSquares; index++) {
      squares.push({ value: Math.floor(Math.random() * 100) % 2 })
    }

    this.state = {
      generation: null,
      squares
    }
  }

  checkNeighbors() {
    let squares = this.state.squares
    const width = Math.sqrt(squares.length)


    //Any live cell with fewer than two live neighbours dies, as if caused by underpopulation
    for (let index = 0; index < squares.length; index++) {
      const element = squares[index];
      const topLeft = index - width - 1 < 0 ? index - width - 1 + squares.length : index - width - 1
      const top = index - width < 0 ? index - width + squares.length : index - width
      const topRight = index - width + 1 < 0 ? index - width + 1 + squares.length : index - width + 1
      const left = index - 1 < 0 ? index - 1 + squares.length : index - 1
      const right = index + 1 > squares.length - 1 ? index + 1 - squares.length : index + 1
      const bottomLeft = index + width - 1 > squares.length - 1 ? index + width - 1 - squares.length : index + width - 1
      const bottom = index + width > squares.length - 1 ? index + width - squares.length : index + width
      const bottomRight = index + width + 1 > squares.length - 1 ? index + width + 1 - squares.length : index + width + 1
      const neighbors = [squares[topLeft], squares[top], squares[topRight], squares[left], squares[right], squares[bottomLeft], squares[bottom], squares[bottomRight]]
      let score = 0
      neighbors.map((item, index) => {
        if (item.value !== 0) {
          score++
        }
      })

      if (element.value != 0) {
        if (score < 2) {
          element.value = 0
        }
        //Any live cell with two or three live neighbours lives on to the next generation
        else if (score === 2 || score === 3) {
          if (element.value == 1 || element.value == 2) {
            element.value = 2
          }
        }
        //Any live cell with more than three live neighbours dies, as if by overpopulation.
        else {
          element.value = 0
        }
      }
      //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
      else {
        if (score === 3) {
          element.value = 1
        }
      }
    }
    this.setState({ squares })
  }

  onSquareClick(id) {
    this.setState((prevState) => {
      let squares = prevState.squares
      if (prevState.squares[id].value !== 0) {
        squares[id].value = 0
        return { squares }
      } else {
        squares[id].value = 1
        return { squares }
      }
    })
  }

  onTimerTick(gen) {
    this.checkNeighbors()
  }

  reset() {
    this.setState((prevState) => {
      let squares = prevState.squares
      squares = squares.map((item, index) => {
        return item.value = 0
      })
      return squares
    })
  }

  render() {
    return (
      <div>
        <Timer onTick={this.onTimerTick} >
          <Button id="Reset" onClick={this.reset} />
        </Timer>
        <div className="board">
          {this.state.squares.map((item, index) => {
            return <Square id={index} life={item.value} key={index} onClick={this.onSquareClick} />
          })}
        </div>
      </div>
    )
  }
}