import { createHash } from 'crypto'

const generatedKey = () => {
  const password = process.env.WEATHER_PASSWORD
  const now = new Date()
  const day = now.getDate()
  const month = now.getMonth() + 1 // JS months are 0-indexed
  const year = now.getFullYear() % 100 // Get last two digits of the year

  // Calculating the key based on the provided logic
  const key = day * 2 + month * 100 * 3 + year * 10000 * 17

  // Concatenating the key with the password and generating the MD5 hash
  const hash = createHash('md5').update(`${key}${password}`).digest('hex')

  return hash
}

export default generatedKey
