const api = async (endpoint, query) => {
    return (await fetch(endpoint, query)).json()
}
const get = (endpoint, query, callback) => {
    return api(endpoint, { method: 'GET', mode: 'cors'})
}
const post = async (endpoint, query, callback) => {
    if(!query) {
        return Promise.reject({status: 400, message: 'Please provide data.'})
    } else {
        let qBody = query.data
        let page = query.page
        let headers = {}
        let body = ''
        if(page === 'addnew') {
            headers[`Accept`] = 'application/json'
            headers[`Content-Type`] = 'application/json'
            if(Array.isArray(qBody)) {
                qBody.forEach((ea) => {
                    if (ea[`tags`] && (typeof ea[`tags`] === 'string')) {
                        ea[`tags`] = ea[`tags`].replace(/\s/g, '').split(',')
                    }
                })
            }
            body = JSON.stringify({data: qBody})
        } else 
        if(page === 'populate') {
            body = qBody
        }
        return await api(endpoint, { 
            method: 'POST', 
            body,
            headers,
        })
        .then((data) => {
            if(data.status >= 400) {
                return Promise.reject({status: 400, message: data.message})
            } else {
                return Promise.resolve({status: 200, message: data.message})
            }
        })
        .catch((err) => {
            return Promise.reject(err)
        })
    }
}
const remove = async (endpoint, query, callback) => {
    if (!(query && query.id)) {
        return Promise.reject({status: 400, message: 'Please provide data.'})
    } else {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        return await api(endpoint, {
            method: 'POST',
            body: JSON.stringify(query),
            headers,
        })
        .then(data => {
            if(data.status >= 400) {
                return Promise.reject({status: 400, message: data.message})
            } else {
                return Promise.resolve({status: 200, message: data.message})
            }
        })
        .catch(err => {
            return Promise.reject(err)
        })
    }
}

const update = async (endpoint, query) => {
    if (!query || !Object.keys(query).length) {
        return Promise.reject({status: 400, message: 'Please provide data.'}) 
    } else {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        return await api(endpoint, {
            method: 'POST',
            body: JSON.stringify(query),
            headers,
        })
        .then(data => {
            if(data.status >= 400) {
                return Promise.reject({status: 400, message: data.message})
            } else {
                return Promise.resolve({status: 200, message: data.message})
            }
        })
        .catch(err => {
            return Promise.reject(err)
        })
    }
}

const MS = {
    get, 
    post,
    remove,
    update,
}

export default MS