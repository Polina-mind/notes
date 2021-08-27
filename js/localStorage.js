const saveTo = function saveToLocalStorage(todosQueue) {
  const currentTodosQueue = localStorage.getItem("todosQueue");

  if (currentTodosQueue) {
    localStorage.removeItem("todosQueue");
  }
  localStorage.setItem("todosQueue", JSON.stringify(todosQueue));
};

const getFrom = function getFromLocalStorage() {
  const currentTodosQueue = localStorage.getItem("todosQueue");

  return JSON.parse(currentTodosQueue);
};

export { saveTo, getFrom };
