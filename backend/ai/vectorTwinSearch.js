require('dotenv').config()
const { PineconeClient } = require('@pinecone-database/pinecone')

const pinecone = new PineconeClient()
pinecone.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT
})
const indexName = process.env.TWIN_INDEX

async function findTwinMatches(embedding) {
  const index = pinecone.Index(indexName)
  const result = await index.query({
    queryRequest: { vector: embedding, topK: 5, includeMetadata: true }
  })
  return result.matches.map(m => ({
    userId: m.metadata.userId,
    similarity: m.score,
    avatarUrl: m.metadata.avatarUrl
  }))
}

module.exports = { findTwinMatches }
