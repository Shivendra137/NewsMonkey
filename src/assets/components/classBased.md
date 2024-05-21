NAVBAR ------------------------------------------------------------------------------------------------------------------------------

import React, { Component } from 'react'

import Proptypes from 'prop-types'

import {Link} from 'react-router-dom'

export class Navbar extends Component {

  searchInput="in"
  render() {
    return (
      <div>
        
        <nav className=" navbar navbar-expand-lg  navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">NewsMonkey</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse "  id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
   

        <li className="nav-item">
          <Link className="nav-link" to="/business">Business</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/entertainment">Entertainment</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/general">General</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/health">Health</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/science">Science</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/sports">Sports</Link>
        </li>
       
        <li className="nav-item">
          <Link className="nav-link" to="/technology">Technology</Link>
        </li>
        
      
         
        

        
        
       
      </ul>
    
    </div>
  </div>
</nav>
      </div>
    )
  }
}

export default Navbar

-------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------



NEWS--


import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

 
    static defaultProps = {

      country : 'in',
      pageSize : 10,
      category : "general"
    }

    capitalizeFirstLetter = (string) => {

      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static propTypes = {

      country : PropTypes.string ,
      pageSize : PropTypes.number,
      category : PropTypes.string
    }
    constructor(props) {

        super(props);

        this.state= {
            page: 1,
            articles: [],
            loading : false ,
            totalArticles:0
           

            


        }

        document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Monkey`;
    }


    async componentDidMount() {
    

    this.updateNews();
    }

    async updateNews() {
    
      this.props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=100b32deac664e8ca7dd2ebd8af5fb86&page=${this.state.page}pageSize=${this.props.pageSize}`;
      this.setState({
        loading : true
      })
      let data =await fetch(url);
      this.props.setProgress(30);
      let parsedData = await data.json()
      this.props.setProgress(70);
      
      console.log(parsedData);
      this.setState({
        loading : false
      })


      this.setState({articles: parsedData.articles, totalArticles: parsedData.totalResults})

      this.props.setProgress(100);
    }

    handlePrevious= async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=100b32deac664e8ca7dd2ebd8af5fb86&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      this.setState({
        loading : true
      })
      let data =await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
        loading : false
      })

      this.setState({articles: parsedData.articles})


      this.setState({

        page: this.state.page - 1,


      })
      

    }

    handleNext=async () => {

      if ( this.state.page +1> Math.ceil(this.state.totalArticles/10)){

        
      }

      else {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=100b32deac664e8ca7dd2ebd8af5fb86&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        
        this.setState({
          loading : true
        })
        let data =await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
          loading : false
        })
  
        this.setState({articles: parsedData.articles})
  
  
        this.setState({
  
          page: this.state.page + 1,
  
  
        })
      }


    }
  render() {
   
    return (
      <div className="container my-5 ">
       <h1 className='text-center'> NewsMonkey - top headlines from {this.capitalizeFirstLetter(this.props.category)}</h1>

      { this.state.loading && <Spinner />} 


       <div className='w-100% d-flex flex-wrap justify-content-evenly my-3'>
      
            
            {!this.state.loading && this.state.articles.map((element) =>{

                return       <div className='m-5' key={element.url}>
                <Newsitem  title={element.title?element.title.slice(0,70):""} description={element.description} imageurl={element.urlToImage} newsURL={element.url} author= {element.author} date={element.publishedAt}  source={element.source.name}/>
                
                </div>
            })
        }
      



     

        </div>

        <div className='buttons d-flex justify-content-between  m-2 '>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevious}>&larr; Previous</button>
        <button disabled={this.state.page +1> Math.ceil(this.state.totalArticles/10)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div>

     
      </div>
    )
  }
}

export default News


--------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------





NEWSITEM --

import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, description, imageurl, author, date, newsURL, source } = this.props;
    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>

        <div className="d-flex justify-content-end position-absolute end-0" >
          <span className=" badge rounded-pill bg-danger" >
                {source}
                <span className="visually-hidden">unread messages</span>
              </span>
              </div>
          <img src={imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
           
            <h5 className=" card-title">
              {title}...{" "}
             
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author ? author : "unknown"} on{" "}
                {new Date(date).toGMTString()}{" "}
              </small>
            </p>
            <a href={newsURL} className="btn btn-dark btn-sm">
              {" "}
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;


--------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------



SPINNER --


import React from 'react'

import loading from './loading.gif'

export default function Spinner() {
  return (
    <div className='text-center '>

        <img src={loading} alt="loading" />
      
    </div>
  )
}


--------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------