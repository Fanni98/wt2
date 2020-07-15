import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import sea from '../sea.png';

const AnimalCard = (props) => {
    const  animal = props.animal;

    return(
        <div className="card-container">
            <img src={sea} alt="" />
            <div className="desc">
                <h2>
                    <Link to={`/show-animal/${animal._id}`}>
                        { animal.name }
                    </Link>
                </h2>
                <h3>{animal.age}</h3>
                <p>{animal.type}</p>
                <p>{animal.rescue_date}</p>
		        <p>{animal.description}</p>
            </div>
        </div>
    )
};

export default AnimalCard;