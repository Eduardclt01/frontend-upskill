import React from 'react';

function onTodoItemCheckboxChange(e) {
  markTodoAs(e.target.parentNode.getAttribute("data-item-id"), e.target.checked);
}

function onDeleteTodoClick(todoId) {
  getUserConfirmation(deleteTodo.bind(null, todoId), "Are you sure you want to delete this item, this cannot be undone");
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

function TodoListItem(props){
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

export default TodoListItem;
