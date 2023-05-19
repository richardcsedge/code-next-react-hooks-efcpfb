import React from "react";
import { UseEffect } from './UseEffect';
import { CustomHooks } from './CustomHooks';
import { SideEffects } from './SideEffects';

export default function App() {
  return (
    <div className="container">
      <h1>code-next-react-hooks</h1>

      <hr />

      <SideEffects />

      <br />

      <UseEffect />

      <br />

      <CustomHooks />
    </div>
  );
}
