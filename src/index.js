import React from "react";
import { render } from "react-dom";
import WorldMap from "./worldmap";
import "./style.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>D3 charts in React 16.3 </h1>
        <WorldMap />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
