import React, { Component } from 'react'
import Populate from './views/Populate'
import Store from './Context/Store'

class App extends Component {

  state = {
    store: 'demo'
  }

  componentDidMount = async () => {
  }

  render() {
    const store = { lang: 'en', theme: 'compact' }
    return (
      <div className="App">
        <Store.Provider value={store}>
          <Populate />
        </Store.Provider>
      </div>
    )
  }
}

export default App
