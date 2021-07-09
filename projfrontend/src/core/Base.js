import React from 'react'
import Menu from './Menu';

 const Base=({
    title="My Title",
    description="My description",
    className="bg-dark text-white p-4",
    children
 }) =>
    (
        <div>
            <Menu/>
        <div className="container-fluid" style={{ marginTop: -80}}>
            <div className="jumbotron bg-dark text-white text-center">
              <h2 className="display-4">{title}</h2>  
              <p className="lead">{description}</p> 
            </div>   
            <div className={className} style={{ marginTop: -110}} >{children} </div>
        </div> 
            <footer className="footer bg-dark mt-auto py-1"> 
            <div className="container-fluid bg-success text-white text-center py-3">
                <h6>If you got any questions,feel free to reach out!</h6>
                <button className="btn btn-warning btn-sm">Contact Us</button>
            </div>
            
            </footer>
        </div>
    )

export default Base;