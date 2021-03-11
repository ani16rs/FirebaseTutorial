import React, { Component } from 'react';
import { auth, createUserProfileDocument } from '../firebase';


class SignUp extends Component {
  state = { displayName: '', email: '', password: '' };

  handleChange = event => {
    const { name, value } = event.target; 
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password, displayName } = this.state;
  
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      // Create new user, signs in, returns a Promise of userCredentials.
      // Notice that we only used an email and a password, but not a 'displayName'... To fix that, 
      
      // NOT THIS: user.updateProfile({displayName}) - you'll have to refresh the page to get the name to show up.
      // If the user exist, and has some data stored in their doc, then fetch that.
      // New user created, but only with an email & password; now add the 'additional data' like display name.
      createUserProfileDocument(user, { displayName });
    } 
    catch (error) {
      console.log('oops');
      console.log(error);
    }

    this.setState({ displayName: '', email: '', password: '' });
  };

  render() {
    const { displayName, email, password } = this.state;

    return (
      <form className="SignUp" onSubmit={this.handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="text"
          name="displayName"
          placeholder="Display Name"
          value={displayName}
          onChange={this.handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.handleChange}
        />
        <input type="submit" value="Sign Up" />
      </form>
    );
  }
}

export default SignUp;
