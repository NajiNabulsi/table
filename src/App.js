import React, { useEffect, useState, useReducer } from "react";
import "./App.css";
import FormTable from "./component/TableForm";
import GoodScore from "./component/GoodScore";
import BadScore from "./component/BadScore";
import Encourage from "./component/Encourage";

import useSound from "use-sound";
import boopSfx from "./sounds/applause3.wav";
import boo from "./sounds/boo2.wav";

import { badJobPhotos, goodJobPhotos } from "./images/imges";

// useReducer
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

  const [playGood] = useSound(boopSfx, { volume: 0.5 });
  const [playBad] = useSound(boo, { volume: 1 });

  const rand = () => {
    setQNum({
      f: Math.floor(Math.random() * 10) + 1,
      s: Math.floor(Math.random() * 10) + 1,
    });
  };

  // const BoopButton = () => {
  //   const [play] = useSound(boopSfx);

  //   return <button onClick={play}>Boop!</button>;
  // };

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
      playGood();
      dispatch({ type: "right answer", payLoad: { index: index } });
      setIndex(index + 1);
    } else {
      dispatch({ type: "wrong answer", payLoad: { index: index } });
      playBad();
      setIndex(index + 1);
    }
    setVal("");
    index >= goodJobPhotos.length - 1 && setIndex(0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="top">
          {/* audio */}

          {/* audio */}

          <GoodScore good={answer.tScore} />

          <BadScore bad={answer.fScore} />
        </div>

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
        <div className="copyRight">
          <p>Van Naji tot mijn geliefde zoon Zaid AL Nabulsi</p>
        </div>
      </header>
    </div>
  );
}

export default App;
