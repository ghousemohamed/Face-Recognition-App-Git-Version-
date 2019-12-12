import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
// import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';

// const app = new Clarifai.App({

//   apiKey: 'e78eb15f565544b8a934410717b67d7c'

// });

const particlesOptions ={
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 500
      }
   }
  }
}

class App extends Component{
  constructor(){
    super();
    this.state = {

      input: '',
      imageUrl: '',
      box: [],
      route: 'signin',
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: new Date()
      }
    }
  }
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }
  
  calculateFaceLocation = (data) => {
    const faceArray = data.outputs[0].data.regions;
    const clarifaiFace = faceArray.map(face => face.region_info.bounding_box);
    // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const arrayOfFaces = clarifaiFace.map(face => {
      return {leftCol: face.left_col * width,
              topRow: face.top_row * height,
              rightCol: width - (face.right_col * width),
              bottomRow: height - (face.bottom_row * height)
      }
    });
    return arrayOfFaces;
    
  }


  
  displayFaceBox = (box) => {
    // this.setState({box: box});
    this.setState({box: box})
  }

  onButtonSubmit = () =>{
    this.setState({box: []});
    this.setState({imageUrl: this.state.input})
    fetch('https://peaceful-everglades-27236.herokuapp.com/detect' , {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        url: this.state.input
      })
    })
      .then(response => response.json())
      .then(
    dat => {
      const count = dat.outputs[0].data.regions.length;
      if(dat){
        fetch('https://peaceful-everglades-27236.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id,
            count: count
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log);
      }
      
      this.displayFaceBox(this.calculateFaceLocation(dat))
    })
    .catch(err => console.log(err)
    
  );
  }

  onRouteChange = (route) => {
    
    this.setState({route: route});
    this.setState({input: '', imageUrl: ''});

  }
  onClickCounter = () => {
    this.setState(Object.assign(this.state.user, {entries: 0}))
    fetch('https://peaceful-everglades-27236.herokuapp.com/count', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.user.email
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log('Could not update the counter at the server. Check error code: ', err));
  }

  render(){
  return (
    <div className='App'>
      <Particles className='particles' params={particlesOptions}/>
      
      {this.state.route === 'signin' ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>:
       this.state.route === 'register'? <Register loadUser= {this.loadUser} onRouteChange={this.onRouteChange}/>:
      <div>
      <Navigation onRouteChange={this.onRouteChange}/>
      <Logo onClickCounter={this.onClickCounter}/>
      <Rank name={this.state.user.name} entries={this.state.user.entries}/>
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
      }
      
    </div>
  );
  }
}

export default App;
