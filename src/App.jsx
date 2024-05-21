import { useState } from 'react'
import Navbar from './assets/components/Navbar'

import News from './assets/components/News'
import LoadingBar from 'react-top-loading-bar'
// import searchInput from './assets/components/Navbar'

import './App.css'

import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
 
} from "react-router-dom";


function App() {

   
  
    

  // do not forget to install the package npm i react-top-loading-bar
  


  const [progress , setProgress] = useState(0);
  // constructor() {
  //   super();
  //   state = {
  //     searchInput: 'in' // Default value for searchInput
  //   };
  // }
  
  // handleClick = () => {


      
  //   let searchBox = document.getElementById('input');

      

  //   setState({
      
  //     searchInput : searchBox.value
     
  //   })

  // }




  
    return (
      
      <div className='parent'>
        <Router> 
       <Navbar /> 
       <LoadingBar
       height ={3}
        color='#f11946'
        progress={progress}
        
      />
       {/* <input id='input' type="text" placeholder='enter country name' />
       <button className='button' onClick={handleClick}> Search </button> */}
     
      

       <Switch>
          <Route exact path="/">
          <News setProgress={setProgress}  key="home" country='in' pageSize={10} category="general"/>
          </Route>

          <Route exact path="/business">
          <News setProgress={setProgress}  key="business" country='in'  pageSize={10} category="business"/>
          </Route>

          <Route exact path="/entertainment">
          <News setProgress={setProgress}  key="entertainment" country='in'  pageSize={10} category="entertainment"/>
          </Route>

          <Route exact path="/health">
          <News setProgress={setProgress}  key="health" country='in'  pageSize={10} category="health"/>
          </Route>

          <Route exact path="/science">
          <News setProgress={setProgress}  key="science" country='in'  pageSize={10} category="science"/>
          </Route>

          <Route exact path="/sports">
          <News setProgress={setProgress}  key="sports" country='in'  pageSize={10} category="sports"/>
          </Route>

          <Route exact path="/technology">
          <News setProgress={setProgress}  key="technology" country='in'  pageSize={10} category="technology"/>
          </Route>

          <Route exact path="/general">
          <News setProgress={setProgress}  key="general" country='in'  pageSize={10} category="general"/>
          </Route>
       
        </Switch>
      
    
       </Router>
      </div>
    )
  }


export default App
