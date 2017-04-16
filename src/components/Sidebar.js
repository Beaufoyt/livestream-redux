import React, { PropTypes } from 'react';
import { Nav, NavItem } from 'react-bootstrap';

import { toggleSidebar } from 'actions/sidebar';
import Classnames from 'classnames';
import PureComponent from './PureComponent';

export default class Sidebar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showBurgerNav: false,
    };
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    size: PropTypes.string.isRequired,
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 568 && this.props.size === 'contracted') {
        this.props.dispatch(toggleSidebar());
      }
    });
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

  toggleNav() {
    this.setState({
      showBurgerNav: !this.state.showBurgerNav,
    });
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

  getNavBar() {
    const { homeClass, aboutClass } = this.getNavBarTextClasses();

    return (
      <div>
        <button className="btn btn-success burger-menu" onClick={() => this.toggleNav()}>Menu</button>
        <Nav className={this.getNavClassName()} bsStyle="pills" stacked activeKey={1}>
          <NavItem eventKey={1} href="#">
            <div className={homeClass} />
          </NavItem>
          <NavItem eventKey={2} href="#">
            <div className={aboutClass} />
          </NavItem>
        </Nav>
      </div>
    );
  }

  render() {
    return (
      <div className={ this.getSidebarClass() }>
        <div className="sidebar-logo">
          <h2 className={ this.getTitleClass() } />
        </div>
        { this.getNavBar() }
      </div>
    );
  }
}
