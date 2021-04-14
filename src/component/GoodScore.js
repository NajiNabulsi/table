import React from "react";
import "./score.css";

function GoodScore({ good, cont }) {
  return (
    <>
      {/* <div>{cont}</div> */}
      <div className="good">
        <p>Total good is : {good}</p>
      </div>
    </>
  );
}

export default GoodScore;
