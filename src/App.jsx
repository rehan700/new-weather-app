import './App.css'
import Navbar from './components/Navbar' 
import Sample from './components/sample'
import Weather from './components/Weather'
import React,{useState} from 'react'
function App() {
  const [mode, setMode] = useState("light")
  if (mode==='light') {
    document.body.style.backgroundColor = '#ced9e1'

  }
  else document.body.style.backgroundColor = '#333'

  const handleToggleSwitch = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#333';
      document.body.style.color = '#fff';
      console.log("switched to dark mode!");
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = '#ced9e1';
      document.body.style.color = '#000';
      console.log("switched to ligth mode!")
    }
  }
  
  return (
    <>
      <Navbar mode={mode} modefunction={handleToggleSwitch}/>
      <Sample/>
      
    </>
  )
}

export default App
