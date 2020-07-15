import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from '../volunteer.png';

const VolunteerCard = (props) => {
    const  volunteer = props.volunteer;

    return(
        <div className="card-container">
            <img src={logo} alt="" />
            <div className="desc">
                <h2>
                    <Link to={`/show-volunteer/${volunteer._id}`}>
                        { volunteer.name }
                    </Link>
                </h2>
                <h3>{volunteer.age}</h3>
            </div>
        </div>
    )
};

export default VolunteerCard;