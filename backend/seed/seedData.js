require('dotenv').config()
const { PineconeClient } = require('@pinecone-database/pinecone')

const pinecone = new PineconeClient()
pinecone.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT
})
const TWIN_INDEX = process.env.TWIN_INDEX
const CELEB_INDEX = process.env.CELEB_INDEX

function generateRandomEmbedding() {
  return Array.from({ length: 512 }, () => Math.random())
}

const celebrities = [
  { id: 'celeb-1', name: 'Chris Evans', imageUrl: 'https://i.imgur.com/ChrisEvans.png' },
  { id: 'celeb-2', name: 'Scarlett Johansson', imageUrl: 'https://i.imgur.com/Scarlett.png' },
  { id: 'celeb-3', name: 'Robert Downey Jr.', imageUrl: 'https://i.imgur.com/Robert.png' },
  { id: 'celeb-4', name: 'Emma Watson', imageUrl: 'https://i.imgur.com/Emma.png' },
  { id: 'celeb-5', name: 'Dwayne Johnson', imageUrl: 'https://i.imgur.com/Dwayne.png' }
]

const testUsers = [
  { id: 'user-1', avatarUrl: 'https://i.imgur.com/User1.png' },
  { id: 'user-2', avatarUrl: 'https://i.imgur.com/User2.png' },
  { id: 'user-3', avatarUrl: 'https://i.imgur.com/User3.png' },
  { id: 'user-4', avatarUrl: 'https://i.imgur.com/User4.png' }
]

async function seedIndex(indexName, vectors) {
  const index = pinecone.Index(indexName)
  await index.upsert({ upsertRequest: { vectors } })
  console.log(`Seeded ${vectors.length} vectors into ${indexName}`)
}

async function runSeed() {
  const celebVectors = celebrities.map(c => ({ id: c.id, values: generateRandomEmbedding(), metadata: { name: c.name, imageUrl: c.imageUrl } }))
  await seedIndex(CELEB_INDEX, celebVectors)

  const userVectors = testUsers.map(u => ({ id: u.id, values: generateRandomEmbedding(), metadata: { userId: u.id, avatarUrl: u.avatarUrl } }))
  await seedIndex(TWIN_INDEX, userVectors)

  console.log('✅ Pinecone seed completed!')
}

runSeed().catch(console.error)
