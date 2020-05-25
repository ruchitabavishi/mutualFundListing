import axios from 'axios'

const baseURL = 'https://api.kuvera.in/api/'

export default axios.create({
    baseURL
})