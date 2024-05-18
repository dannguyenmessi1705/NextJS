"use client";
import { useState } from "react";

function Counter({ data }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>There are {data.length} users</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {/* Khi click vào button này, count sẽ tăng lên 1, chỉ click được khi đã fetch data */}
      <p>{count}</p>
    </div>
  );
}

export default Counter;
