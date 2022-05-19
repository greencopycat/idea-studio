import React from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'

import styles from './Main.module.css'

import Welcome from './Welcome'
import AddNew from './AddNew'
import Populate from './Populate'
import View from './View'
import Visual from './Visual'
import Missing from './Missing'
import Modify from './Modify'
import Tags from './Tags'
import Hero from './../components/atoms/Hero'
import Update from './Update'
import Footer from './../components/Layout/Footer/Footer'

class Main extends React.Component {
    render() {
        const menuClasses = [styles.menu]
        const linkClasses = [`font-regular`]
        const footerProps = {
            feed: {
                copyright: {
                    company: 'The Studio of Brain Pickers',
                    year: '2022'
                }
            }
        }
        return (
            <>
                <Router>
                    <div className={menuClasses.join(' ')}>
                        <NavLink className={({isActive}) => { 
                            const newClasses = []
                            newClasses.push(...linkClasses)
                            if (isActive) {
                                newClasses.push('active')
                            }
                            return newClasses.join(' ')
                        }} to={`/`}>Home</NavLink>
                        <NavLink className={({isActive}) => { 
                            const newClasses = []
                            newClasses.push(...linkClasses)
                            if (isActive) {
                                newClasses.push('active')
                            }
                            return newClasses.join(' ')
                        }} to={`/view`}>View</NavLink>
                        <NavLink className={({isActive}) => { 
                            const newClasses = []
                            newClasses.push(...linkClasses)
                            if (isActive) {
                                newClasses.push('active')
                            }
                            return newClasses.join(' ')
                        }} to={`/update`}>Update</NavLink>
                        <NavLink className={({isActive}) => { 
                            const newClasses = []
                            newClasses.push(...linkClasses)
                            if (isActive) {
                                newClasses.push('active')
                            }
                            return newClasses.join(' ')
                        }} to={`/addnew`}>New</NavLink>
                        <NavLink className={({isActive}) => { 
                            const newClasses = []
                            newClasses.push(...linkClasses)
                            if (isActive) {
                                newClasses.push('active')
                            }
                            return newClasses.join(' ')
                        }} to={`/populate`}>Bulk</NavLink>
                        <NavLink className={({isActive}) => { 
                            const newClasses = []
                            newClasses.push(...linkClasses)
                            if (isActive) {
                                newClasses.push('active')
                            }
                            return newClasses.join(' ')
                        }} to={`/tags`}>Tags</NavLink>
                        {/* <NavLink className={`font-regular`} to={`/visualization`}>Visualization</NavLink> */}
                    </div>
                    <Hero classes={`mar-b25`} size={`small`} />
                    <Routes>
                        <Route path={`/`} exact element={<Welcome />} />
                        <Route path={`/view`} element={<View />} />
                        <Route path={`/update`} exact element={<Update />} />
                        <Route path={`/update/:id`} element={<Modify />} />
                        <Route path={`/addnew`} element={<AddNew />} />
                        <Route path={`/populate`} element={<Populate />} />
                        <Route path={`/tags`} element={<Tags />} />
                        {/* <Route path={`/visualization`} element={<Visual/>} /> */}
                        <Route path={`/*`} element={<Missing />} />
                    </Routes>
                    <Footer {...footerProps} />
                </Router>
            </>
        )
    }
}

export default Main
