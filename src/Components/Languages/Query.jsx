import React, { useState, useEffect } from 'react';

const Query = (props) => {
  const { languages, active, opensource } = props;
  let langs = [];
  for (let key in languages) {
    if (languages[key]) {
      langs.push(key)
    }
  }
  let comma = false;
  langs.length > 1 ? comma = true : null

  if (comma) {
    langs = langs.join(', ')
    let last = langs.length - 1;
    while (langs[last] !== ',') {
      last--;
    }
    let firstLangs = langs.substring(0, last)
    let lastLang = langs.substring(last + 2);
    langs = firstLangs + ' and ' + lastLang
  } else {
    langs = langs.join('')
  }

  let str = langs.length > 0 ? `You are searching for projects written in ${langs}` : null
  if (active) {
    str += ' updated in the last year'
  }
  if (opensource) {
    str += ` and specifically marked 'open-source'`
  }

  return (
    <div className="query">
      {
        str
      }
    </div>
  )
}

export default Query;