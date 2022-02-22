import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank'
import Logo from './components/Logo/Logo'
import Clarifai from 'clarifai'
import Particles from 'react-tsparticles';

const particlesOptions = {
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 500,
      },
      value: 100,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 2,
    },
  },
  detectRetina: true,}
  //clarifai API
  const app = new Clarifai.App({
    apiKey: 'a2013f7d2d54452d9592d7569ce4c5bd'
   });
   
class App extends React.Component {
  constructor (){
    super();
    this.state = {
      input : '',
      imageUrl : ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }
  
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});  
    app.models.predict('Clarifai.FACE_DETECT_MODEL', this.state.input).then(
      function(response) {
        // do something with response
        console.log(response);
      },
      function(err) {
        // there was an error
      }
    );
  }
  render(){
  return (
    <div className="App">
      <Particles className='particles'
      id="tsparticles"
      options={particlesOptions}
    />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
      <FaceRecognition imageUrl = {this.state.imageUrl}/>
    </div>
  );}
}

export default App;
