import React from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'

import styles from './Main.module.css'

import Welcome from './Welcome'
import AddNew from './AddNew'
import Populate from './Populate'
import View from './View'
import Missing from './Missing'
import Footer from './../components/Layout/Footer/Footer'

class Main extends React.Component {
    render() {
        const menuClasses = [styles.menu, 'mar-b20']

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
                        <NavLink className={`font-regular`} to={`/addnew`}>New</NavLink>
                        <NavLink className={`font-regular`} to={`/populate`}>Bulk</NavLink>
                    </div>
                    <Routes>
                        <Route path={`/`} exact element={<Welcome />} />
                        <Route path={`/view`} element={<View />} />
                        <Route path={`/addnew`} element={<AddNew />} />
                        <Route path={`/populate`} element={<Populate />} />
                        <Route path={`/*`} element={<Missing />} />
                    </Routes>
                    <Footer {...footerProps} />
                </Router>
            </>
        )
    }
}

export default Main
