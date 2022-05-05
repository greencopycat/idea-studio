import React from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'

import styles from './Main.module.css'

import Welcome from './Welcome'
import AddNew from './AddNew'
import Populate from './Populate'
import View from './View'
import Visual from './Visual'
import Missing from './Missing'
import Hero from './../components/atoms/Hero'
import Update from './Update'
import Footer from './../components/Layout/Footer/Footer'

class Main extends React.Component {
    render() {
        const menuClasses = [styles.menu]

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
                        <NavLink className={`font-regular`} to={`/`}>Home</NavLink>
                        <NavLink className={`font-regular`} to={`/view`}>View</NavLink>
                        <NavLink className={`font-regular`} to={`/update`}>Update</NavLink>
                        <NavLink className={`font-regular`} to={`/addnew`}>New</NavLink>
                        <NavLink className={`font-regular`} to={`/populate`}>Bulk</NavLink>
                        {/* <NavLink className={`font-regular`} to={`/visualization`}>Visualization</NavLink> */}
                    </div>
                    <Hero classes={`mar-b25`} size={`small`} />
                    <Routes>
                        <Route path={`/`} exact element={<Welcome />} />
                        <Route path={`/view`} element={<View />} />
                        <Route path={`/update`} element={<Update />} />
                        <Route path={`/addnew`} element={<AddNew />} />
                        <Route path={`/populate`} element={<Populate />} />
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
