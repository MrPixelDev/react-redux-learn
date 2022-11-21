// К редуктору postsReducer относятся следующие типы действий:
import { CREATE_POST, FETCH_POSTS } from "./types";

// Начальное состояние
const initialState = {
  posts: [],
  fetchedPosts: [],
};

// appReducer - это функция, принимающая в себя объект текущего состояния (при его отсутствии - начального состояния) и объекст действия)
export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Мы так или иначе должны вернуть объект состояния. В случае, если прилетел валидный экшн - добавляем в этот объект новое состояние.
    case CREATE_POST:
      // action.payload - нагрузка (дополнительные данные), которые мы передаем в вызов редуктора. Историю состояний ведем
      return { ...state, posts: [...state.posts, action.payload] };
    case FETCH_POSTS:
      return { ...state, fetchedPosts: action.payload };
    default:
      return state;
  }
};
