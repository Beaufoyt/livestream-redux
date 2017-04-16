import React, { PropTypes } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
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
    size: PropTypes.string.isRequired,
  }

  getSiteTitle() {
    return this.props.size === 'expanded' ? 'React Live' : 'R';
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

  getNavBarText() {
    if (this.props.size === 'expanded') {
      return { NavTitle1: 'NavItem 1', NavTitle2: 'NavItem 2' };
    } else {
      return { NavTitle1: '1', NavTitle2: '2' };
    }
  }

  getNavBar() {
    const { NavTitle1, NavTitle2} = this.getNavBarText();

    return (
      <div>
        <button className="btn btn-success burger-menu" onClick={() => this.toggleNav()}>Menu</button>
        <Nav className={this.getNavClassName()} bsStyle="pills" stacked activeKey={1}>
          <NavItem eventKey={1} href="#">{NavTitle1}</NavItem>
          <NavItem eventKey={2} title="Item">{NavTitle2}</NavItem>
        </Nav>
      </div>
    );
  }

  render() {
    return (
      <div className={ this.getSidebarClass() }>
        <div className="sidebar-logo">
          <h2 className="sidebar-title">{this.getSiteTitle()}</h2>
        </div>
        { this.getNavBar() }
      </div>
    );
  }
}
