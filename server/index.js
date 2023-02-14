const express = require('express');
const app = express();

const path = require('path');
const axios = require('axios');

const cf = require('../config.js')
const port = cf.port;
const pat = cf.pat;


app.use(express.static(path.join(__dirname, "../docs",)));
app.use(express.json())
// set up express server

// first search for signed-in user by name

app.get('/repos/*', (req, res) => {
  console.log(req.query)
  let username = req.query.username
  let url = `https://api.github.com/users/${username}/repos`
  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${pat}`
    }
  }
  axios.request(options)
    .then((result) => {
      result = result.data
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send(`error`)
    })
})

app.post('/languages/', (req, res) => {

  let { username, repos } = req.body;
  let languages = {};
  for (let x = 0; x < repos.length; x++) {
    let repo = repos[x]
    let url = `https://api.github.com/repos/${username}/${repo}/languages`
    let options = {
      url: url,
      headers: {
        'User-Agent': 'request',
        'Authorization': `token ${pat}`
      }
    }
    axios.request(options)
      .then((response) => {
        let langs = response.data;
        for (let key in langs) {
          if (!languages[key]) languages[key] = 0;
          languages[key] += langs[key]
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(400).send(err)
      })
  }
  setTimeout(() => {
    res.send(languages)
  }, 2000)
})

app.post('/search/', (req, res) => {
  console.log(req.body)
  let languages = req.body.languages ? req.body.languages : null;
  let topics = req.body.topics ? req.body.topics : null;
  let date = req.body.date ? req.body.date : null;
  let open = req.body.opensource ? true : false

  let str = '';
  if (languages) {
    languages.map((language, index) => {
      index > 0 ? str += '+' : null
      str += `language:${language}`
    })
  }
  if (topics) {
    str += '+'
    topics.map((topic, index) => {
      index > 0 ? str += '+' : null
      str += `topic:${topic}`
    })
  }
  if (date) {
    str += '+pushed:>' + date
  }
  if (open) {
    str += 'topic:open-source'
  }
  let url = `https://api.github.com/search/repositories?q=contributions+welcome+in:readme+${str}+label:good-first-issue`//&sort=good-first-issues&order=desc&per_page=30`
  console.log(url)
  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${pat}`
    }
  }
  axios.request(options)
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send(err)
    })
})

app.post('/issues/', (rqe, res) => {
  // https://api.github.com/search/issues?q=language:javascript+label:good-first-issue
})

app.post('/topics/', (req, res) => {
  let url = req.body.url;
  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${pat}`
    }
  }
  axios.request(options)
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

// gather all repos and save in state
// go to each repo one by one and find languages, save in state


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})