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

// useReducer
const badJobPhotos = [tenor, unlike, ten];
const goodJobPhotos = [giphy, good, wellmade];

const initialState = {
  isRight: null,
  tScore: 0,
  fScore: 0,
  imgSrc: "",
};

function reducer(answer, action) {
  switch (action.type) {
    case "right answer":
      return {
        ...answer,
        isRight: true,
        tScore: answer.tScore + 1,
        imgSrc: goodJobPhotos[action.payLoad.index],
      };
    case "wrong answer":
      return {
        ...answer,
        isRight: false,
        fScore: answer.fScore + 1,
        imgSrc: badJobPhotos[action.payLoad.index],
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
    index >= badJobPhotos.length - 1 && setIndex(0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className=" bottom">
          <FormTable
            num1={qNum.f}
            num2={qNum.s}
            onChange={changeHandler}
            onClick={clickHandler}
            val={val}
          />
          <Encourage result={answer.isRight} src={answer.imgSrc} />
        </div>

        <div className="top">
          <GoodScore good={answer.tScore} />

          <BadScore bad={answer.fScore} />
        </div>
      </header>
    </div>
  );
}

export default App;
