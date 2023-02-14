import React, { useState, useEffect } from 'react';

const axios = require('axios');


import Query from './Query.jsx'
import Language from './Language.jsx'
import LanguageColumn from './LanguageColumn.jsx'

import './_language.scss'

const LanguageToggle = (props) => {
  const { languages, validLanguage, setValidLanguage, results, setResults, topics, setTopics } = props;
  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false)

  let button = document.getElementById('search')
  let perCol = languages.length > 5 ? Math.floor(languages.length / 5) : 1;
  let copy = JSON.parse(JSON.stringify(languages))
  let chosenTopics = []
  for (let key in topics) {
    if (topics[key]) chosenTopics.push(key)
  }
  console.log(JSON.stringify(copy))
  // sort copy array
  let sorted = false
  while (!sorted) {
    sorted = true;
    for (let x = 0; x < copy.length; x++) {
      let cur = copy[x];
      let next = copy[x + 1] ? copy[x + 1] : null;
      if (next) {
        let index = 0;
        if (cur.key[0] > next.key[0]) {
          console.log(cur, next, cur.key[0] > next.key[0])
          let tmp = copy[x];
          copy[x] = copy[x + 1]
          copy[x + 1] = tmp;
          sorted = false;
        } else if (cur.key[index] === next.key[index]) {
          console.log(cur, next, cur.key[0] > next.key[0])
          while (cur.key[index] === next.key[index]) {
            console.log(cur.key[index], next.key[index])
            index++;
          }
          if (cur.key[index] > next.key[index] || (cur.key[index] && !next.key[index])) {
            let tmp = copy[x];
            copy[x] = copy[x + 1];
            copy[x + 1] = tmp;
            sorted = false
          }
        }
      }
    }
  }

  // let arr = [];
  // console.log(copy)
  // console.log(perCol)
  // while (copy.length > 0) {
  //   arr.push(copy.splice(0, perCol));
  // }
  // console.log(arr)
  const search = (e) => {
    let langs = [];
    let length = 0;
    for (let key in validLanguage) {
      if (validLanguage[key]) {
        key = key.split(' ').join('+');
        langs.push(key.toLowerCase())
        length += key.length;
      }
    }
    let tops = [];
    for (let key in topics) {
      if (topics[key]) {
        key = key.split(' ').join('');
        tops.push(key)
        length += key.length
      }
    }
    console.log(langs, length)
    let options = {
      languages: langs,
      topics: tops
    }
    console.log(active)
    if (active) {
      options.date = '2023-01-01'
    }
    if (open) {
      options.opensource = true;
    }
    console.log(options)
    axios.post('/search/', options)
      .then((res) => {
        setResults(res.data)
        e.target.disabled = true
      })
  }

  const handleActive = (e) => {
    setActive(e.target.checked)
    button.disabled = false
  }

  let year = new Date;
  year = year.getFullYear()

  const handleOpen = (e) => {
    setOpen(e.target.checked)
    button.disabled = false
  }

  const handleRemove = (e) => {
    let topic = e.target.id;
    let newTopics = JSON.parse(JSON.stringify(topics));
    newTopics[topic] = false;
    setTopics(newTopics)
    button.disabled = false
  }

  const handleRemoveAll = () => {
    setTopics({})
    button.disabled = false
  }

  if (copy.length > 0) {
    return (
      <>
        <div className="languageToggle">
          <div className="instructions">
            <h4 className="instruction">Select which languages you want to search for</h4>
          </div>
          <div className="columns">
            {
              // arr.map((langs, index) => {
              //   return (
              //     <>
              //       <LanguageColumn
              //         validLanguage={validLanguage}
              //         setValidLanguage={setValidLanguage}
              //         languages={langs} />
              //     </>
              //   )
              // })
              copy.map((language, index) => {
                return (
                  <>
                    <Language
                      language={language.key}
                      lines={language.lines}
                      validLanguage={validLanguage}
                      setValidLanguage={setValidLanguage}
                    />
                  </>
                )
              })
            }
          </div>
          <div className="filters">
            <div className="btoggle">
              <span className="toggletitle">Active in {year}?</span><input onClick={handleActive} type="checkbox" />
            </div>
            <div className="btoggle">
              <span className="toggletitle">Specify Open Source?</span><input onClick={handleOpen} type="checkbox" />
            </div>
          </div>
          {
            chosenTopics.length > 0
              ?
              <>
                <div className="instructions">
                  <h4 className="instruction">Selected topics - click one to remove</h4>
                  <button onClick={handleRemoveAll}>Remove All Topics</button>
                </div>
                <div className="topics">
                  <div>
                    {
                      chosenTopics.map((topic) => {
                        return (
                          <span className="topic" id={topic} onClick={handleRemove}>{topic}</span>
                        )
                      })
                    }
                  </div>
                </div>
              </>
              :
              null
          }
          <Query
            languages={validLanguage}
            active={active}
            opensource={open}
          />
          <div className="searchButton">
            <button className="search" onClick={search} id="search">Search</button>
          </div>
        </div>
      </>
    )
  }
}

export default LanguageToggle;