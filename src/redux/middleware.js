// Если мы найдем плохие слова, мы запускаем экшн showAlert
import { showAlert } from "./actions";
// Для проверки, что плохие слова исходят от кнопки "создать пост"
import { CREATE_POST } from "./types";

const forbidden = ["fuck", "suck", "php"];

// Миддлварь подключается в compose() и цепляет из редакса функцию dispatch
export function badWordsMiddleware({ dispatch }) {
  // TODO: Прояснить этот момент.
  return function (next) {
    // Миддлварь получает экшн
    return function (action) {
      // Если экшн от кнопки "создать пост"
      if (action.type === CREATE_POST) {
        // Находим соответствие что одно из слов где-то в нагрузке находится
        const found = forbidden.filter(
          (w) =>
            action.payload.title.includes(w) ||
            action.payload.content.includes(w)
        );
        // Если что-то нашло - все что мы делаем - это выводим алерт
        if (found.length) {
          return dispatch(showAlert("Tishe bud"));
        }
      }
      // В ином случае обрабатываем экшн CREATE_POST
      return next(action);
    };
  };
}
