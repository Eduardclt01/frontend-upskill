import React from 'react';
import { AppContext } from "./../AppContext.js";

function SingleFilterItem(props) {
  const appContext = React.useContext(AppContext);

  function onFilterButtonClick(event) {
    appContext.actions.updateSelectedFilter(event.target.getAttribute("data-filter"));
  }

  var baseClassName = "todoapp-filters__item";
  var selectedFilterName = props.selectedFilterName;

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

export default SingleFilterItem;
