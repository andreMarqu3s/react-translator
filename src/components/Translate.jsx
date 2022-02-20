import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";

function Translate() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [languageList, setLanguageList] = useState([]);
  const [selectedlanguageKey, setLanguageKey] = useState("");
  const [detectLanguageKey, setDetectLanguageKey] = useState("");

  const getLanguageSource = () => {
    axios
      .post(`https://libretranslate.de/detect`, {
        q: input,
      })
      .then((response) => {
        setDetectLanguageKey(response.data[0].language);
      });
  };

  const translateText = () => {
    setOutput(input);

    getLanguageSource();

    let data = {
      q: input,
      source: detectLanguageKey,
      target: selectedlanguageKey,
    };

    axios.post(`https://libretranslate.de/translate`, data).then((response) => {
      setOutput(response.data.translatedText);
    });
  };

  const languageKey = (selectedLanguage) => {
    setLanguageKey(selectedLanguage.target.value);
  };

  useEffect(() => {
    axios.get(`https://libretranslate.de/languages`).then((response) => {
      setLanguageList(response.data);
    });

    getLanguageSource();
  }, [input]);

  return (
    <div>
      <div className="app-header">
        <h1 className="header">Translator</h1>
      </div>

      <div className="app-body">
        <div>
          <textarea
            placeholder="Text to translate..."
            rows="5"
            cols="80"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          ></textarea>
        </div>
        <div>
          <select onChange={languageKey}>
            <option disabled selected>
              Select language
            </option>
            {languageList.map((language) => {
              return <option value={language.code}>{language.name}</option>;
            })}
          </select>
        </div>
        <div>
          <textarea value={output} rows="5" cols="80"></textarea>
        </div>
        <div>
          <button onClick={translateText}>Translate</button>
        </div>
      </div>
    </div>
  );
}

export default Translate;
