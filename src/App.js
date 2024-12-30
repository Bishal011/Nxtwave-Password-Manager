import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './App.css'

const colorsList = ['yellow', 'green', 'blue', 'orange', 'brown']

class App extends Component {
  state = {
    isTrue: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  listenWebsite = event => {
    this.setState({website: event.target.value})
  }

  listenUsername = event => {
    this.setState({username: event.target.value})
  }

  listenPassword = event => {
    this.setState({password: event.target.value})
  }

  addContents = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initialInput = website.slice(0, 1).toUpperCase()
    const classValue = colorsList[Math.floor(Math.random() * 5)]

    const newValues = {
      id: uuidv4(),
      initialvalue: initialInput,
      websiteName: website,
      username: username,
      password: password,
      classAdd: classValue,
    }

    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValues],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({
      latestList: newList,
      isTrue: caseOf,
    })
  }

  render() {
    const {website, username, password, latestList, isShow, searchInput} =
      this.state
    let isTrue = this.state

    const newList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase())
    )

    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="bg-container">
        <img
          className="img1"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />

        <div className="parent1">
          <img
            className="img2"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />

          <form className="add-details" onSubmit={this.addContents}>
            <h1 className="head1">Add New Password</h1>

            <div className="input-container">
              <img
                className="img3"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                className="input1"
                placeholder="Enter Website"
                onChange={this.listenWebsite}
                value={website}
              />
            </div>

            <div className="input-container">
              <img
                className="img3"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                className="input1"
                placeholder="Enter Username"
                onChange={this.listenUsername}
                value={username}
              />
            </div>

            <div className="input-container">
              <img
                className="img3"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                className="input1"
                placeholder="Enter Password"
                onChange={this.listenPassword}
                value={password}
              />
            </div>

            <button type="submit" className="button1">
              Add
            </button>
          </form>

          <img
            className="img4"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
        </div>

        <div className="parent2">
          <div className="child1">
            <div className="your-password-container">
              <h1 className="head2">Your Passwords</h1>
              <p className="para1">{newList.length}</p>
            </div>

            <div className="search-container">
              <img
                className="img3"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                className="input1"
                placeholder="Search"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>

          <hr />
          <div className="show-password-container">
            <input
              type="checkbox"
              className="input2"
              id="check"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="label1">
              Show Passwords
            </label>
          </div>

          {!isTrue && (
            <div className="empty-state">
              <img
                className="img5"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p className="para2">No Passwords</p>
            </div>
          )}

          {isTrue && (
            <ul className="result-container">
              {newList.map(eachValue => (
                <li
                  className="password-list"
                  id={eachValue.id}
                  key={eachValue.id}
                >
                  <p className={`initial ${eachValue.classAdd}`}>
                    {eachValue.initialvalue}
                  </p>

                  <div className="list-items">
                    <p className="para3">{eachValue.websiteName}</p>
                    <p className="para3">{eachValue.username}</p>

                    {!isShow && (
                      <img
                        className="img6"
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                      />
                    )}

                    {isShow && <p className="para3">{eachValue.password}</p>}
                  </div>

                  <button
                    type="button"
                    className="button2"
                    onClick={() => this.deleteItem(eachValue.id)}
                    data-testid="delete"
                  >
                    <img
                      className="img7"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
