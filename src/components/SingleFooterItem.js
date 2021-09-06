function SingleFilterItem(props) {

  function onFilterButtonClick(event) {
    updateSelectedFilter(event.target.getAttribute("data-filter"));
  }

  function updateSelectedFilter(filterName) {
    updateAppState(function(state) {
      return {
        ...state,
        selectedFilterName: filterName
      };
    });
  }

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

export default SingleFilterItem;
