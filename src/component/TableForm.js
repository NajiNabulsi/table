import React from "react";
import "./table-form.css";

function TableForm({ num1, num2, onChange, onClick, val }) {
  return (
    <div className="table-form">
      <div className="section_question ">
        <div>{num1}</div>
        <div>X</div>
        <div>{num2}</div>
      </div>
      <div className="section_answer ">
        <input type="text" onChange={onChange} autoFocus value={val} />
        <button onClick={onClick}>answer</button>
      </div>
    </div>
  );
}

export default TableForm;
