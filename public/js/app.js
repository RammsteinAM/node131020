import TodoContainer from "./TodoContainer.js";
import TodoForm from "./TodoForm.js";
import TodoList from "./TodoList.js";
import { BASE_URL } from "./constants.js";

const root = document.getElementById("root");

class App {
  async getTodoItem(id) {
    const res = await fetch(`${BASE_URL}/${id}`);
    const resJson = await res.json();
    if (!resJson.success) {
      throw Error();
    }
    return resJson.data;
  }
  
  async createTodo(text) {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const resJson = await res.json();
    if (!resJson.success) {
      throw Error("Operation failed.");
    }
    this.render();
  }

  async editTodoItem(id) {
    const card = document.querySelector(`*[data-id="${id}"]`);
    const todo = await this.getTodoItem(id);
    const editTodoForm = new TodoForm(
      BASE_URL,
      "PUT",
      id,
      todo.text
    );
    const form = editTodoForm.render();
    card.outerHTML = form;
  }

  async updateTodo(id, text) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const resJson = await res.json();
    if (!resJson.success) {
      throw Error("Operation failed.");
    }
    const card = document.querySelector(`*[data-id="${id}"]`);
    const todoList = new TodoList();
    const todoElement = todoList.generateTodoElement({id, text});
    card.outerHTML = todoElement;
  }

  async deleteTodoItem(id) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    const resJson = await res.json();
    if (!resJson.success) {
      throw Error();
    }
    this.render();
  }

  attachListeners() {
    const container = document.getElementById("todo-container");
    container.addEventListener("click", (e) => {
      const action = e.target.dataset.action;
      const id = e.target.dataset.id;
      switch (action) {
        case "edit":
          this.editTodoItem(id);
          break;
        case "delete":
          this.deleteTodoItem(id);
          break;
      }
    });
    container.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = e.target.id.value;
      const text = e.target.text.value;
      if (!id) {
        this.createTodo(text);
      } else {
        this.updateTodo(id, text);
      }
    });
  }

  async render() {
    const todoContainer = new TodoContainer();
    try {
      root.innerHTML = await todoContainer.render();
      this.attachListeners();
    } catch (error) {
      root.innerHTML = error;
    }
  }
}

const app = new App();
app.render();
