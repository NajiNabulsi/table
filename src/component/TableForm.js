import React from "react";
import "./table-form.css";

function TableForm({ num1, num2, onChange, onClick, val }) {
  return (
    <div className="table-form">
      <div>{num1}</div>
      <div>X</div>
      <div>{num2}</div>
      <input type="text" onChange={onChange} autoFocus value={val} />
      <button onClick={onClick}>answer</button>
    </div>
  );
}

export default TableForm;
