import React from "react";
// useDispatch - хук для доступа к dispatch редакса
// useSelector - хук для доступа к хранилищу состояний
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/actions";
import Post from "./Post";

export default function FetchedPosts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => {
    return state.posts.fetchedPosts;
  });
  const loading = useSelector((state) => {
    return state.app.loading;
  });
  if (!posts.length) {
    return (
      <>
        <button
          className="btn btn-primary"
          // TODO: Почему dispatch(fetchPosts()) = dispatch(dispatch => {}) если fetchPosts() {return (dispatch) => {}} и как это относится к thunk
          onClick={() => dispatch(fetchPosts())}
        >
          Load
        </button>
        <div
          className="spinner-border"
          role="status"
          style={!loading ? { display: "none" } : { display: "inline-block" }}
        >
          <span className="sr-only"></span>
        </div>
      </>
    );
  }
  return posts.map((post) => <Post post={post} key={post.id} />);
}
