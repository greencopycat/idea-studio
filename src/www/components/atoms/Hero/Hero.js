import React, { useReducer, useEffect, useState } from 'react'
import PropTypes from 'prop-types'


import styles from './Hero.module.css'

import heroImage from './../../../assets/hero1.png'

const Hero = (props) => {
    const size = styles[props.size] || styles['medium']
    const classes = [styles.wrapper, size]
    const [dim, setDim] = useState({w:0, h:300})
    let timeout
    const modes = ['destination-over', 'lighter', 'multiply', 'screen', 'overlay', 'darken',
             'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 
             'exclusion', 'hue', 'saturation', 'color', 'luminosity' ]
    if (props.classes) {
        const cls = props.classes.replace(/\s/g, '').split(',')
        classes.concat([...cls])
    }

    useEffect(() => {
        const canvas = document.querySelector('#ctx')
        const ctx = canvas.getContext('2d')
        const img = new Image()
        let ratio = 0
        const bgClr = 'orange'
        img.onload = () => {
            setDim({w:window.innerWidth, h:300})
            ratio = img.height / img.width
            let height = Math.min(canvas.height, img.height)
            let width = height / ratio
            let dx = (window.innerWidth - width) / 2
            ctx.globalAlpha = .55
            ctx.globalCompositionOperation = modes[5]
            // ctx.rect(dx, 0, width - 10, height -10)
            ctx.rect(0, 0, window.innerWidth, 300 - 10 )
            ctx.fillStyle = bgClr
            ctx.fill()
            ctx.globalAlpha = .75
            ctx.drawImage(img, dx , 0, width - 10, height - 10)
        }
        img.src = heroImage

        window.addEventListener('resize', (evt) => {
            timeout && clearTimeout(timeout)
            timeout = setTimeout((evt) => {
                setDim({w:window.innerWidth, h:300})
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                let h = Math.min(canvas.height, img.height)
                let w = h / ratio
                let dx = (window.innerWidth - w) / 2
                ctx.globalAlpha = .55
                ctx.globalCompositionOperation = modes[0]
                // ctx.rect(dx, 0, w - 10, h -10)
                ctx.rect(0, 0, window.innerWidth , 300 - 10)
                ctx.fillStyle = bgClr
                ctx.fill()
                ctx.globalAlpha = .75
                ctx.drawImage(img, dx, 0, w - 10, h - 10)
            }, 100)
        })
    }, [])

    return (
        <div className={classes.join(' ')}>
            <canvas id={`ctx1`} width={dim.w} height={dim.h}>You are my Hero</canvas>
            <canvas id={`ctx`} width={dim.w} height={dim.h}>You are my Hero</canvas>
        </div>
    )
}

Hero.propTypes = {
    classes: PropTypes.string,
    data: PropTypes.object,
    size: PropTypes.oneOf(['large', 'medium', 'small'])
}

export default Hero