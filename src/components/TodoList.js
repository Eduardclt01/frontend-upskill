import React from "react";
import TodoListItem from "./TodoListItem";

function TodoList(props) {
  return (
    <ul className="todoapp-list">
      {props.items.map((todo, index) => (
        <TodoListItem todo={todo} key={todo.id} index={index}></TodoListItem>
      ))}
    </ul>
  );
}

export default TodoList;
