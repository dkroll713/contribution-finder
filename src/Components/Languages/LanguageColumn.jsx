import React from 'react';

import Language from './Language.jsx'

const LanguageColumn = (props) => {
  const { languages, validLanguage, setValidLanguage } = props;
  return (
    <div className="column">
      {
        languages.map((language, x) => {
          return (
            <Language
              language={language.key}
              lines={language.lines}
              validLanguage={validLanguage}
              setValidLanguage={setValidLanguage}
            />
          )
        })
      }
    </div>
  )
}

export default LanguageColumn;

// return (
//   <Language
//   language={language.key}
//   lines={language.lines}
// />
// )