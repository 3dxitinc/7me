const functions = require('firebase-functions')
const express = require('express')
const bodyParser = require('body-parser')
const { findTwinMatches } = require('./ai/vectorTwinSearch')
const { findCelebrityTwins } = require('./ai/celebritySearch')

const app = express()
app.use(bodyParser.json())

app.post('/twins', async (req, res) => {
  const { embedding } = req.body
  const results = await findTwinMatches(embedding)
  res.json(results)
})

app.post('/celebrity', async (req, res) => {
  const { embedding } = req.body
  const results = await findCelebrityTwins(embedding)
  res.json(results)
})

exports.api = functions.https.onRequest(app)
