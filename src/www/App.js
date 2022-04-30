import React, { StrictMode, Component } from 'react'
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
        <StrictMode>
          <Store.Provider value={store}>
            <Main />
          </Store.Provider>
        </StrictMode>
      </div>
    )
  }
}

export default App
