import React, { PropTypes } from 'react';

import PureComponent from './PureComponent';
import CategoryRadioButtons from './CategoryRadioButtons';
import FilterShelf from './FilterShelf';

export default class CamApp extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filterShelfExpanded: false,
    };

    this.toggleFilterShelf = this.toggleFilterShelf.bind(this);
  }

  toggleFilterShelf() {
    this.setState({
      filterShelfExpanded: !this.state.filterShelfExpanded,
    });
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    cams: PropTypes.object.isRequired,
  }

  render() {
    const { dispatch, cams } = this.props;
    const currentCamCategory = cams.getIn(['currentCategory']);

    return (
      <div id="cam-app-container">
        <div className="filter-controls-bar">
          <CategoryRadioButtons currentCategory={currentCamCategory} dispatch={dispatch}/>
          <button onClick={this.toggleFilterShelf} className="btn btn-default pull-right controls-btm">Filter</button>
        </div>
        <FilterShelf expanded={this.state.filterShelfExpanded}/>
        <ul className="user-list">
          { this.props.cams.getIn(['cams']).map(number => {
            return (
              <li key={ number.getIn(['name']) } className="user-item">
                <div>{ number.getIn(['name']) } { number.getIn(['category']) }</div>
              </li>
            );
          }) }
        </ul>
      </div>
    );
  }
}
