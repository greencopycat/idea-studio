import React, { Component } from 'react'
import Store from './Context/Store'

import Main from './views/Main'

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
          <Main />
        </Store.Provider>
      </div>
    )
  }
}

export default App
