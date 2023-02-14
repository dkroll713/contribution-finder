import React, { useState, useEffect } from 'react';

const axios = require('axios');

const Result = (props) => {
  const { result, topics, setTopics } = props;
  const [displayTopics, setDisplayTopics] = useState([])

  useEffect(() => {
    if (result) {
      // let url = `https://api.github.com/repos/${result.owner.login}/${result.name}`
      // axios.post('/topics/', {
      //   url: url
      // })
      //   .then((res) => {
      //     setDisplayTopics(res.data.topics)
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   })
      setDisplayTopics(result.topics)
    }
  }, [])

  const handleTopic = (e) => {
    console.log(e.target.id)
    let topic = e.target.id;
    let newTopics = JSON.parse(JSON.stringify(topics));
    let button = document.getElementById('search');
    if (!newTopics[topic]) {
      newTopics[topic] = true;
    } else if (newTopics[topic]) {
      newTopics[topic] = false;
    }
    setTopics(newTopics)
    button.disabled = false
  }

  return (
    <div className="result">
      <div className="topHalf">
        <h3 className="cardTitle">{result.name}</h3>
        <a href={result.html_url + '/contribute'}>Link to the repo</a>
        <p className="cardDesc">{result.description}</p>
      </div>
      <div className="bottomHalf">
        {
          displayTopics.length > 0
            ?
            <div className="topics">
              {
                displayTopics.map(topic => {
                  return <span onClick={handleTopic} id={topic} name={topic} className="topic">{topic}</span>
                })
              }
            </div>
            :
            null
        }
      </div>
    </div>
  )
}

export default Result;