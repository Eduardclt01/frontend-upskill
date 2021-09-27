import React from "react";

import { AppContext } from "./../AppContext.js";
import { getUserConfirmation } from "./../utils.js";
import TodoList from "./TodoList";
import FooterFilterItems from "./FooterFilterItems";
import RemainingTodosCounter from "./RemainingTodosCounter";

function App() {
  const appContext = React.useContext(AppContext);

  function onToggleAllItemsCompletedStateButtonClick(event) {
    var eventStatus = event.target.getAttribute("data-toggled");
    toggleAllTodosCompletedState(eventStatus);
    event.target.setAttribute("data-toggled", eventStatus === "false" ? "true" : "false");
  }

  function onDeleteAllCompletedTodosButtonClick(event) {
    getUserConfirmation(appContext.actions.deleteAllCompletedTodos, "Are you sure you want to delete this item, this cannot be undone");
  }

  function clearInput(element) {
    element.value = "";
  }

  function onNewTodoFormSubmit(event) {
    appContext.actions.addNewTodo(event.target.newTodo.value);
    clearInput(event.target.newTodo);
    event.preventDefault();
  }

  function onDarkModeInput(event) {
    appContext.actions.setDarkModeClass(event.target.value);
  }

  function onSearchBoxChange(event) {
    appContext.actions.setSearchString(event.target.value);
  }

  return (
    <div className={"todoapp " + appContext.state.colorMode}>
      <section className="todoapp-header__theme-switcher-container">
        <label className="todoapp-header__theme-switcher-container--label">
          Theme
        </label>
        <select value={appContext.state.colorMode} onChange={onDarkModeInput} name="themeSwitcher">
          <option value="default">Default</option>
          <option value="dark">Dark</option>
          <option value="sunset">Sunset</option>
        </select>
      </section>

      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp--card">
        <header className="todoapp-header">
          <form className="todoapp-header__search-form">
            <input className="todoapp-header__search-input" placeholder="Search" onChange={onSearchBoxChange}></input>
          </form>
          <form onSubmit={onNewTodoFormSubmit}>
            <input name="newTodo" className="todoapp-header__new-todo-input" placeholder="What needs to be done?" />
            <label aria-label="Mark all as complete" data-toggled="false" onClick={onToggleAllItemsCompletedStateButtonClick} className="todoapp-toggle-all-items-complete-button">
              ✓
            </label>
            <button className="todoapp-header__submit-btn" type="submit" value="Submit"></button>
          </form>
        </header>

        <section className="todoapp-main">
          <TodoList items={appContext.actions.getFilteredTodos(appContext)}></TodoList>
        </section>

        <footer className="todoapp-footer">
          <RemainingTodosCounter remainingCount={appContext.actions.getNumberOfActiveTodos()} ></RemainingTodosCounter>

          <FooterFilterItems selectedFilterName={appContext.state.selectedFilterName}></FooterFilterItems>

          <button className="todoapp-clear-completed-items-button" onClick={onDeleteAllCompletedTodosButtonClick}>
            Clear completed
          </button>
        </footer>
      </div>

      <br />

      <pre>{JSON.stringify(appContext.state, null, 2)}</pre>
    </div>
  );
}

export default App;
