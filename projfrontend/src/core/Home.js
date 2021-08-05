import React,{useState,useEffect} from 'react';
import { API } from '../backend';
import "../styles.css";
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';


export default function Home() {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllProduct =()=>{
        getProducts().then(data=>{
            if(data && data.error)
            {
                setError(data.error);
            }else{
                setProducts(data);
            }
        });
    };

    useEffect(() => {
        loadAllProduct()
    }, [])
   
  return (
    <Base title="Welcome to the Tshirt store" description="">
    
      <div className="row text-center" >
            
            <div className="row">
                {products.map((product,index)=>{
                    return(
                        <div key={index}className="col-4 mb-4">
                            <Card product={product}/>
                        </div>
                    )
                })}
            </div>
      </div>
      
    </Base>
  )
}