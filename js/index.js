// import { saveTo, getFrom } from "./localStorage";

const list = $(".list");
const item = $(".item");
const input = $("#add-input");
const add = $("#add-submit");
const remove = $(".item-remove");
const search = $("#search");
const searchButton = $("#search-button");

let todos = [];

$(document).ready(function () {
  todos = getFromLocalStorage();
  if (!todos) {
    saveToLocalStorage([]);
  }
  renderList(todos);

  item.click(isComplete);
  add.click(addTodo);
  remove.click(removeTodo);
  searchButton.click(searchText);
});

function addTodo(event) {
  event.preventDefault();
  const target = input.val();

  if (!target) {
    return;
  }

  todos.push({
    text: `${target}`,
    done: false,
  });

  saveToLocalStorage(todos);

  list.append(
    `<li class ="item">
        <span class ="item-text">${target}</span>` +
      `<button class="item-remove">Удалить</button>
      </li>`
  );

  $(".item-remove").bind("click", removeTodo);

  input.val("");
}

function removeTodo(event) {
  event.preventDefault();

  const target = $(event.target);

  todos = todos.filter(
    (todo) => todo.text !== target.parent()[0].firstElementChild.innerText
  );

  saveToLocalStorage(todos);

  target.parent().remove();
}

function isComplete(event) {
  event.preventDefault();

  const target = $(event.target);

  todos.filter((todo) => {
    if (todo.text === target.html()) {
      todo.done = todo.done ? false : true;
    }
    return todo;
  });

  // console.log(todos);
  saveToLocalStorage(todos);

  target.toggleClass("done");
}

function searchText(event) {
  event.preventDefault();
  const target = search.val();

  if (!target) {
    return;
  }

  todos = getFromLocalStorage();

  const findItem = todos.filter((todo) => todo.text.includes(target));

  renderList(findItem);
  list.bind("click", isComplete);

  $(".mbox").append(`<button class="goBack">Вернуться</button>`);
  $(".goBack").bind("click", isBack);

  search.val("");
}

function renderList(array) {
  $(".list .item").remove();
  list.remove("click", isComplete);
  $(".goBack").remove();
  $(".goBack").remove("click", isBack);

  const template = array.map(
    ({ done, text }) =>
      `<li class ="item">
        <span class ="item-text ${done ? "done" : ""}">${text}</span>` +
      `<button class="item-remove">Удалить</button>
      </li>`
  );

  list.append(template);

  $(".item-remove").bind("click", removeTodo);

  list.bind("click", isComplete);
}

function isBack(event) {
  event.preventDefault();
  renderList(todos);
}

const saveToLocalStorage = function saveTo(todosQueue) {
  localStorage.setItem("todosQueue", JSON.stringify(todosQueue));
};

const getFromLocalStorage = function getFrom() {
  const currentTodosQueue = localStorage.getItem("todosQueue");
  return JSON.parse(currentTodosQueue);
};
