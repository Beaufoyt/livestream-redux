import React from 'react';
import PropTypes from 'prop-types';

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

  getNavBarTextClasses() {
    return {
      homeClass: `home-text-${this.props.size}`,
      aboutClass: `about-text-${this.props.size}`,
    };
  }

  getActiveState(id) {
    return id === this.state.activeNavLink;
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

  getBurgerClass() {
    const iconClass = Classnames('icon', {
      active: this.state.showBurgerNav,
    });

    return iconClass;
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
    });
  }

  renderMiniNavBar() {
    return (
      <div id="mini-nav" className={this.getMiniNavBarClass()}>
        <Button
            active={this.getActiveState(miniNavContact)}
            onClick={() => this.handleMiniNavSelected(miniNavContact)}
            className="mini-nav-link">Contact
        </Button>
        <Button
            active={this.getActiveState(miniNavJobs)}
            onClick={() => this.handleMiniNavSelected(miniNavJobs)}
            className="mini-nav-link">Jobs
        </Button>
        <Button
            active={this.getActiveState(miniNavCookiePolicy)}
            onClick={() => this.handleMiniNavSelected(miniNavCookiePolicy)}
            className="mini-nav-link">Cookie Policy
        </Button>
        <Button
            active={this.getActiveState(miniNavHelp)}
            onClick={() => this.handleMiniNavSelected(miniNavHelp)}
            className="mini-nav-link">Help
        </Button>
        <Button
            active={this.getActiveState(miniNavTerms)}
            onClick={() => this.handleMiniNavSelected(miniNavTerms)}
            className="mini-nav-link">Terms
        </Button>
        <Button
            active={this.getActiveState(miniNavModels)}
            onClick={() => this.handleMiniNavSelected(miniNavModels)}
            className="mini-nav-link">Models
        </Button>
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
        <button id="hamburger-icon" onClick={() => this.toggleNav()} className={this.getBurgerClass()}title="Menu">
          <span className="line line-1" />
          <span className="line line-2" />
          <span className="line line-3" />
        </button>
        <div className={this.getNavClassName()}>
          <div id="big-nav">
            <Button
                className="nav-link"
                active={this.getActiveState(navHome)}
                onClick={() => this.handleNavSelected(navHome)}>
              <div className={homeClass} />
            </Button>
            <Button
                className="nav-link"
                active={this.getActiveState(navAbout)}
                onClick={() => this.handleNavSelected(navAbout)}>
              <div className={aboutClass} />
            </Button>
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
