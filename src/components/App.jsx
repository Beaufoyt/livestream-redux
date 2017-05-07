import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import PureComponent from './PureComponent';
import Header from './Header';
import Sidebar from './Sidebar';
import CamApp from './CamApp';
import Overlays from './Overlays';

const About = () => <h1 className="about">This is the about page</h1>;
const Terms = () => <h1 className="terms">This is the terms page</h1>;
const CookiePolicy = () => <h1 className="cookie-policy">This is the cookie policy page</h1>;
const Jobs = () => <h1 className="jobs">This is the jobs page</h1>;
const Contact = () => <h1 className="contact">This is the contact page</h1>;
const Models = () => <h1 className="models">This is the models page</h1>;
const Help = () => <h1 className="help">This is the help page</h1>;

class App extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebar: PropTypes.instanceOf(Object).isRequired,
    auth: PropTypes.instanceOf(Object).isRequired,
  }

  getSidebarSize() {
    return this.props.sidebar.getIn(['sidebar', 'size']);
  }

  getMainPadClass() {
    return `header-content sidebar-pad-${this.getSidebarSize()}`;
  }

  render() {
    const { dispatch, auth } = this.props;
    const sidebarSize = this.getSidebarSize();

    return (
      <div className="app">
        <Sidebar dispatch={dispatch} size={sidebarSize} />
        <div id="header-content-container" className={this.getMainPadClass()}>
          <Header dispatch={dispatch} sidebarSize={sidebarSize} />
          <Route exact path="/" component={CamApp} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/jobs" component={Jobs} />
          <Route path="/cookiepolicy" component={CookiePolicy} />
          <Route path="/terms" component={Terms} />
          <Route path="/models" component={Models} />
          <Route path="/help" component={Help} />
          <Overlays auth={auth} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.auth, ...state.sidebar, ...state.cams });

export default withRouter(connect(mapStateToProps)(App));
