import React from "react";
// connect подключает компонент к react-store
import { connect } from "react-redux";
import { createPost, showAlert } from "../redux/actions";
import { Alert } from "./Alert";

// Это таки компонент реакта
class PostForm extends React.Component {
  // Создаем объект класса
  constructor(props) {
    // Это таки компонент реакта, его и создаем в качестве инстанса
    super(props);
    // Переопределяем стейт инстанса, унаследованного от React.Component
    // TODO: А я уверен?
    this.state = {
      title: "",
      content: "",
    };
  }

  // При отправке формы
  submitHandler = (event) => {
    // Чтобы страница не перезагружалась при событии
    event.preventDefault();
    // Цепляем текущее состояние
    const { title, content } = this.state;
    // Если что-то в форме было пусто на момент отправки открываем алерт
    // TODO: На сколько я понял, при вызове функции connect() в пропсы класса так же передаются экшены
    if (!title.trim() || !content.trim()) {
      return this.props.showAlert(
        "Название или содержание не может быть пустым"
      );
    }
    // Создаем объект поста
    const newPost = {
      title,
      content,
      id: Date.now().toString(),
    };
    // Вызываем экшн создания поста, в пейлоад отправляем пост
    this.props.createPost(newPost);
    // Обнуляем заполненность формы
    // setState унаследован от React.Component
    // TODO: Разобраться как работает
    this.setState({ title: "", content: "" });
  };

  // Когда вводим в форму данные, обновляем текущий стейт
  changeInputHandler = (event) => {
    // this.setState((prev) => ({
    //   ...prev,
    //   ...{ [event.target.name]: event.target.value },
    // }));
    this.setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }));
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        {/* Если в стейте alert не null, отображаем на рендере текущий алерт с его пейлоадом */}
        {this.props.alert && <Alert text={this.props.alert} />}
        <div className="form-group">
          <label htmlFor="title">Заголовок поста</label>
          <input
            type="text"
            className="form-control"
            id="title"
            // Велью всегда будет текущий стейт
            value={this.state.title}
            name="title"
            onChange={this.changeInputHandler}
          />
          <input
            type="text"
            className="form-control"
            id="content"
            // Велью всегда будет текущий стейт
            value={this.state.content}
            name="content"
            onChange={this.changeInputHandler}
          />
        </div>
        <button className="btn-success btn mt-1" type="submit">
          Создать
        </button>
      </form>
    );
  }
}

// Отправляем данные экшены в пропсы
const mapDispatchToProps = {
  createPost,
  showAlert,
};

// Отправляем следующий стейт в пропсы (он у нас изначально там не задан)
const mapStateToProps = (state) => ({
  alert: state.app.alert,
});

// Объединяем объект PostForm и Redux (Отправляем в компоненту конкретные методы и стейты)
export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
