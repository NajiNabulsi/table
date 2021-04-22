import React, { useEffect, useState, useReducer } from "react";
import "./App.css";
import FormTable from "./component/TableForm";
import GoodScore from "./component/GoodScore";
import BadScore from "./component/BadScore";
import Encourage from "./component/Encourage";
import good from "./good.jpg";
import unlike from "./unlike.png";
import tenor from "./tenor.gif";
import ten from "./ten.gif";
import giphy from "./giphy.gif";
import wellmade from "./wellmade.gif";
import mickey from "./mickey.gif";
import mike from "./mike.gif";
import nine from "./9.gif";
import ci from "./CIl2.gif";
import dis from "./dis.gif";
import scoop from "./scoop.gif";

// useReducer
const badJobPhotos = [tenor, unlike, ten, ci, dis, scoop];
const goodJobPhotos = [giphy, good, wellmade, mickey, mike, nine];

const initialState = {
  showImg: false,
  tScore: 0,
  fScore: 0,
  imgSrc: "",
};

function reducer(answer, action) {
  switch (action.type) {
    case "right answer":
      return {
        ...answer,
        showImg: true,
        tScore: answer.tScore + 1,
        imgSrc: goodJobPhotos[action.payLoad.index],
      };
    case "wrong answer":
      return {
        ...answer,
        showImg: true,
        fScore: answer.fScore + 1,
        imgSrc: badJobPhotos[action.payLoad.index],
      };
    case "hide img":
      return {
        ...answer,
        showImg: false,
      };
  }
}
// end useReducer

function App() {
  const [answer, dispatch] = useReducer(reducer, initialState);
  const [val, setVal] = useState("");
  const [qNum, setQNum] = useState({ f: 0, s: 0 });

  const [index, setIndex] = useState(0);

  const rand = () => {
    setQNum({
      f: Math.floor(Math.random() * 10) + 1,
      s: Math.floor(Math.random() * 10) + 1,
    });
  };

  useEffect(() => {
    rand(10);
  }, []);

  useEffect(() => {
    if (answer.showImg === true) {
      setTimeout(() => dispatch({ type: "hide img" }), 3000);
    }
  }, [answer.showImg]);

  const changeHandler = (e) => {
    setVal(e.target.value);
  };

  const clickHandler = (e) => {
    e.preventDefault();

    if (qNum.f * qNum.s === parseInt(val)) {
      rand();

      dispatch({ type: "right answer", payLoad: { index: index } });
      setIndex(index + 1);
    } else {
      dispatch({ type: "wrong answer", payLoad: { index: index } });

      setIndex(index + 1);
    }
    setVal("");
    index >= goodJobPhotos.length - 1 && setIndex(0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="top">
          <GoodScore good={answer.tScore} />

          <BadScore bad={answer.fScore} />
        </div>
        <div className="section">
          <div
            className="circle one"
            style={{ backgroundColor: answer.backgroundColor }}
          ></div>
          <div
            className="circle  two"
            style={{ backgroundColor: answer.backgroundColor }}
          ></div>
          <div
            className="circle three"
            style={{ backgroundColor: answer.backgroundColor }}
          ></div>

          <div className=" bottom">
            {answer.showImg === false ? (
              <FormTable
                num1={qNum.f}
                num2={qNum.s}
                onfocus={() => dispatch({ type: "defult color" })}
                onChange={changeHandler}
                onClick={clickHandler}
                val={val}
              />
            ) : (
              <Encourage src={answer.imgSrc} />
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
