// combineReducers - функция, объединяющая редукторы в один главный редуктор
import { combineReducers } from "redux";
// Редуктор, работающий с физикой приложения
import { appReducer } from "./appReducer";
// Редуктор, работающий с физикой постов
import { postsReducer } from "./postsReducer";

export const rootReducer = combineReducers({
  posts: postsReducer,
  app: appReducer,
});
