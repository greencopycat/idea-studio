import React from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'

import Populate from './Populate'
import Missing from './Missing'

class Main extends React.Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path={`/populate`} element={<Populate />} />
                    <Route path={`*`} element={<Missing />} />
                </Routes>
            </Router>
        )
    }
}

export default Main
