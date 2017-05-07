import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import Classnames from 'classnames';

import toggleSidebar from '../actions/sidebar';
import PureComponent from './PureComponent';
import { NAV_ITEMS, MINI_NAV_ITEMS } from '../constants/NavItems';

const navHome = NAV_ITEMS.HOME;
const navAbout = NAV_ITEMS.ABOUT;

const miniNavJobs = MINI_NAV_ITEMS.JOBS;
const miniNavContact = MINI_NAV_ITEMS.CONTACT;
const miniNavCookiePolicy = MINI_NAV_ITEMS.COOKIE_POLICY;
const miniNavModels = MINI_NAV_ITEMS.MODELS;
const miniNavHelp = MINI_NAV_ITEMS.HELP;
const miniNavTerms = MINI_NAV_ITEMS.TERMS;

export default class Sidebar extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    size: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      showBurgerNav: false,
      activeNavLink: navHome,
      overflowActive: false,
      moreButtonActive: false,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 568 && this.props.size === 'contracted') {
        this.props.dispatch(toggleSidebar());
      } else if (this.state.showBurgerNav) {
        this.setState({ showBurgerNav: false });
      }
    });
  }

  componentWillReceiveProps() {
    if (this.props.size === 'expanded') {
      this.setState({
        overflowActive: false,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize');
  }

  getTitleClass() {
    return `sidebar-title sidebar-title-${this.props.size}`;
  }

  getSidebarClass() {
    return `sidebar ${this.props.size}`;
  }

  getNavClassName() {
    const navclass = Classnames('burger-nav', {
      'show-burger-nav': this.state.showBurgerNav,
    });

    return navclass;
  }

  getBurgerClass() {
    const iconClass = Classnames('hamburger', {
      'is-active': this.state.showBurgerNav,
    });

    return iconClass;
  }

  getNavBarTextClasses() {
    return {
      homeClass: `home-text-${this.props.size}`,
      aboutClass: `about-text-${this.props.size}`,
    };
  }

  getActiveMoreState() {
    return this.state.moreButtonActive;
  }

  getMiniNavBarClass() {
    const miniNavPreClass = `mini-nav mini-nav-${this.props.size}`;
    const miniNavClass = Classnames(miniNavPreClass, {
      hidden: this.props.size === 'contracted' && !this.state.overflowActive,
    });

    return miniNavClass;
  }

  getMiniNavBarSize() {
    if (this.props.size === 'expanded') {
      return this.renderMiniNavBar();
    }

    return this.renderMiniNavBarToggle();
  }

  toggleNav() {
    this.setState({
      showBurgerNav: !this.state.showBurgerNav,
    });
  }

  handleNavSelected(selected) {
    this.setState({
      activeNavLink: selected,
      moreButtonActive: false,
      showBurgerNav: false,
    });
  }

  handleNavMoreSelected() {
    this.setState({
      overflowActive: !this.state.overflowActive,
    });
  }

  handleMiniNavSelected(selected) {
    this.setState({
      activeNavLink: selected,
      overflowActive: false,
      moreButtonActive: true,
      showBurgerNav: false,
    });
  }

  renderMiniNavBar() {
    return (
      <div id="mini-nav" className={this.getMiniNavBarClass()}>
        <NavLink
            activeClassName="active"
            onClick={() => this.handleMiniNavSelected(miniNavContact)}
            className="mini-nav-link"
            to="/contact">
          Contact
        </NavLink>
        <NavLink
            activeClassName="active"
            onClick={() => this.handleMiniNavSelected(miniNavJobs)}
            className="mini-nav-link"
            to="/jobs">
          Jobs
        </NavLink>
        <NavLink
            activeClassName="active"
            onClick={() => this.handleMiniNavSelected(miniNavCookiePolicy)}
            className="mini-nav-link"
            to="/cookiepolicy">
          Cookie Policy
        </NavLink>
        <NavLink
            activeClassName="active"
            onClick={() => this.handleMiniNavSelected(miniNavHelp)}
            className="mini-nav-link"
            to="/help">
          Help
        </NavLink>
        <NavLink
            activeClassName="active"
            onClick={() => this.handleMiniNavSelected(miniNavTerms)}
            className="mini-nav-link"
            to="/terms">
          Terms
        </NavLink>
        <NavLink
            activeClassName="active"
            onClick={() => this.handleMiniNavSelected(miniNavModels)}
            className="mini-nav-link"
            to="/models">
          Models
        </NavLink>
      </div>
    );
  }

  renderMiniNavBarToggle() {
    return (
      <div>
        <Button className="nav-link" active={this.getActiveMoreState()} onClick={() => this.handleNavMoreSelected()}>
          +
        </Button>
        { this.renderMiniNavBar() }
      </div>
    );
  }

  renderNavBar() {
    const { homeClass, aboutClass } = this.getNavBarTextClasses();

    return (
      <div>
        <button
            id="hamburger-11"
            onClick={() => this.toggleNav()}
            className={this.getBurgerClass()}>
          <span className="line" />
          <span className="line" />
          <span className="line" />
        </button>
        <div className={this.getNavClassName()}>
          <div id="big-nav">
            <NavLink
                exact
                activeClassName="active"
                onClick={() => this.handleNavSelected(navHome)}
                className="nav-link"
                to="/">
              <div className={homeClass} />
            </NavLink>
            <NavLink
                activeClassName="active"
                onClick={() => this.handleNavSelected(navAbout)}
                className="nav-link"
                to="/about">
              <div className={aboutClass} />
            </NavLink>
          </div>
          { this.getMiniNavBarSize() }
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={this.getSidebarClass()}>
        <div className="sidebar-logo">
          <div className={this.getTitleClass()} />
        </div>
        <span className="separator" />
        { this.renderNavBar() }
      </div>
    );
  }
}
