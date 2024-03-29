import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Clarifai from 'clarifai';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import Particles from 'react-particles-js';

const app = new Clarifai.App({
  apiKey: 'b5e737ecf903402181b6e12bf1ca603b'
 });

const particlesOptions = {
  
    particles: {
      number: {
        value:150,
        density: {
          enable: true,
          value_area: 800,
          shadow: {
            enable: true,
            color: "#3CA9D1",
            blur: 5
          }
        }
      }
    }
  }
  class App extends Component {
  constructor() {
    super();
    this.state = {input: '',
                  imageUrl: '',
                  box: {},
                  route: 'signin',
                  isSignedIn: false
    }
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
    
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col *width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
    console.log(box);
  }
 
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
      this.state.input)
       .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
        //do something with response
        .catch(err => console.log(err));
        //there was an error
   
 }

 onRouteChange = (route) => {
   if (route === 'signout') {
     this.setState({isSignedIn: false})
   }else if (route === 'home'){
    this.setState({isSignedIn: true})
   }
   this.setState({route: route});
 }

render(){
  const { isSignedIn, imageUrl, route, box} = this.state;
  return (
    <div className="App">
      <Particles className='particles' params={particlesOptions}/>
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
       {this.state.route === 'home' 
          ?<div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange = {this.onInputChange} 
                            onButtonSubmit = {this.onButtonSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
          : (
            route === 'signin' ?
            <Signin onRouteChange = {this.onRouteChange}/>
            : <Register onRouteChange = {this.onRouteChange}/>
          )
          
          }
          </div>
  );
}
}

export default App;
