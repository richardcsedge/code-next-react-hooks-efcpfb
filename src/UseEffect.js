import React, { useState, useEffect } from 'react';

// TODO: Without changing anything, what does this component do?
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
    if (!isSecondsAgoVisible) return;

    const startTime = Date.now();

    const timeInterval = setInterval(() => {
      const currentTime = Date.now();
      setSecondsAgo(Math.round((currentTime - startTime)/1000));
    }, 1000);

    return () => clearInterval(timeInterval);
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
      {isSecondsAgoVisible && <span>{secondsAgo}</span>}
    </>
  );
};