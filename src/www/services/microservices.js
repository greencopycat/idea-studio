const api = async (endpoint, query) => {
    return await fetch(endpoint, query)
        .then((data) => {
            if(data.status >= 400) {
                return data.json()
            } else {
                return data.json()
            }
        })
        .then((data) => {
            return Promise.resolve(data)
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}
const get = (endpoint, query, callback) => {
    return api(endpoint, { method: 'GET'})
}
const post = async ( endpoint, query, callback) => {
    if(!query) {
        return Promise.reject({status: 400, message: 'Please provide data.'})
    } else {
        return await api(endpoint, { method: 'POST', body: query})
        .then((data) => data)
        .catch((err) => {
            return Promise.reject(err)
        })
    }
}
const remove = async (endpoint, query, callback) => {

}
const put = async (endpoint, query, callback) => {

}
const MS = {
    get, 
    post,
    remove,
    put,
}

export default MS