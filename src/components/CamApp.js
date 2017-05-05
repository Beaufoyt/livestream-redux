import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import PureComponent from './PureComponent';
import CategoryRadioButtons from './CategoryRadioButtons';
import FilterShelf from './FilterShelf';
import CamGrid from './CamGrid';
import { CAM_OPTIONS_PROPERTIES } from 'constants/CamConstants';

class CamApp extends PureComponent {
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

  renderCamGrid(dispatch, cams) {
    const isRequesting = cams.get(CAM_OPTIONS_PROPERTIES.REQUESTING);
    const isRequestingMore = cams.get(CAM_OPTIONS_PROPERTIES.REQUESTING_MORE);

    if (isRequesting) {
      return <div className="loader"/>;
    }

    return <CamGrid dispatch={dispatch} isLoading={isRequesting} isLoadingMore={isRequestingMore} cams={cams} />;
  }

  _getFilterButtonClassName() {
    const base = 'btn btn-default controls-btm filter-toggle';

    return this.state.filterShelfExpanded ? base + ' active' : base;
  }

  render() {
    const { dispatch, cams } = this.props;
    const currentCamCategory = cams.get(CAM_OPTIONS_PROPERTIES.CURRENT_CATEGORY);
    const isRequesting = cams.get(CAM_OPTIONS_PROPERTIES.REQUESTING);
    const isRequestingMore = cams.get(CAM_OPTIONS_PROPERTIES.REQUESTING_MORE);

    return (
      <div className="cam-app-container">
        <div className="filter-controls-bar">
          <CategoryRadioButtons
              isLoading={isRequesting}
              isLoadingMore={isRequestingMore}
              currentCategory={currentCamCategory}
              dispatch={dispatch}/>
          <div className="filter-border" />
          <button
              active={this.state.filterShelfExpanded}
              onClick={this.toggleFilterShelf}
              className={ this._getFilterButtonClassName() }>
              <i className="fa fa-list" aria-hidden="true" />&nbsp;
              Filter
          </button>
        </div>
        <FilterShelf dispatch={dispatch} expanded={this.state.filterShelfExpanded} />
        { this.renderCamGrid(dispatch, cams) }
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.cams });

export default connect(mapStateToProps)(CamApp);
