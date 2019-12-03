import React from 'react';
import './App.css';
import axios from 'axios'
import GitHubCard from './components/GitHubCard'
import GitHubFollowers from './components/GitHubFollowers'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      followers: [],
      followerLogins: [],
      searchUser: ""
    }
  }

  componentDidMount() {
    axios.get('https://api.github.com/users/DustinG98')
      .then(res => {
        this.setState({ user: res.data })
      })
      .catch(err => console.log(err))
    axios.get('https://api.github.com/users/DustinG98/followers') 
      .then(res => {
        const newFollowerLogins = res.data.map(follower => follower.login);
        this.setState({ followers: res.data, followerLogins: newFollowerLogins })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.searchUser !== this.state.searchUser) {
      axios.get(`https://api.github.com/users/${this.state.searchUser}`)
        .then(res => this.setState({ user: res.data }))
    } 
    if(prevState.followerLogins !== this.state.followerLogins) {
      const newFollowers = [];
      this.state.followerLogins.forEach(follower => {
        axios.get(`https://api.github.com/users/${follower}`)
          .then(res => {
            newFollowers.push(res.data)
            this.setState({followers: newFollowers})
          })
          console.log(newFollowers)
      })
    }
  }
  
  handleChanges = (e) => {
    this.setState({ searchUser: e.target.value })
  }

  fetchFollowers = e => {
    e.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.searchUser}/followers`)
      .then(res => {
        const newFollowerLogins = res.data.map(follower => follower.login);
        this.setState({ followers: res.data, followerLogins: newFollowerLogins })
      })
  }

  render() {
    return (
      <div className="App">
        {console.log(this.state.searchUser)}
        <div className="searchUser">
          <form>
            <input type="text" name="user" value={this.state.searchUser} onChange={this.handleChanges}/>
            <button onClick={e => this.fetchFollowers(e)}>{`Fetch ${this.state.user.login}'s Followers`}</button>
          </form>
        </div>
        <div className="cardsCont">
          <GitHubCard user={this.state.user} />
          <div className="cards">
            <h2 style={{fontSize: '2rem'}}>{`${this.state.user.login}'s Followers`}</h2>
            <GitHubFollowers followers={this.state.followers} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
