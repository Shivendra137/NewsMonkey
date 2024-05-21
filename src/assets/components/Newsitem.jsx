import React  from "react";

const Newsitem = (props) =>{

    let { title, description, imageurl, author, date, newsURL, source } = props;
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


export default Newsitem;
