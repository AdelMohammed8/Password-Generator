import { useCallback, useEffect, useRef, useState } from "react";
import "./index.css";

function App() {
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef();
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [isNumberAllowed, length, charAllowed]);
  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select()
    console.log("kk");
  };
  useEffect(() => {
    generatePassword();
  }, [length, isNumberAllowed, charAllowed]);
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          ref={passwordRef}
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
        />
        <button
          onClick={() => copyPasswordToClipboard()}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            onChange={(e) => setLength(e.target.value)}
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            name=""
            id=""
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            onChange={() => {
              setIsNumberAllowed((prev) => !prev);
            }}
            defaultChecked={isNumberAllowed}
          />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
            type="checkbox"
            name=""
            id=""
          />
          <label htmlFor="charInput">Character</label>
        </div>
      </div>
    </div>
  );
}
export default App;
