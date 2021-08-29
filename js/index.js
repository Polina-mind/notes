// import { saveTo, getFrom } from "./localStorage";
const saveToLocalStorage = function saveTo(todosQueue) {
  const currentTodosQueue = localStorage.getItem("todosQueue");

  if (currentTodosQueue) {
    localStorage.removeItem("todosQueue");
  }
  localStorage.setItem("todosQueue", JSON.stringify(todosQueue));
};

const getFromLocalStorage = function getFrom() {
  const currentTodosQueue = localStorage.getItem("todosQueue");

  return JSON.parse(currentTodosQueue);
};

// console.log(saveToLocalStorage, getFromLocalStorage);

const list = $(".list");
const item = $(".item");
const input = $("#add-input");
const add = $("#add-submit");
const remove = $(".item-remove");
const search = $("#search");
const searchButton = $("#search-button");

// let todos = [];
let todos = [
  {
    text: "Buy milk",
    done: false,
  },
  {
    text: "Play with dog",
    done: true,
  },
];

$(document).ready(function () {
  todos = getFromLocalStorage();
  console.log(todos);
  if (!todos) {
    saveToLocalStorage((todos = []));
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
  console.log(todos);

  list.append(
    `<li class ="item">
        <span class ="item-text">${target}</span>` +
      `<button class="item-remove">Удалить</button>
      </li>`
  );

  $(".item-remove").bind("click", removeTodo);
  $(".item").bind("click", isComplete);

  input.val("");
}

function removeTodo(event) {
  event.preventDefault();

  const target = $(event.target);

  todos = todos.filter(
    (todo) => todo.text !== target.parent()[0].firstElementChild.innerText
  );

  saveToLocalStorage(todos);
  console.log(todos);

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
  console.log(todos);

  const findItem = todos.filter((todo) => {
    if (todo.text.includes(target)) {
      return todo;
    }
  });

  renderList(findItem);
  $(".mbox").append(`<button class="goBack">Вернуться</button>`);
  $(".goBack").bind("click", isBack);

  search.val("");
}

function renderList(array) {
  $(".list .item").remove();
  $(".goBack").remove();

  const template = array.map(
    ({ done, text }) =>
      `<li class ="item">
        <span class ="item-text ${done ? "done" : ""}">${text}</span>` +
      `<button class="item-remove">Удалить</button>
      </li>`
  );

  list.append(template);

  $(".item-remove").bind("click", removeTodo);
  $(".item").bind("click", isComplete);
}

function isBack(event) {
  event.preventDefault();

  renderList(todos);
}
