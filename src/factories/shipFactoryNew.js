import _ from "lodash";

const shipFactory = (boundary) => {
  let shipDamagePosition = [];

  const setShipInitialStatus = (value) => {
    shipDamagePosition = [];
    return _.times(boundary.length, (i) => {
      shipDamagePosition.push(value);
    });
  };

  setShipInitialStatus(false);

  const isSunk = () => {
    return shipDamagePosition.reduce(
      (cumulative, current) => cumulative && current,
      true
    );
  };

  const hit = (x, y) => {
    const shipCoordinateObj = { x, y };
    let axis = "x";
    let antiAxis = "y";
    const isInsideShipBoundary = () => {
      if (boundary.orientation === "horizontal") {
        axis = "x";
        antiAxis = "y";
      }
      if (boundary.orientation === "vertical") {
        axis = "y";
        antiAxis = "x";
      }
      return (
        shipCoordinateObj[axis] >= 0 &&
        shipCoordinateObj[axis] < boundary.length &&
        shipCoordinateObj[antiAxis] === 0
      );
    };
    const isAttacked = () => {
      const shipPosition = shipCoordinateObj[axis];
      return shipDamagePosition[shipPosition];
    };

    if (isInsideShipBoundary() && !isAttacked()) {
      isSunk();
      return true;
    }
    return false;
  };

  return { shipDamagePosition, hit, boundary, isSunk, setShipInitialStatus };
};

module.exports = { shipFactory };
