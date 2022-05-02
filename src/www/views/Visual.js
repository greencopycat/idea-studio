import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import MS from './../services/microservices'
import { ENDPOINT } from './../constant/constant'

const Visual = (props) => {
    Array.prototype.concatUnique = function (arr2) {
        arr2.forEach((item) => {
            if (this.indexOf(item) === -1) {
                this.push({ name: item })
            }
        })
        return this
    }
    useEffect((props) => {
        const ctx = document.querySelector('#visual').getContext('2d')
        MS.get(ENDPOINT.IDEA_GET)
            .then((data) => {
                const arr = data.body
                const tags = []
                arr.forEach((item) => {
                    tags.concatUnique(item[`tags`])
                })
                ctx.beginPath()
                const seed = 255 / tags.length
                tags.forEach((tag, i) => {
                })
            })
            .catch((exception) => {
                console.error('[vis] -> get -> ', exception)
            })
    }, [props])
    // echart

    return (
        <div>
            <canvas id={`visual`} />
        </div>
    )
}

Visual.propTypes = {
    data: PropTypes.object
}

export default Visual