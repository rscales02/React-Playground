import React from "react";
import classnames from "classnames";

const Square = ({ rowId, cellId, life, onClick }) => {
  return (
    <td
      className={classnames(
        "square",
        { limbo: life == 0 },
        { young: life == 1 },
        { old: life == 2 }
      )}
      onClick={() => onClick(rowId, cellId)}
    ></td>
  );
};

export default Square;
