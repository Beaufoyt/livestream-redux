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

class App extends PureComponent {

  static propTypes = {
    activeFilter: PropTypes.string.isRequired,
    todoList: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    numberList: PropTypes.object.isRequired,
    overlays: PropTypes.object.isRequired,
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

  render() {
    const { dispatch, activeFilter, todoList, numberList } = this.props;
    return (
      <div className="app">
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
    );
  }
}

const mapStateToProps = state => ({ ...state.todos, ...state.overlays });

export default connect(mapStateToProps)(App);
