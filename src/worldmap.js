import React, { Component } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import request from "axios";

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto"
};

const cityScale = scaleLinear()
  .domain([0, 37843000])
  .range([1, 25]);

class BasicMap extends Component {
  constructor() {
    super();

    this.state = {
      cities: []
    };
    this.fetchCities = this.fetchCities.bind(this);
  }
  componentDidMount() {
    this.fetchCities();
  }
  fetchCities() {
    request
      .get(
        "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/examples/bubbles-map/static/world-most-populous-cities.json"
      )
      .then(res => {
        this.setState({
          cities: res.data
        });
      });
  }
  render() {
    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{ scale: 205 }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto"
          }}
        >
          <ZoomableGroup center={[0, 20]} disablePanning>
            <Geographies geography="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/examples/bubbles-map/static/world-50m.json">
              {(geographies, projection) =>
                geographies.map(
                  (geography, i) =>
                    geography.id !== "ATA" && (
                      <Geography
                        key={i}
                        geography={geography}
                        projection={projection}
                        style={{
                          default: {
                            fill: "#ECEFF1",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none"
                          },
                          hover: {
                            fill: "#ECEFF1",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none"
                          },
                          pressed: {
                            fill: "#ECEFF1",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none"
                          }
                        }}
                      />
                    )
                )
              }
            </Geographies>
            <Markers>
              {this.state.cities.map((city, i) => (
                <Marker key={i} marker={city}>
                  <circle
                    r={cityScale(city.population)}
                    className="pulse-disk "
                    cx="50"
                    cy="50"
                    fill="rgba(0,200,120,1)"
                  />
                  <circle
                    r={cityScale(city.population) - 4}
                    className={
                      "pulse-circle " +
                      (city.name === "Paris" ? "enablecir" : "disablecir")
                    }
                    cx="50"
                    cy="50"
                    stroke="rgba(0,200,120,1)"
                    stroke-width="2"
                  />
                  <circle
                    r={cityScale(city.population) * 2}
                    className={
                      "pulse-circle-2 " +
                      (city.name === "Paris" ? "enablecir" : "disablecir")
                    }
                    cx="50"
                    cy="50"
                    stroke="rgba(0,200,120,1)"
                    stroke-width="2"
                  />
                </Marker>
              ))}
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    );
  }
}

export default BasicMap;
