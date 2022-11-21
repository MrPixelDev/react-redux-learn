// К редуктору appReducer относятся следующие типы действий:
import { HIDE_ALERT, HIDE_LOADER, SHOW_ALERT, SHOW_LOADER } from "./types";

// Начальное состояние дерева app
const initialState = {
  loading: false,
  alert: null,
};

// appReducer - это функция, принимающая в себя объект текущего состояния (при его отсутствии - начального состояния) и объекст действия)
export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    // Мы так или иначе должны вернуть объект состояния. В случае, если прилетел валидный экшн - добавляем в этот объект новое состояние при этом сохраняя историю состояний.
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    case SHOW_ALERT:
      return { ...state, alert: action.payload };
    case HIDE_ALERT:
      return { ...state, alert: null };
    default:
      return state;
  }
};
