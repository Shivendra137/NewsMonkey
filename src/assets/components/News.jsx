import React, {useEffect, useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import { useSyncExternalStore } from 'react';


const News = (props) => {

  const [articles , setArticles] = useState([])
  const [loading , setLoading] = useState(false)
  const [page , setPage] = useState(1)
  const [totalArticles , setTotalArticles] = useState(0)
   // document.title = `${capitalizeFirstLetter(props.category)} - News Monkey`;

 const  capitalizeFirstLetter = (string) => {

    return string.charAt(0).toUpperCase() + string.slice(1);
  }
    
   

  useEffect(() =>{
    
    updateNews();

  }, [])



    const updateNews  =async () =>{
    
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=100b32deac664e8ca7dd2ebd8af5fb86&page=${page}pageSize=${props.pageSize}`;
      setLoading({
        loading : true
      })
      let data =await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json()
      props.setProgress(70);
      
      console.log(parsedData);

      setArticles(parsedData.articles)
      setTotalArticles(parsedData.totalResults)
      setLoading(false)

     
      props.setProgress(100);
    }

   const handlePrevious= async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=100b32deac664e8ca7dd2ebd8af5fb86&page=${page-1}pageSize=${props.pageSize}`;
    setLoading({
      loading : true
    })
    let data =await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    
    console.log(parsedData);

    setArticles(parsedData.articles)
    setTotalArticles(parsedData.totalResults)
    setLoading(false)

   
    props.setProgress(100);
    
    setPage(page-1);
      
      

    }

  const  handleNext=async () => {

    
    props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=100b32deac664e8ca7dd2ebd8af5fb86&page=${page+1}pageSize=${props.pageSize}`;
      setLoading({
        loading : true
      })
      let data =await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json()
      props.setProgress(70);
      
      console.log(parsedData);

      setArticles(parsedData.articles)
      setTotalArticles(parsedData.totalResults)
      setLoading(false)

     
      props.setProgress(100);

      setPage(page+1);


    }

   
    return (
     
      <div className="container " style={{marginTop: '95px'}}>
       <h1 className='text-center '> NewsMonkey - top headlines from {capitalizeFirstLetter(props.category)}</h1>

      { loading && <Spinner />} 


       <div className='w-100% d-flex flex-wrap justify-content-evenly my-3'>
      
            
            {!loading && articles.map((element) =>{

                return       <div className='m-5' key={element.url}>
                <Newsitem  title={element.title?element.title.slice(0,70):""} description={element.description} imageurl={element.urlToImage} newsURL={element.url} author= {element.author} date={element.publishedAt}  source={element.source.name}/>
                
                </div>
            })
        }
      



     

        </div>

        <div className='buttons d-flex justify-content-between  m-2 '>
        <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevious}>&larr; Previous</button>
        <button disabled={page +1> Math.ceil(totalArticles/10)} type="button" className="btn btn-dark" onClick={handleNext}>Next &rarr;</button>
        </div>

     
      </div>
    )
  }



// News.defaultProps = {

//   country : 'in',
//   pageSize : 10,
//   category : "general"
// }



News.propTypes = {

  country : PropTypes.string ,
  pageSize : PropTypes.number,
  category : PropTypes.string
}


export default News
