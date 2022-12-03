import React, { useEffect, useRef, useState } from "react";
import TextInput from "./Components/TextInput";
import "./sass/profile.scss";
import "./App.css";

function App() {
  const [invalidTitle, setInvalidTitle] = useState("");
  const [data, setData] = useState("");

  let title: React.MutableRefObject<any> = useRef(null);
  let author: React.MutableRefObject<any> = useRef(null);
  let wordCount: React.MutableRefObject<any> = useRef(null);
  let writingPrompt: React.MutableRefObject<any> = useRef(null);
  const [shown, setShown] = useState(false);

  function handleClick(): void {
    setShown(true);
    setInvalidTitle(title.current.getValue());
    fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author: author.current.getValue(),
        title: title.current.getValue(),
        wordCount: wordCount.current.getValue(),
        writingPrompt: writingPrompt.current.getValue(),
      }),
    })
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }

  return (
    <>
      <form className="profile-form">
        <TextInput
          className="normal-input"
          ref={title}
          label="Title"
        ></TextInput>
        <TextInput
          className="normal-input"
          ref={author}
          label="Author"
        ></TextInput>
        <TextInput
          className="normal-input"
          ref={wordCount}
          label="Word Count"
        ></TextInput>
        <TextInput
          className="normal-input"
          ref={writingPrompt}
          label="Writing Prompt"
        ></TextInput>
        <span onClick={handleClick} style={{ backgroundColor: "green" }}>
          Button
        </span>
      </form>
      {shown ? (
        <div className="output-box">
          Sorry, I'm just an AI writer, I don't know about {invalidTitle}
        </div>
      ) : (
        ""
      )}
      <p>{!data ? "Loading..." : data}</p>
    </>
  );
}

export default App;
