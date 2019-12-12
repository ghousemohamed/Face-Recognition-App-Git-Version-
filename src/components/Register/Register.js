import React from 'react';

class Register extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      status: false,
      isValid: ''
    }
  }

  onNameChange = (event) =>{
    this.setState({name: event.target.value});
  }
  onEmailChange = (event) =>{
    this.setState({email: event.target.value});
  }
  onPasswordChange = (event) =>{
    this.setState({password: event.target.value});
  }

  onSubmit = () => {
    // console.log(this.state.name);
    // console.log(this.state.email);
    // console.log(this.state.password);
    this.validateEmail();
    if(this.state.isValid === true){
    fetch('https://peaceful-everglades-27236.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(user => {
        if(user.id){
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
        else{
          this.setState({status: true})
        }
      })
      .catch(err => console.log('Error registering the user')); 
    }
  }
  onPress = (event) => {
    event.persist();
    if (event.key === 'Enter'){
      this.onSubmit();
    }
  }

  validateEmail = () => {
    const address = `https://apilayer.net/api/check?access_key=14d818949910977ee91ba4e9a5d10456&email=${this.state.email}`;
    fetch(address)
      .then(response => response.json())
      .then(data => {
          if(!data.smtp_check){
            this.setState({isValid: false});
          }
          else{
              this.setState({isValid: true});
          }
      })

    
  }

  render(){
    return(
    <div>
            <div className='signin'>
        <article className="br3 ba --black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 sign">
            <main className="pa4 black-80">
      <div className="measure">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f2 fw6 ph0 mh0">Register</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="text">Name</label>
            <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name"/>
          </div>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input onKeyPress={this.onPress} onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
          </div>
          {this.state.status === true ? <div className="mt3">
        <label className="db fw6 lh-copy f7 white" htmlFor="password">*Email address already exists</label>
      </div>:
        this.state.isValid ===false ? 
      <div className="mt3">
        <label className="db fw6 lh-copy f7 white" htmlFor="password">*Email address does not exist</label>
      </div>: <div></div>}
        </fieldset>
        <div className="">
          <input onClick={this.onSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
        </div>
      </div>
    </main>
    </article>
    </div>
    </div>);
}
}

export default Register;