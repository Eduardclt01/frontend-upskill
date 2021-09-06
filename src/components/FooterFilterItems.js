import SingleFilterItem from './SingleFooterItem'

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

export default FooterFilterItems;
