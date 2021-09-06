import React from 'react';
import SingleFilterItem from './SingleFooterItem'

function FooterFilterItems(props) {
  return (
    <section className="todoapp-footer-filters">
      <ul className="todoapp-filters">
        <SingleFilterItem selectedFilterName={props.selectedFilterName} label="All" filterName=""></SingleFilterItem>

        <SingleFilterItem selectedFilterName={props.selectedFilterName} label="Active" filterName="active"></SingleFilterItem>

        <SingleFilterItem selectedFilterName={props.selectedFilterName} label="Completed" filterName="completed"></SingleFilterItem>
      </ul>
    </section>
  );
}

export default FooterFilterItems;
