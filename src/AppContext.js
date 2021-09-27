import React from "react";

export const AppContext = React.createContext(null);

export const AppContextWrapper = (props) => {
  const [state, setState] = React.useState({
    todos: [],
    selectedFilterName: "",
    searchString: "",
    colorMode: "dark",
    availableThemes: [
      { id: "default", label: "Default" },
      { id: "dark", label: "Midnight" },
      { id: "sunset", label: "Orange" },
    ],
  });

  function addNewTodo(title) {
    if (isValidTodoString(title)) {
      setState(function (state) {
        return {
          ...state,
          todos: [
            {
              id: String(Math.round(Math.random() * 100000)),
              title: title,
              completed: false,
            },
            ...state.todos,
          ],
        };
      });
    }
  }

  function getFilteredTodos(context) {
    if (!context) {
      return [];
    }
    return context.state.todos.filter(function (todo) {
      if (todo.title.toLowerCase().indexOf(context.state.searchString.toLowerCase()) > -1) {
        return true;
      } else {
        return false;
      }
    });
  }

  function markTodoAs(todoID, isCompleted) {
    setState(function (state) {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === todoID) {
            todo.completed = isCompleted;
          }
          return todo;
        }),
      };
    });
  }

  function toggleAllTodosCompletedState(status) {
    state.todos.forEach((todo) => {
      markTodoAs(todo.id, status === "true" ? false : true);
    });
  }

  function deleteAllCompletedTodos() {
    setState(function (state) {
      return {
        ...state,
        todos: state.todos.filter((todo) => {
          if (todo.completed === false) {
            return todo;
          }
        }),
      };
    });
  }

  function getNumberOfActiveTodos() {
    return state.todos.filter((todo) => todo.completed === false).length;
  }

  function isValidTodoString(value) {
    return value.trim() !== "" ? true : false;
  }

  function setSearchString(string) {
    setState(function (state) {
      return {
        ...state,
        searchString: string,
      };
    });
  }

  function updateSelectedFilter(filterName) {
    setState(function(state) {
      return {
        ...state,
        selectedFilterName: filterName
      };
    });
  }

  function setDarkModeClass(colorMode) {
    setState(function (state) {
      return {
        ...state,
        colorMode: colorMode,
      };
    });
  }

  const [actions, setAppActions] = React.useState({
    addNewTodo: addNewTodo,
    markTodoAs: markTodoAs,
    toggleAllTodosCompletedState: toggleAllTodosCompletedState,
    deleteAllCompletedTodos: deleteAllCompletedTodos,
    getNumberOfActiveTodos: getNumberOfActiveTodos,
    isValidTodoString: isValidTodoString,
    setDarkModeClass: setDarkModeClass,
    setSearchString: setSearchString,
    updateSelectedFilter: updateSelectedFilter,
    getFilteredTodos: getFilteredTodos,
  });

  return (
    <AppContext.Provider value={{ state, actions }}>
      {props.children}
    </AppContext.Provider>
  );
};
