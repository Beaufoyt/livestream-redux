import React, { PropTypes } from 'react';
import PureComponent from './PureComponent';
import { connect } from 'react-redux';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import { showOverlay } from 'actions/todos';
import Footer from './Footer';
import ItemList from './ItemList';
import RegisterOverlay from './RegisterOverlay';
import OtherOverlay from './OtherOverlay';
import Header from './Header';
import Sidebar from './Sidebar';

class App extends PureComponent {

  static propTypes = {
    activeFilter: PropTypes.string.isRequired,
    todoList: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    numberList: PropTypes.object.isRequired,
    overlays: PropTypes.object.isRequired,
    sidebar: PropTypes.object.isRequired,
  }

  getOverlayStack(dispatch) {
    return [this.isRegisterOverlayVisible() && <RegisterOverlay key="registerOverlay" dispatch={ dispatch }/>,
          this.isOtherOverlayVisible() && <OtherOverlay key="otherOverlay" dispatch={ dispatch } />,
    ];
  }

  isRegisterOverlayVisible() {
    return this.props.overlays.getIn(['overlays', 'registerOverlay', 'isVisible']);
  }

  isOtherOverlayVisible() {
    return this.props.overlays.getIn(['overlays', 'otherOverlay', 'isVisible']);
  }

  getSidebarSize() {
    return this.props.sidebar.getIn(['sidebar', 'size']);
  }

  getMainPadClass() {
    return `header-content sidebar-pad-${this.props.sidebar.getIn(['sidebar', 'size'])}`;
  }

  render() {
    const { dispatch, activeFilter, todoList, numberList } = this.props;
    return (
      <div className="app">
        <Sidebar size={ this.getSidebarSize() } dispatch={dispatch} />
        <div className={ this.getMainPadClass() }>
          <Header dispatch={dispatch} />
          <button className="btn btn-success pull-right" onClick={() => dispatch(showOverlay('registerOverlay'))}>
            Show Overlay
          </button>
          <button className="btn btn-success pull-right" onClick={() => dispatch(showOverlay('otherOverlay'))}>
            Show Other Overlay
          </button>
          { this.getOverlayStack(dispatch) }
          <div className="todos">
            <h1>ToDo App</h1>
            <AddTodo dispatch={dispatch} />
            <TodoList dispatch={dispatch} activeFilter={activeFilter} todoList={todoList} />
            <Footer dispatch={dispatch} activeFilter={activeFilter} />
            <ItemList dispatch={dispatch} numberList={numberList} />
          </div>
          <small className="signature">by <b>Ivan Rogić</b> from <b>Toptal</b></small>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.todos, ...state.overlays, ...state.sidebar });

export default connect(mapStateToProps)(App);
