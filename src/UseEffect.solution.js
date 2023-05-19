import React, { useState, useEffect } from 'react';

// TODO: Without changing anything, what does this component do?
// It shows and hides text when clicking the Show/Hide button.
export const UseEffect = () => {
  const [isSecondsAgoVisible, setIsSecondsAgoVisible] = useState(false);

  const onButtonClick = () => {
    setIsSecondsAgoVisible((isSecondsAgoVisible) => !isSecondsAgoVisible);
  };

  // TODO: Create state and an effect to show how many seconds ago the 
  // "shown seconds ago" has been visible. Does it behave correctly when
  // you show the text, wait a few seconds, then show it again?
  const [secondsAgo, setSecondsAgo] = useState(0);
  useEffect(() => {
    // I like the return early if the conditions aren't met because it's
    // easier to read compared to indented code.
    if (!isSecondsAgoVisible) {
      return;
    }
    const startMs = Date.now();
    const handle = setInterval(() => {
      const endMs = Date.now();
      const ms = endMs - startMs;
      const sec = Math.round(ms / 1000);
      setSecondsAgo(sec);
    }, 1000);
    return () => {
      clearInterval(handle);
      setSecondsAgo(0);
    };
  }, [isSecondsAgoVisible]);

  return (
    <>
      <h2>UseEffect</h2>

      <div>
        <button className="btn btn-primary" onClick={onButtonClick}>
          {isSecondsAgoVisible ? 'Hide' : 'Show'}
        </button>
      </div>

      {/* TODO: Show how many seconds ago the text was shown. */}
      {isSecondsAgoVisible && <div>shown seconds ago: {secondsAgo}</div>}
    </>
  );
};
