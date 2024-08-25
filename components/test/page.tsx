import React, { useState } from "react";

const childComponent = (props: any) => {
  // const [count, setCount] = useState(0);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <button onClick={props.handleIncrement}>{props.count}</button>
    </div>
  );
};

export default childComponent;
