import React from "react";
// Для объединения текущей компоненты и редакса
import { connect } from "react-redux";
// Цепляем компоненту Post
import Post from "./Post";

// Компонента кющает посты из хранилища состояний
const Posts = ({ syncPosts }) => {
  // Если постов в хранилище нема
  if (!syncPosts.length) {
    return (
      <div className="card pt-3">
        <p className="text-center">There are no posts yet</p>
      </div>
    );
  }
  // иначе компонента возвращает массив из компонентов Post, в пропсы которых уходят посты и их айди (key тут у нас обязателен)
  // TODO: разобраться, почему он обязателен
  return syncPosts.map((post) => <Post post={post} key={post.id} />);
};

// Эта функция вернет из общего объекта состояния стора нужные нам поля в качестве значений. Конкретно нам нужны из редуктора постов посты.
const mapStateToProps = (state) => {
  return {
    syncPosts: state.posts.posts,
  };
};

// Отправляем в функцию Posts нужные нам стейты, экшенов тут не будет, только рендерим текущие значения
export default connect(mapStateToProps, null)(Posts);
