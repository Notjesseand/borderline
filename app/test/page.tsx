import React, { useState } from "react";
import ChildComponent from "@/components/test/page";

const page = () => {
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <ChildComponent handleIncrement={handleIncrement} />
    </div>
  );
};

export default page;
