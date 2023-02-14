import React, { useState, useEffect } from 'react';

const Language = (props) => {
  const { language, lines, validLanguage, setValidLanguage } = props;
  const [checked, setChecked] = useState(false)

  const handleCheck = (e) => {
    setChecked(e.target.checked)
    let validate = JSON.parse(JSON.stringify(validLanguage))
    !validate[language] ? validate[language] = true : validate[language] = false
    setValidLanguage(validate)
    let button = document.getElementById('search');
    button.disabled = false;
  }
  return (
    <div className="language">
      <div className="nameCount">
        <p>{language}</p>
        <p>{lines} lines of code</p>
      </div>
      <div className="toggle">
        <input type="checkbox" onChange={handleCheck} />
      </div>
    </div>
  )
}

export default Language