import React from "react";
// render as interface Renderer
import { render } from "react-dom";
// compose - функция-усилитель стора, добавляющая в редакс функционал других усилителей
// applyMiddleware - функция-усилитель, добавляющий в редакс миддлвари
// createStore - нативная функция, объявляющая хранилище состояний
import { compose, createStore, applyMiddleware } from "redux";
import App from "./App";
// Provider - Делает хранилище редакса доступным для вызовов connect() из компонентов внутри
import { Provider } from "react-redux";
// createSagaMiddleware - это дефолтный экспорт, можем давать любое название
import createSagaMiddleware from "redux-saga";
// thunk - миддлварь, позволяющая вызывать создатели экшенов которые возвращают функцию вместо объекста экшена
import thunk from "redux-thunk";
// badWordsMiddleware - самописный мидлварь-фильтр плохих слов, переданных в form
import { badWordsMiddleware } from "./redux/middleware";
// rootReducer - Главный редуктор
// Редуктор - функция, которая вычисляет следующее состояние дерева на основании его предыдущего состояния и применяемого действия
import { rootReducer } from "./redux/rootReducer";
import reportWebVitals from "./reportWebVitals";
import { sagaWatcher } from "./redux/sagas";

const saga = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, badWordsMiddleware, saga),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

saga.run(sagaWatcher);

// Собственно наш JSX элемент
const app = (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// Рендерим приложение
render(app, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
