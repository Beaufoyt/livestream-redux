import React, { PropTypes } from 'react';
import PureComponent from './PureComponent';
import { connect } from 'react-redux';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import { showRegisterOverlay } from 'actions/todos';
import Footer from './Footer';
import ItemList from './ItemList';
import RegisterOverlay from './RegisterOverlay';

class App extends PureComponent {

  static propTypes = {
    activeFilter: PropTypes.string.isRequired,
    todoList: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    numberList: PropTypes.object.isRequired,
    overlays: PropTypes.string.isRequired,
  }

  getOverlayStack(dispatch) {
    return this.props.overlays === 'true' ? <RegisterOverlay dispatch={ dispatch }/> : null;
  }

  render() {
    const { dispatch, activeFilter, todoList, numberList } = this.props;
    return (
      <div className="app">
        <button className="btn btn-success pull-right" onClick={() => dispatch(showRegisterOverlay())}>Show Overlay</button>
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
