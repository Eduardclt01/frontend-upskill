import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/TodoList'
import FooterFilterItems from './components/FooterFilterItems'
import RemainingTodosCounter from './components/RemainingTodosCounter'

function App() {
  // ---------- State ----------
  var [appState, updateAppState] = React.useState({
    // todos: [{ id: "12345a", title: "Walk the dog", completed: false }, { id: "12345b", title: "Drink water", completed: true }, { id: "12345c", title: "Buy water", completed: false }],
    todos: [],
    selectedFilterName: "",
    searchString: "",
    colorMode: 'dark',
    availableThemes: [
      { id: 'default', label: "Default" },
      { id: 'dark', label: "Midnight" },
      { id: 'sunset', label: "Orange" }
    ]
  });

  // ---------- Business Logic ----------

  function addNewTodo(title) {
    if (isValidTodoString(title)) {
      updateAppState(function(state) {
        return {
          ...state,
          todos: [
            {
              id: String(Math.round(Math.random() * 100000)),
              title: title,
              completed: false
            },
            ...state.todos
          ]
        };
      });
    }
  }

  function markTodoAs(todoID, isCompleted) {
    updateAppState(function(state) {
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === todoID) {
            todo.completed = isCompleted;
          }
          return todo;
        })
      };
    });
  }

  function toggleAllTodosCompletedState(status) {
    appState.todos.forEach(todo => {
      markTodoAs(todo.id, status === "true" ? false : true);
    });
  }

  function deleteAllCompletedTodos() {
    updateAppState(function(state) {
      return {
        ...state,
        todos: state.todos.filter(todo => {
          if (todo.completed === false) {
            return todo;
          }
        })
      };
    });
  }


  function getUserConfirmation(operation, message) {
    if (confirmOperation(message)) {
      operation();
    }
  }

  function confirmOperation(message) {
    return window.confirm(message);
  }

  function getNumberOfActiveTodos() {
    return appState.todos.filter(todo => todo.completed === false).length;
  }

  // ---------- Event Handlers ----------

  function isValidTodoString(value) {
    return value.trim() !== "" ? true : false;
  }

  // ------ dont think we use this ------
  // function onNewTodoInputFieldKeyUp(event) {
  //   if (event.which === 13) {
  //     addNewTodo(event.target.value);
  //   }
  // }

  function onToggleAllItemsCompletedStateButtonClick(event) {
    var eventStatus = event.target.getAttribute("data-toggled");
    toggleAllTodosCompletedState(eventStatus);
    event.target.setAttribute("data-toggled", eventStatus === "false" ? "true" : "false");
  }

  function onDeleteAllCompletedTodosButtonClick(event) {
    getUserConfirmation(deleteAllCompletedTodos, "Are you sure you want to delete this item, this cannot be undone");
  }

  function clearInput(element) {
    element.value = "";
  }

  function onNewTodoSubmit(event) {
    addNewTodo(event.target.newTodo.value);
    clearInput(event.target.newTodo);
    event.preventDefault();
  }

  function onSearchBoxChange(event) {
    setSearchString(event.target.value);
  }

  function setSearchString(string) {
    updateAppState(function(state) {
      return {
        ...state,
        searchString: string
      };
    });
  }

  function getFilteredTodoList() {
    return appState.todos.filter(function(todo) {
      if (appState.searchString.length > 0 && todo.title.toLowerCase().includes(appState.searchString.toLowerCase())){
        return true;
      } else if (appState.searchString.length == 0){
        if (appState.selectedFilterName === "") {
          return true;
        } else if (appState.selectedFilterName === "active" && todo.completed === false) {
          return true;
        } else if (appState.selectedFilterName === "completed" && todo.completed === true) {
          return true;
        } else {
          return false;
        }
      }
    });
  }

  function onDarkModeInput(event) {
    setDarkModeClass(event.target.value);
  }

  function setDarkModeClass(colorMode) {
    updateAppState(function(state) {
      return {
        ...state,
        colorMode: colorMode
      };
    });
  }

  // ---------- UI ----------
  return (
    <div className={"todoapp " + appState.colorMode}>
      <section className="todoapp-header__theme-switcher-container">
        <label className="todoapp-header__theme-switcher-container--label">Theme</label>
        <select value={appState.colorMode} onChange={onDarkModeInput} name="themeSwitcher">
          <option value="default">Default</option>
          <option value="dark">Dark</option>
          <option value="sunset">Sunset</option>
        </select>
      </section>

      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp--card">
        <header className="todoapp-header">
          <form className="todoapp-header__search-form">
            <input className="todoapp-header__search-input" placeholder="Search" onChange={onSearchBoxChange.bind()}></input>
          </form>
          <form onSubmit={onNewTodoSubmit}>
            <input name="newTodo" className="todoapp-header__new-todo-input" placeholder="What needs to be done?" />
            <label aria-label="Mark all as complete" data-toggled="false" onClick={onToggleAllItemsCompletedStateButtonClick.bind()} className="todoapp-toggle-all-items-complete-button">
              ✓
            </label>
            <button className="todoapp-header__submit-btn" type="submit" value="Submit"></button>
          </form>
        </header>

        <section className="todoapp-main">
          <TodoList todoItems={getFilteredTodoList()}></TodoList>
        </section>

        <footer className="todoapp-footer">
          <RemainingTodosCounter remainingCount={getNumberOfActiveTodos()} ></RemainingTodosCounter>

          <FooterFilterItems selectedFilterName={appState.selectedFilterName}></FooterFilterItems>

          <button className="todoapp-clear-completed-items-button" onClick={onDeleteAllCompletedTodosButtonClick}>
            Clear completed
          </button>
        </footer>
      </div>

      <br />

      <pre>{JSON.stringify(appState, null, 2)}</pre>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.body
);
