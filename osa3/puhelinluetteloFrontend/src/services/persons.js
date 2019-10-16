import axios from 'axios'
const baseUrl = 'https://pacific-inlet-92436.herokuapp.com/api/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = newObject => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const remove = personId => {
    return axios.delete(`${baseUrl}/${personId}`)
}

const replace = changedPerson => {
    return axios.put(`${baseUrl}/${changedPerson.id}`, changedPerson).then(response => response.data)
}

export default { getAll, create, remove, replace }