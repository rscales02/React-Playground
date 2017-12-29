import React from 'react'
import classnames from 'classnames'
require("../Style/Square.scss");

export default class Board extends React.Component {
  constructor(props) {
    super(props)
    this.checkNeighbors = this.checkNeighbors.bind(this)
  }

  checkNeighbors() {
    let id = this.props.id
    this.props.onClick(id)
  }

  render() {
    let state = this.props.life
    return (
      <div className={classnames(
        "square", { limbo: state == 0 }, { young: state == 1 }, { old: state == 2 })}
        onClick={this.checkNeighbors}
      >
      </div>
    )
  }
}