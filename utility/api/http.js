import axios from 'axios'

class Http {
  constructor() {
    this.http = axios.create({
      timeout: 10000,
      validateStatus: function (status) {
        return status < 600 // Resolve only if the status code is less than 600
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  setToken = (token) => {
    if (token) {
      this.http.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }

  get = async (url, data = {}, option = {}) => {
    const queryString = Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')

    // header增加 option
    if (option) {
      this.http.defaults.headers.common = { ...this.http.defaults.headers.common, ...option }
    }

    try {
      const response = await this.http.get(`${url}?${queryString}`)

      if (this.handleError(response)) return null // Consider returning null or throwing an error
      return response.data
    } catch (error) {
      // Consider a more detailed error handling strategy
      console.error('HTTP GET request failed:', error)
      throw error // Or return a specific error object
    }
  }

  // Placeholder for handleError method
  handleError(response) {
    // Implement error handling logic here
    // Return true if error is handled, false otherwise
    return response.status >= 400 // Simple example
  }

  // Consider adding post, put, delete, etc. methods
}

export default Http
