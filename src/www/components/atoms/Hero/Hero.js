import React, { useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'


import styles from './Hero.module.css'

import heroImage from './../../../assets/hero1.png'

const Hero = (props) => {
    const size = styles[props.size] || styles['medium']
    const classes = [styles.wrapper, size]
    if (props.classes) {
        const cls = props.classes.replace(/\s/g, '').split(',')
        classes.concat([...cls])
    }

    useEffect(() => {
        const canvas = document.querySelector('#ctx')
        const canvas1 = document.querySelector('#ctx1')
        const ctx = canvas.getContext('2d')
        const ctx1 = canvas1.getContext('2d')
        const img = new Image()
        img.onload = () => {
            const width = window.innerWidth
            ctx.globalAlpha = .55
            ctx.drawImage(img, 5 ,5, width - 10, ctx.canvas.height - 10)
            ctx1.rect(5, 5, width - 10, ctx.canvas.height - 10)
            ctx1.fillStyle = "orange"
            ctx1.globalAlpha = .85
            ctx1.fill()
        }
        img.src = heroImage
    }, [])

    return (
        <div className={classes.join(' ')}>
            <canvas id={`ctx1`} width={900} height={300}>You are my Hero</canvas>
            <canvas id={`ctx`} width={900} height={300}>You are my Hero</canvas>
        </div>
    )
}

Hero.propTypes = {
    classes: PropTypes.string,
    data: PropTypes.object,
    size: PropTypes.oneOf(['large', 'medium', 'small'])
}

export default Hero