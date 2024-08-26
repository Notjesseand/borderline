"use client";
import React, { useState } from "react";

const childComponent = (props: any) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <button
        onClick={props.handleIncrement}
        className="px-6 py-2 rounded bg-slate-200"
      >
        {props.count}
      </button>
    </div>
  );
};

export default childComponent;
