import React from 'react'
import Square from './Square'

export default class Board extends React.Component {
  constructor(props) {
    super(props)
  }

  renderSquares(num) {
    let array = [...Array(num).keys()]
    console.log(array)
    array.map((item, index) => {
      return <Square id={index} />
    })
  }

  render() {
    console.log(this.array)
    return (
      <div className="board">

        {this.renderSquares(this.props.numSquares)}
      </div>
    )
  }
}