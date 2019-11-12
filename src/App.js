import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
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
    this.state = {
      input: '',
      imageUrl: '',
    }
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState = ({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
      this.state.input)
       .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        //do something with response
      },
      function(err){
        //there was an error
      }
    )
  }

render(){
  
  return (
    <div className="App">
    <Particles className='particles' params={particlesOptions}/>
    <Navigation />
    <Logo />
    <Rank />
    <ImageLinkForm onInputChange = {this.onInputChange} 
                    onButtonSubmit = {this.onButtonSubmit}/>
    <FaceRecognition imageUrl = {this.state.input}/>
      
    </div>
  );
}
}

export default App;
