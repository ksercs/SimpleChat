import {logMessage} from './js/logger'
import './css/style.css'

logMessage('Welcome!')

if(typeof(module.hot) !== 'undefined') { // eslint-disable-line no-undef
  module.hot.accept(); // eslint-disable-line no-undef
}