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

  add.click(addTodo);
  searchButton.click(searchText);
});

function addTodo(event) {
  event.preventDefault();
  const target = input.val();

  if (!target) {
    return;
  }

  todos = getFromLocalStorage();

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

  input.val("");
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

  $(".goBack").remove();
  $(".mbox").append(`<button class="goBack">Вернуться</button>`);
  $(".goBack").unbind("click").bind("click", isBack);

  search.val("");
}

function isBack() {
  $(".goBack").remove();

  todos = getFromLocalStorage();
  renderList(todos);
}

function renderList(array) {
  list.children().remove();

  const template = array.map(
    ({ done, text }) =>
      `<li class ="item">
        <span class ="item-text ${done ? "done" : ""}">${text}</span>` +
      `<button class="item-remove">Удалить</button>
      </li>`
  );

  list.append(template);

  list.unbind("click").bind("click", (event) => {
    event.preventDefault();

    if (event.target.nodeName === "SPAN") {
      isComplete(event);
    }
    if (event.target.nodeName === "BUTTON") {
      removeTodo(event);
    }
  });
}

function removeTodo(event) {
  const target = $(event.target);

  todos = getFromLocalStorage();

  for (let i = 0; i < todos.length; i += 1) {
    if (todos[i].text === target.parent()[0].firstElementChild.innerText) {
      todos.splice(i, 1);
      break;
    }
  }

  saveToLocalStorage(todos);

  target.parent().remove();
}

function isComplete(event) {
  event.preventDefault();

  const target = $(event.target);

  todos = getFromLocalStorage();

  for (let i = 0; i < todos.length; i += 1) {
    if (todos[i].text === target.html()) {
      todos[i].done = todos[i].done ? false : true;
      break;
    }
  }

  saveToLocalStorage(todos);

  target.toggleClass("done");
}

const saveToLocalStorage = function saveTo(todosQueue) {
  localStorage.setItem("todosQueue", JSON.stringify(todosQueue));
};

const getFromLocalStorage = function getFrom() {
  const currentTodosQueue = localStorage.getItem("todosQueue");
  return JSON.parse(currentTodosQueue);
};
