import React from 'react';

function RemainingTodosCounter(props) {
  var count = props.remainingCount
  var className = "todoapp-footer__remaining-count";

  return (
    <span className={className}>
      {count}
      {count > 1 || count === 0 ? " items left" : " item left"}
    </span>
  );
}

export default RemainingTodosCounter;
