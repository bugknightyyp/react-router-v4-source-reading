import React from 'react'
import { render } from 'react-dom'

//React.initializeTouchEvents(true);
//import ocBridge from './components/WebViewJavascriptBridge.js'

import App from './basic/basic.js'


render(
  <App />,
  document.getElementById('app-container')
)
