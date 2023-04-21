import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
import MapContextProvider from '@/contexts/MapContext'
import AuthGate from '@/components/global/organisms/auth/AuthGate'

// import {
//   applyPolyfills,
//   defineCustomElements
// } from '@esri/calcite-components/dist/loader'
// import '@esri/calcite-components/dist/calcite/calcite.css'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

// Apply polyfills and then define the custom elements
// polyfills are not needed if you don't support IE11 or Edge
// applyPolyfills().then(() => {
//   defineCustomElements(window)
// })

const basename = '' // refer to building-stunning-webapp repo. Eval for removal.

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> comment strict mode because it double renders during dev https://stackoverflow.com/questions/48846289/why-is-my-react-component-is-rendering-twice
  <BrowserRouter basename={basename}>
    <Provider store={store}>
      <MapContextProvider>
        <AuthGate>
          <App />
        </AuthGate>
      </MapContextProvider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
)
