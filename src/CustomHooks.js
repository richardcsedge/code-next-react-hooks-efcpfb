import React, { useState, useEffect, useCallback } from 'react';

// TODO: Explain the rules of hooks to someone else using your own words.

export const CustomHooks = () => {
  const [color, nextColor] = useColor();

  return (
    <>
      <h2>CustomHooks</h2>
      <div>
        <button className="btn btn-primary" onClick={nextColor}>
          next color
        </button>
      </div>

      <br />

      <div>{color}</div>

      <div
        style={{
          height: 200,
          width: 200,
          backgroundColor: color,
          border: '1px solid black',
        }}
      />
    </>
  );
};

const COLORS = ['red', 'green', 'blue'];

// TODO: Update this custom hook to cycle through the COLORS array. When at the
// end of the array, go back to the first choice.
const useColor = () => {
  // BONUS: Can you make the colors change every second?

  return [];
};
