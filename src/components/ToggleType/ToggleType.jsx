import React, { useState, useRef, useEffect } from 'react';
import { TweenMax, Power4 } from 'gsap';

import './ToggleType.scss';

const ToggleType = ({ onClick }) => {
  const [toggle, setToggle] = useState(true);

  const onClickHandler = () => {
    onClick();
    setToggle(!toggle)
  }

  let toggleRef = useRef(null)
  let togglerRef = useRef(null)
  let rgbRef = useRef(null)
  let hashRef = useRef(null)

  useEffect(() => {
    if (toggle) {
      TweenMax.to(toggleRef, {
        backgroundColor: '#f2f2f2'
      })
      TweenMax.to(hashRef, {
        visibility: 'hidden'
      })
      TweenMax.to(rgbRef, {
        visibility: 'visible'
      })
      TweenMax.fromTo(togglerRef, {
        background: '#f2f2f2',
        x: 43,
        ease: Power4.easeOut,
      },{
        background: '#323232',
        x: 0,
        ease: Power4.easeOut,
      })
    } else {
      TweenMax.to(toggleRef, {
        backgroundColor: '#323232'
      })
      TweenMax.to(hashRef, {
        visibility: 'visible',
        color: '#f2f2f2'
      })
      TweenMax.to(rgbRef, {
        visibility: 'hidden'
      })
      TweenMax.fromTo(togglerRef, {
        backgroundColor: '#323232',
        x: 0,
        ease: Power4.easeOut,
      },{
        backgroundColor: '#f2f2f2',
        x: 43,
        ease: Power4.easeOut,
      })
    }
  }, [toggle])

  return (
    <div className="toggle" onClick={onClickHandler} ref={(el) => {toggleRef = el}}>
      <div ref={(el) => {hashRef = el}}>HEX</div>
      <div className="toggler" ref={(el) => {togglerRef = el}} />
      <div ref={(el) => {rgbRef = el}}>RGB</div>
    </div>
  );
};

export default ToggleType;

