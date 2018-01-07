import React from "react";
import Square from "./Square";
import Timer from "./Timer";
import Button from "../../Universal-Components/Components/Button";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      generation: 1,
      cells: this.genMap()
    };
  }

  checkBottom = (prevState, row, cell) => {
    let rowBottom = row + 1 == this.props.numRows ? 0 : row + 1;
    let life = prevState.cells[rowBottom].cells[cell].life;
    if (life != 0) {
      return 1;
    } else return 0;
  };

  checkBottomLeft = (prevState, row, cell) => {
    let rowBottom = row + 1 == this.props.numRows ? 0 : row + 1;
    let cellLeft = cell - 1 < 0 ? this.props.numCols - 1 : cell - 1;
    let life = prevState.cells[rowBottom].cells[cellLeft].life;
    if (life != 0) {
      return 1;
    } else return 0;
  };

  checkBottomRight = (prevState, row, cell) => {
    let rowBottom = row + 1 == this.props.numRows ? 0 : row + 1;
    let cellRight = cell + 1 == this.props.numCols ? 0 : cell + 1;
    let life = prevState.cells[rowBottom].cells[cellRight].life;
    if (life != 0) {
      return 1;
    } else return 0;
  };

  checkLeft = (prevState, row, cell) => {
    let cellLeft = cell - 1 < 0 ? this.props.numCols - 1 : cell - 1;
    let life = prevState.cells[row].cells[cellLeft].life;
    if (life != 0) {
      return 1;
    } else return 0;
  };

  checkNeighbors = (prevState, row, cell) => {
    let bottom = this.checkBottom(prevState, row, cell);
    let bottomLeft = this.checkBottomLeft(prevState, row, cell);
    let bottomRight = this.checkBottomRight(prevState, row, cell);
    let left = this.checkLeft(prevState, row, cell);
    let right = this.checkRight(prevState, row, cell);
    let top = this.checkTop(prevState, row, cell);
    let topLeft = this.checkTopLeft(prevState, row, cell);
    let topRight = this.checkTopRight(prevState, row, cell);
    let neighbors = [
      top,
      right,
      left,
      bottom,
      topRight,
      topLeft,
      bottomRight,
      bottomLeft
    ];
    let score = 0;

    for (let i = 0; i < neighbors.length; i++) {
      const el = neighbors[i];
      if (el != 0) {
        score++;
      }
    }
    return score;
  };

  checkRight = (prevState, row, cell) => {
    let cellRight = cell + 1 == this.props.numCols ? 0 : cell + 1;
    let life = prevState.cells[row].cells[cellRight].life;
    if (life != 0) {
      return 1;
    } else return 0;
  };

  checkTop = (prevState, row, cell) => {
    let rowTop = row - 1 < 0 ? this.props.numRows - 1 : row - 1;
    let life = prevState.cells[rowTop].cells[cell].life;
    if (life != 0) {
      return 1;
    } else return 0;
  };
  checkTopLeft = (prevState, row, cell) => {
    let rowTop = row - 1 < 0 ? this.props.numRows - 1 : row - 1;
    let cellLeft = cell - 1 < 0 ? this.props.numCols - 1 : cell - 1;
    let life = prevState.cells[rowTop].cells[cellLeft].life;
    if (life != 0) {
      return 1;
    } else return 0;
  };
  checkTopRight = (prevState, row, cell) => {
    let rowTop = row - 1 < 0 ? this.props.numRows - 1 : row - 1;
    let cellRight = cell + 1 == this.props.numCols ? 0 : cell + 1;
    let life = prevState.cells[rowTop].cells[cellRight].life;
    if (life != 0) {
      return 1;
    } else return 0;
  };

  genMap = () => {
    let boardMap = [];
    for (let i = 0; i < this.props.numRows; i++) {
      let rowId = i;
      let cells = [];
      for (let j = 0; j < this.props.numCols; j++) {
        let cellId = j;
        cells.push({ cellId: cellId, life: Math.floor(Math.random() * 3) });
      }
      boardMap.push({ rowId, cells });
    }
    return boardMap;
  };

  life = () => {
    this.setState(prevState => {
      let stateMap = this.state.cells.map(row => {
        let cellChange = row.cells.map(cell => {
          switch (this.checkNeighbors(prevState, row.rowId, cell.cellId)) {
            case 0:
            case 1:
              //Any live cell with fewer than two live neighbours dies, as if caused by underpopulation
              return { ...cell, life: 0 };
            case 2:
              //Any live cell with two or three live neighbours lives on to the next generation
              if (prevState.cells[row.rowId].cells[cell.cellId].life === 1) {
                return {
                  ...cell,
                  life: 2
                };
              } else {
                return {
                  ...cell,
                  life: prevState.cells[row.rowId].cells[cell.cellId].life
                };
              }
            case 3:
              //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
              if (prevState.cells[row.rowId].cells[cell.cellId].life === 0) {
                return {
                  ...cell,
                  life: 1
                };
              } else if (
                prevState.cells[row.rowId].cells[cell.cellId].life === 1
              ) {
                return {
                  ...cell,
                  life: 2
                };
              } else {
                return {
                  ...cell,
                  life: prevState.cells[row.rowId].cells[cell.cellId].life
                };
              }
            default:
              //Any live cell with more than three live neighbours dies, as if by overpopulation.
              return { ...cell, life: 0 };
          }
          if (cell.life != 0) {
            return (cellChange = { ...cell, life: 0 });
          } else return (cellChange = { ...cell, life: 1 });
        });
        return { ...row, cells: cellChange };
      });

      return { cells: stateMap };
    });
  };

  onClick = (rowNum, cellNum) => {
    let stateMap = this.state.cells.map(row => {
      if (row.rowId === rowNum) {
        let cellChange = row.cells.map(cell => {
          if (cell.cellId === cellNum) {
            if (cell.life != 0) {
              return (cellChange = { ...cell, life: 0 });
            } else return (cellChange = { ...cell, life: 1 });
          } else return { ...cell };
        });
        return { ...row, cells: cellChange };
      } else return { ...row };
    });
    this.setState({
      cells: stateMap
    });
  };

  onTimerTick = gen => {
    this.life();
  };

  reset = () => {
    let stateMap = this.state.cells.map(row => {
      let cellChange = row.cells.map(cell => {
        return (cellChange = { ...cell, life: 0 });
      });
      return { ...row, cells: cellChange };
    });
    this.setState({
      cells: stateMap
    });
  };

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th colSpan={this.props.numCols}>
              <Timer onTick={this.life} />
            </th>
          </tr>
        </thead>
        <tbody className="boardMap">
          {this.state.cells.map(row => {
            return (
              <tr key={row.rowId}>
                {row.cells.map(cell => {
                  return (
                    <Square
                      rowId={row.rowId}
                      cellId={cell.cellId}
                      key={row.rowId + cell.cellId}
                      life={this.state.cells[row.rowId].cells[cell.cellId].life}
                      onClick={this.onClick}
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr >
           <td colSpan={this.props.numCols}> <Button id="Reset" onClick={this.reset} /></td>
          </tr>
        </tfoot>
      </table>
    );
  }
}
