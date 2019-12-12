import React from 'react';
import './SignIn.css';


class SignIn extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      status: false
    }
  }
  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value});
  }
  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  }

  onSubmitSignIn = () => {
    fetch('https://peaceful-everglades-27236.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id){
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
        else{
          this.setState({status: true});
        }
      });
  }
  onPress = (event) => {
    event.persist();
    if (event.key === 'Enter'){
      this.onSubmitSignIn();
    }
  }
  render(){
    const {onRouteChange} = this.props;
    return(
    <div>
    <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('register')}>Register</p>
        </nav>
        <div className='signin'>
    <article className="br3 ba --black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 sign">
        <main className="pa4 black-80">
  <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f2 fw6 ph0 mh0">Sign In</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input onChange={this.onEmailChange}className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input onKeyPress={this.onPress} onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
      </div>
      {this.state.status === true ? <div className="mt3">
        <label className="db fw6 lh-copy f7 white" htmlFor="password">*Incorrect username /or password</label>
      </div>:<div></div>}
    </fieldset>
    <div className="">
      <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
    </div>
  </div>
</main>
</article>
</div>
</div>);
  }
}
   
export default SignIn ;