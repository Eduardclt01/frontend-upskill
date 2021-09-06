function RemainingTodosCounter(props) {
  function getNumberOfActiveTodos() {
    return appState.todos.filter(todo => todo.completed === false).length;
  }


  var count = getNumberOfActiveTodos();
  var className = "todoapp-footer__remaining-count";

  return (
    <span className={className}>
      {count}
      {count > 1 || count === 0 ? " items left" : " item left"}
    </span>
  );
}

export default RemainingTodosCounter;
