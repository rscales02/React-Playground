import React from 'react'
require("../Style/Square.scss");

export default class Board extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      life: this.props.life
    }


  }
  render() {
    return (
      <div className="square">
      </div>
    )
  }
}