import React from 'react';

import './History.scss';
import { getRGBColor } from '../../utils/color';

const History = ({history, onHistorySelect}) => {
  if (history.length < 1) {
    return <></>
  }
  return (
    <div className="history">
      {
        history.map((color) => {
          return (
            <div
              key={color} className="history-item"
              onClick={() => { onHistorySelect(color) }}
              style={{
              backgroundColor: getRGBColor(color),
            }} />
          )
        })
      }
    </div>
  );
};

export default History;

