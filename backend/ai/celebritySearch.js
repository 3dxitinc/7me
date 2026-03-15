require('dotenv').config()
const { PineconeClient } = require('@pinecone-database/pinecone')

const pinecone = new PineconeClient()
pinecone.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT
})
const indexName = process.env.CELEB_INDEX

async function findCelebrityTwins(embedding) {
  const index = pinecone.Index(indexName)
  const result = await index.query({
    queryRequest: { vector: embedding, topK: 5, includeMetadata: true }
  })
  return result.matches.map(m => ({
    name: m.metadata.name,
    similarity: m.score,
    imageUrl: m.metadata.imageUrl
  }))
}

module.exports = { findCelebrityTwins }
