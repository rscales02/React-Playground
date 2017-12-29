import React from 'react'
import Board from './Board'
require("../Style/Life.scss");

export default class Life extends React.Component {
  render() {
    return (
      <div className="life">
        {/* Board */}
        <Board numSquares={2500} />
      </div>
    )
  }
}