import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'

import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {IoCloseCircleOutline} from 'react-icons/io5'

import './index.css'

class Header extends Component {
  state = {
    showMenu: false,
    showSearchBar: false,
  }

  onClickShowMenu = () => {
    this.setState({showMenu: true})
  }

  onClickSearchIcon = () => {
    this.setState(prevState => ({
      showSearchBar: !prevState.showSearchBar,
    }))
  }

  onClickHideMenu = () => {
    this.setState({showMenu: false})
  }

  onChangeSearchInput = event => {
    const {searchInput} = this.props

    if (event.key === 'Enter') {
      searchInput(event.target.value)
    }
  }

  render() {
    const {showMenu, showSearchBar} = this.state
    const {match} = this.props
    const {path} = match

    let homeMenuTab
    let popularMenuTab
    let accountMenuTab

    switch (path) {
      case '/popular':
        homeMenuTab = 'inactive'
        popularMenuTab = 'active'
        accountMenuTab = 'inactive'
        break
      case '/profile':
        homeMenuTab = 'inactive'
        popularMenuTab = 'inactive'
        accountMenuTab = 'active'
        break
      default:
        homeMenuTab = 'active'
        popularMenuTab = 'inactive'
        accountMenuTab = 'inactive'
        break
    }

    return (
      <nav className="navbar-container">
        <div className="nav-elements-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dtv22dsxc/image/upload/v1719125947/Group_7399_tgj3eh.png"
              alt="website logo"
              className="header-logo"
            />
          </Link>
          <ul className="nav-list-items">
            <Link to="/" className="nav-link">
              <li className={`nav-heading ${homeMenuTab}`}>Home</li>
            </Link>

            <Link to="/popular" className="nav-link">
              <li className={`nav-heading ${popularMenuTab}`}>Popular</li>
            </Link>
          </ul>

          <div className="search-container">
            {showSearchBar && (
              <input
                type="search"
                onKeyDown={this.onChangeSearchInput}
                placeholder="Search"
                className="search"
              />
            )}
            <Link to="/search">
              <button
                type="button"
                className="search-btn"
                testid="searchButton"
              >
                <HiOutlineSearch
                  size={20}
                  color="#ffffff"
                  testid="searchButton"
                  onClick={this.onClickSearchIcon}
                />
              </button>
            </Link>

            <Link to="/account">
              <img
                src="https://res.cloudinary.com/dtv22dsxc/image/upload/v1719133614/Avatar_bjthok.png"
                alt="profile"
                className={`profile-logo ${accountMenuTab}`}
              />
            </Link>
            <MdMenuOpen
              size={25}
              color="#ffffff"
              className="menu-icon"
              onClick={this.onClickShowMenu}
            />
          </div>
        </div>

        {showMenu && (
          <div>
            <ul className="nav-items-list">
              <Link to="/" className="nav-link">
                <li className={`popup-heading ${homeMenuTab}`}>Home</li>
              </Link>

              <Link to="/popular" className="nav-link">
                <li className={`popup-heading ${popularMenuTab}`}>Popular</li>
              </Link>

              <Link to="/account" className="nav-link">
                <li className={`popup-heading ${accountMenuTab}`}>Account</li>
              </Link>
              <IoCloseCircleOutline
                size={24}
                color="#ffffff"
                className="close-icon"
                onClick={this.onClickHideMenu}
              />
            </ul>
          </div>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
