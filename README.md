# SimpleChat

## Настройки сервера (nodejs + express + webpack)
### Devopment build
  * транспиляция из ES6+ (Babel)
  * линтинг (ESLint)
  * запуск юнит-тестов (Jest)
  * автоматическа сборка проекта после внесения изменения без ребилда (webpack-dev-middleware)
  * автоматическое обновление страницы браузера при сохрании изменений в коде на сервере - Hot Module Reloading
  * сохрание исходников после сборки проекта в том в виде, в котором они дежат на сервере

### Production build
  * минимизация кода css и js (mini-css-extract-plugin, UglifyJS)
  * хэширование и вставка изображений в css

