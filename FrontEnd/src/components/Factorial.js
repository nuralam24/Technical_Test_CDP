import React, { useState } from "react";

export default function Factorial() {
  const [data, setData] = useState({ num: 0, res: "" });

  function handleChange(event) {
    setData({ num: event.target.value });
  }
    
  function fac(num) {
    if (num == 0 || num == "") {
      return 1;
    }
    return num * fac(num - 1);
  }

  function resultHandler(e, num) {
    e.preventDefault();
    setData({ res: fac(num), num: "" })
  }

  return (
    <div>
      <h1>Factorial Calculator</h1>
      <form>
        <input
          type="number"
          placeholder="Enter a number..."
          onChange={handleChange}
          value={data.num}
        />
        <br />
        <button onClick={(e) => resultHandler(e, data.num)}>
          Calculate Factorial
        </button>
      </form>
      <h2>Factorial: {data.res}</h2>
    </div>
  );
}