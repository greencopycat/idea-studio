const api = async (endpoint, query) => {
    return await fetch(endpoint, query)
        .then((data) => {
            if(data.status >= 400) {
                return Promise.reject(data.json())
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
    return api(endpoint, { method: 'GET', mode: 'cors'})
}
const post = async (endpoint, query, callback) => {
    if(!query) {
        return Promise.reject({status: 400, message: 'Please provide data.'})
    } else {
        try {
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
            .then((data) => data)
            .catch((err) => {
                return Promise.reject(err)
            })
        } catch (ex) {
            console.error('[api] -> Exception -> ', endpoint, ' :: ', ex)
        }
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