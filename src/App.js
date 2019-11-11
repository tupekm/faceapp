import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';

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
function App() {
  return (
    <div className="App">
    <Particles className='particles' params={particlesOptions}/>
    <Navigation />
    <Logo />
    <Rank />
    <ImageLinkForm />
    {/**
    <FaceRecognition />*/}
      
    </div>
  );
}

export default App;
