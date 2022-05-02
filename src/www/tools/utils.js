Array.prototype.concatUnique = function(arr) {
    arr.forEach((ea) => {
        if(this.indexOf(ea) === -1) {
            this.push(ea)
        }
    })
    return this
}

const sort = (arr, query) => {
    const newArr = arr
    if (query) {
        const keys = Object.keys(query)
        keys.forEach((key) => {
            newArr.concatUnique(arr.sort((a, b) => {
                a[key] - b[key]
            }))
        })
        newArr.concatUnique(arr.sort((a, b) => a.tags[query]))
    }
    return newArr
    
}

const byTags = (arr, query) => {
    const newArr = []
    return newArr

}

const byUser = (arr, query) => {
    const newArr = []
    return newArr
}