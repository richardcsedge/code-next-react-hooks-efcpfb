import React, { useState, useEffect } from 'react';

const MIN_CHARS = 3;
const MAX_CHARS = 16;

export const SideEffects = () => {
  const [username, setUsername] = useState('');

  const onChange = (e) => {
    setUsername(e.target.value);
  };

  // TODO: Create a side effect that updates statusEmoji based on the
  // username's length with respect to MIN_CHARS and MAX_CHARS.
  let statusEmoji = '';

  return (
    <>
      <h2>SideEffects</h2>

      <label for="username">username</label>
      <div>
        <input
          id="username"
          class="form-control"
          onChange={onChange}
          value={username}
        />
        <span>{statusEmoji}</span>
      </div>

      {/* TODO: Show how many characters the username has. */}
      <small>char count:</small>
    </>
  );
};