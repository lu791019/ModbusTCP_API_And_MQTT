import pkg from 'lodash'
const { round } = pkg

const flattenObject = (obj, parentKey = '', result = {}) => {
  for (let [key, value] of Object.entries(obj)) {
    const newKey = parentKey ? `${parentKey}_${key}` : key
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      flattenObject(value, newKey, result)
    } else {
      result[newKey] = value
    }
  }
  return result
}

const processJson = (data) => {
  const result = {}
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'object') {
      result[key] = processJson(value)
    } else {
      result[key] = typeof value === 'number' ? round(value * 1, 1) : value
    }
  }
  return result
}

export { flattenObject, processJson }
