import React from 'react'
import Board from './Board'
require("../Style/Life.scss");

export default class Life extends React.Component {
  render() {
    return (
      <div className="life">
        <Board numRows={30} numCols={50} />
      </div>
    )
  }
}