import React from 'react'
import ReactDOM from 'react-dom'
import './components/styles/index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
    <App />,
  document.getElementById('root'))

registerServiceWorker()
