import {logMessage} from './js/logger'
import './css/style.less'

logMessage('App started')

if(typeof(module.hot) !== 'undefined') { // eslint-disable-line no-undef
  module.hot.accept(); // eslint-disable-line no-undef
}