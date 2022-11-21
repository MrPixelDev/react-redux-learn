// takeEvery - функция, которая необходима чтобы обрабатывать каждый экшн поступающий в стор, конкретно в нашем случае REQUEST_POSTS
// put диспатчит события в стор
import { call, put, takeEvery } from "redux-saga/effects";
import { hideAlert, hideLoader, showAlert, showLoader } from "./actions";
import { FETCH_POSTS, REQUEST_POSTS } from "./types";

export function* sagaWatcher() {
  yield takeEvery(REQUEST_POSTS, sagaWorker);
}

function* sagaWorker() {
  try {
    yield put(showLoader());
    const payload = yield call(fetchPosts);
    yield put({ type: FETCH_POSTS, payload });
    yield put(hideLoader());
  } catch (e) {
    yield put(showAlert(e.toString()));
    yield put(hideLoader());
  }
}

async function fetchPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  return await response.json();
}
