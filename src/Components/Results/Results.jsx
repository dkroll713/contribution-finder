import React, { useState, useEffect } from 'react';

import Result from './Result.jsx'

import './_results.scss'

const Results = (props) => {
  const { results, topics, setTopics } = props;

  return (
    <div className="results">
      {
        results.items.length > 0
          ?
          results.items.map((result, x) => {
            return (
              <Result
                result={result}
                topics={topics}
                setTopics={setTopics}
              />
            )
          })
          :
          <div className="empty">
            This search did not return any results
          </div>
      }
    </div>
  )
}

export default Results;