import React, { useState, useEffect } from 'react';

const axios = require('axios');

import LanguageToggle from '../Components/Languages/LanguageToggle.jsx'
import Results from '../Components/Results/Results.jsx'

import './_home.scss'

const Home = () => {
  const [username, setUsername] = useState(null)
  const [repos, setRepos] = useState([])
  const [loadedRepos, setLoadedRepos] = useState(false);
  const [languages, setLanguages] = useState([])
  const [loadedLanguages, setLoadedLanguages] = useState(false)
  const [validLanguage, setValidLanguage] = useState([])
  const [topics, setTopics] = useState({})
  const [results, setResults] = useState(null)

  const handleInput = (e) => {
    setUsername(e.target.value)
  }

  const handleSubmit = () => {
    axios.get('/repos/',
      {
        params: {
          username: username
        }
      }
    )
      .then((res) => {
        let arr = [];
        res.data.map(repo => {
          if (repo.owner.login === username) {
            arr.push(repo.name)
          }
        })
        setRepos(arr)
        setLoadedRepos(true);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (loadedRepos) {
      console.log('getting languages')
      axios.post('/languages/',
        {
          username: username,
          repos: repos
        }
      )
        .then((res) => {
          console.log(res)
          let langs = res.data;
          let top = [];
          let obj = {};
          for (let key in langs) {
            top.push({
              key: key,
              lines: langs[key]
            })
            obj[key] = false;
          }
          top = top.sort((a, b) => b.lines - a.lines)
          setLanguages(top)
          setValidLanguage(obj)
          setLoadedLanguages(true)
        })
        .catch((err) => {
          console.log(err)
        })
    }

  }, [loadedRepos])

  return (
    <div className="home">
      <div className="header">
        <h3 className="siteTitle">Easily find contributions to make</h3>
      </div>
      <div>
        {
          loadedRepos
            ?
            null
            :
            <div className="searchBar">
              <input className="" onChange={handleInput} placeholder="GitHub username"></input>
              <button className="submitBtn" onClick={handleSubmit}>Search</button>
            </div>
        }
        {
          loadedLanguages
            ?
            <LanguageToggle
              languages={languages}
              validLanguage={validLanguage}
              setValidLanguage={setValidLanguage}
              topics={topics}
              setTopics={setTopics}
              results={results}
              setResults={setResults}
            />
            :
            null
        }
        {
          results
            ?
            <Results
              results={results}
              validLanguage={validLanguage}
              topics={topics}
              setTopics={setTopics}
            />
            :
            null
        }
      </div>
    </div>
  )
}

export default Home;