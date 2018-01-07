import React from "react";
import * as actions from "../Actions";
import { connect } from "react-redux";

const Map = ({ state }) => {
  console.log(state)
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

const mapStatetoProps = state => ({ state });

const mapDispatchToProps = {
  onPlayer: actions.player
};

const MapContainer = connect(mapStatetoProps, mapDispatchToProps)(Map);

export default MapContainer;
