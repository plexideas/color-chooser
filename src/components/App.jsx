import React, { useState, useEffect } from 'react'
import { getRandomColor, getColorWeight, getHexColor, getRGBColor } from '../utils/color'

import './App.scss';
import ToggleType from './ToggleType/ToggleType';

const App = () => {
  
  const [color, setColor] = useState(getRandomColor());
  const [isRGB, setIsRGB] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const onBgClickHandler = (event) => {
    if (event.currentTarget !== event.target) {
      return;
    }
    setColor(getRandomColor())
    setIsCopied(false);
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
    </div>
  )
}

export default App

