// Будем выбирать, какая функция какой тип действия будет отдавать в connect()
import {
  CREATE_POST,
  FETCH_POSTS,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ALERT,
  HIDE_ALERT,
  REQUEST_POSTS,
} from "./types";

// Отправляем созданный пост
export function createPost(post) {
  return {
    type: CREATE_POST,
    payload: post,
  };
}

// Показываем спиннер загрузки
export function showLoader() {
  return {
    type: SHOW_LOADER,
  };
}

// Убираем спиннер загрузки
export function hideLoader() {
  return {
    type: HIDE_LOADER,
  };
}

// Показываем алерт
// Данный метод возвращает реализацию функции dispatch в thunk middleware, откуда она подхватится глобально. А все изза таймаута
// TODO: на счет подгрузки - уточнить
export function showAlert(text) {
  return (dispatch) => {
    dispatch({
      type: SHOW_ALERT,
      payload: text,
    });

    setTimeout(() => {
      dispatch(hideAlert());
    }, 3000);
  };
}

// Скрываем алерт
export function hideAlert() {
  return {
    type: HIDE_ALERT,
  };
}

// Функция, реализующая асинхронный фетчинг
// Возвращает асинхронную функцию вместо объекта экшн и отправляет в thunk.
// TODO: Разобраться, как и куда там он ее отправляет
export function fetchPosts() {
  return {
    type: REQUEST_POSTS,
  };
  // return async (dispatch) => {
  //   try {
  //     dispatch(showLoader());
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/posts?_limit=5"
  //     );
  //     const json = await response.json();
  //     dispatch({ type: FETCH_POSTS, payload: json });
  //     dispatch(hideLoader());
  //   } catch (e) {
  //     dispatch(showAlert(e.toString()));
  //     dispatch(hideLoader());
  //   }
  // };
}
