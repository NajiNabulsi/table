import React from "react";

function Encourage({ result, src }) {
  return (
    <div>
      {result === null ? (
        <p className="encourage">press to start ...</p>
      ) : (
        <img className="img" src={src} alt="result" />
      )}
    </div>
  );
}

export default Encourage;
