import { useEffect, useState } from "react";

export function RecordKeeper() {
  useEffect(() => {
    document.addEventListener("keydown", hadlefun);
    function hadlefun(event) {
      if (event.key === "Enter") {
        Addval();
      }
    }
    return () => document.removeEventListener("keydown", hadlefun);
  });
  const [val, setVal] = useState([
    { name: "javeria", email: "javah@gmail.com" },
  ]);
  const [v, sv] = useState("");
  const [V, SV] = useState("");
  let myf = (event) => {
    sv(event.target.value);
  };
  let myf1 = (event) => {
    SV(event.target.value);
  };
  let Addval = () => {
    if (V.trim() !== "") {
      if (v.trim() !== "") {
        setVal([...val, { name: v, email: V }]);
        sv("");
        SV("");
      }
    }
  };
  function rmv(ind) {
    setVal(val.filter((v, i) => i !== ind));
  }
  return (
    <div id="wo">
      <div id="wd">
        <div id="p">
          <h1>Record Keeper App</h1>
        </div>
        <input type="text" value={v} placeholder="name" onChange={myf}></input>
        <input
          type="text"
          value={V}
          placeholder="email"
          onChange={myf1}
        ></input>
        <button onClick={Addval}>Add</button>
        <br />
        <div id="jojop">
          <h3>Name</h3>
          <h3>Email</h3>
          <h3>Remove</h3>
        </div>
        {val.map((v, i) => (
          <div id="jojop" key={i}>
            <h3>{v.name}</h3>
            <h3>{v.email}</h3>
            <h3>
              <button id="hh" onClick={() => rmv(i)}>
                Remove
              </button>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
