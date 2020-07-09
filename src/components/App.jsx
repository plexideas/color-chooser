import React, { useState, useEffect } from 'react'
import { getRandomColor, getColorWeight, getHexColor, getRGBColor } from '../utils/color'

import ToggleType from './ToggleType/ToggleType';
import History from './History/History';

import './App.scss';

const App = () => {
  
  const [color, setColor] = useState(getRandomColor());
  const [history, setHistory] = useState([]);
  const [isRGB, setIsRGB] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const saveToHistory = (newColor) => {
    if (history.includes(newColor)) {
      setHistory([newColor, ...history.filter((el) => el !== newColor)]);
    } else {
      if (history.length === 10) {
        setHistory([newColor, ...history.splice(0, 9)]);
      } else {
        setHistory([newColor, ...history]);
      }
    }
  }

  const onBgClickHandler = (event) => {
    let newColor = getRandomColor();

    while (true) {
      if (history.includes(newColor)) {
        newColor = getRandomColor();
      } else {
        break;
      }
    }

    if (event.currentTarget !== event.target) {
      return;
    }

    setColor(newColor);
    setIsCopied(false);
    saveToHistory(newColor);
  }

  const onBtnClickHandler = (event) => {
    const copyText = document.getElementById("color-code");
    const textArea = document.createElement("textarea");
    textArea.value = copyText.innerHTML;
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, 99999); 
    document.execCommand("copy");
    textArea.remove();
    setIsCopied(true);
  }

  const onToggleHanlder = () => {
    setIsCopied(false); 
    setIsRGB(!isRGB);
  }

  const onHistorySelectHandler = (historyColor) => {
    setColor(historyColor);
    saveToHistory(historyColor);
  }

  useEffect(() => {
    saveToHistory(color);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.body.style = {
      backgroundColor: getRGBColor(color),
    }
    console.log(color);
    document.bgColor = getHexColor(color);
  })

  return (
    <div 
      className="color-chooser--bg" 
      style={{backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`}}
      onClick={onBgClickHandler}
    >
      <button
        id="colorChooserBtn"
        className="color-chooser--button" 
        onClick={onBtnClickHandler}
      >
        <div id="color-code">{ isRGB ? getRGBColor(color) : getHexColor(color) }</div>
        <p className="color-chooser--copy">{ isCopied ? 'Copied!' : 'Click to copy!' }</p>
      </button>
      <div className={`color-chooser--copy ${getColorWeight(color) < 300 ? 'invert' : ''}`}>
      </div>
      <ToggleType onClick={onToggleHanlder} />
      <History onHistorySelect={onHistorySelectHandler} history={history}/>
    </div>
  )
}

export default App

