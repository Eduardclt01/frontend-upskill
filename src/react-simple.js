console.clear();

var React = window.React;
var ReactDOM = window.ReactDOM;

function App() {
  // ---------- State ----------
  var [appState, updateAppState] = React.useState({
    todos: [{ id: "12345a", title: "Walk the dog", completed: false }, { id: "12345b", title: "Drink water", completed: true }, { id: "12345c", title: "Buy water", completed: false }],
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

  function updateSelectedFilter(filterName) {
    updateAppState(function(state) {
      return {
        ...state,
        selectedFilterName: filterName
      };
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

  function deleteTodo(todoId) {
    updateAppState(function(state) {
      return {
        ...state,
        todos: state.todos.filter(todo => {
          if (todo.id !== todoId) {
            return todo;
          }
        })
      };
    });
  }

  function updateTodoPosition(fromIndex, toIndex) {
    updateAppState(function(state) {
      const reorderedTodos = state.todos.slice(0);
      const objectToMove = reorderedTodos.splice(fromIndex, 1)[0];
      reorderedTodos.splice(toIndex, 0, objectToMove);

      return {
        ...state,
        todos: reorderedTodos
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

  // ---------- Event Handlers ----------
  function onTodoItemCheckboxChange(e) {
    markTodoAs(e.target.parentNode.getAttribute("data-item-id"), e.target.checked);
  }

  function isValidTodoString(value) {
    return value.trim() !== "" ? true : false;
  }

  function onNewTodoInputFieldKeyUp(event) {
    if (event.which === 13) {
      addNewTodo(event.target.value);
    }
  }

  function onFilterButtonClick(event) {
    updateSelectedFilter(event.target.getAttribute("data-filter"));
  }

  function onToggleAllItemsCompletedStateButtonClick(event) {
    var eventStatus = event.target.getAttribute("data-toggled");
    toggleAllTodosCompletedState(eventStatus);
    event.target.setAttribute("data-toggled", eventStatus === "false" ? "true" : "false");
  }

  function onDeleteAllCompletedTodosButtonClick(event) {
    getUserConfirmation(deleteAllCompletedTodos, "Are you sure you want to delete this item, this cannot be undone");
  }

  function onDeleteTodoClick(todoId) {
    getUserConfirmation(deleteTodo.bind(null, todoId), "Are you sure you want to delete this item, this cannot be undone");
  }

  function getNumberOfActiveTodos() {
    return appState.todos.filter(todo => todo.completed === false).length;
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


  function RemainingTodosCounter(props) {
    var count = getNumberOfActiveTodos();
    var className = "todoapp-footer__remaining-count";

    return (
      <span className={className}>
        {count}
        {count > 1 || count === 0 ? " items left" : " item left"}
      </span>
    );
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

  function SingleFilterItem(props) {
    var baseClassName = "todoapp-filters__item";
    var selectedFilterName = appState.selectedFilterName;

    var filterName = props.filterName;
    var label = props.label;

    var classNameModifiers = [];
    if (selectedFilterName === filterName) {
      classNameModifiers.push("selected");
    }
    var className = baseClassName + " " + classNameModifiers.map(classNameModifier => baseClassName + "--" + classNameModifier).join(" ");

    return (
      <li className={className}>
        <a className="todoapp-filters__item--link" data-filter={filterName} onClick={onFilterButtonClick.bind()} href="#/">
          {label}
        </a>
      </li>
    );
  }

  function FooterFilterItems(props) {
    return (
      <section className="todoapp-footer-filters">
        <ul className="todoapp-filters">
          <SingleFilterItem label="All" filterName=""></SingleFilterItem>

          <SingleFilterItem label="Active" filterName="active"></SingleFilterItem>

          <SingleFilterItem label="Completed" filterName="completed"></SingleFilterItem>
        </ul>
      </section>
    );
  }

  // --- Drag start
  let draggingItemIndex = null;
  let dragOverItemIndex = null;

  function onTodoListItemDragStart(e, position) {
    e.target.style.cursor = "grab";
    draggingItemIndex = position;
  }

  function onTodoListItemDragEnter(e, position) {
    dragOverItemIndex = position;

    e.target.style.cursor = "grabbing";
    var item = document.getElementsByClassName('todoapp-list')[0].children[dragOverItemIndex]
    item.classList.add("border-bottom");
  }

  function onTodoListItemDragEnd(e) {
    e.target.style.cursor = "default";
    updateTodoPosition(draggingItemIndex, dragOverItemIndex);
    draggingItemIndex = null;
    dragOverItemIndex = null;
  }

  function onTodoListItemDragLeave(e, position) {
    var item = document.getElementsByClassName('todoapp-list')[0].children[position]
    item.classList.remove("border-bottom");
  }
  // --- Drag end

  function TodoListItem(props) {
    return (
      <li
        className="todo-list-item"
        onDragEnter={e => onTodoListItemDragEnter(e, props.index)}
        onDragEnd={onTodoListItemDragEnd}
        onDragStart={e => onTodoListItemDragStart(e, props.index)}
        onDragLeave={e => onTodoListItemDragLeave(e, props.index)}
        draggable
        data-completed={props.todo.completed}
        data-item-id={props.todo.id}
      >
        <input className="todo-list-item__toggle" onChange={onTodoItemCheckboxChange} checked={props.todo.completed} type="checkbox" aria-label="Toggle" />
        <label className="todo-list-item__title" aria-label="Title">
          {props.todo.title}
        </label>
        <button className="todo-list-item__delete" aria-label="Delete" onClick={onDeleteTodoClick.bind(null, props.todo.id)}>
          ✕
        </button>
      </li>
    );
  }

  function TodoList(props) {
    return (
      <ul className="todoapp-list">
        {props.todoItems.map((todo, index) => (
          <TodoListItem todo={todo} key={todo.id} index={index}></TodoListItem>
        ))}
      </ul>
    );
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
          <RemainingTodosCounter></RemainingTodosCounter>

          <FooterFilterItems></FooterFilterItems>

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
