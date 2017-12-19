import React from 'react'
import Board from './Board'
require("../Style/Life.scss");

export default class Life extends React.Component {
  render() {
    return (
      <div className="life">
        {/* score counter */}
        <div>

        </div>
        {/* Board */}
        <div>
          <Board numSquares={100} />
        </div>
      </div>
    )
  }
}