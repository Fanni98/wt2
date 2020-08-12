import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import sea from '../volunteer.png';

const UserCard = (props) => {
    const user = props.user;

    return(
        <div className="card-container1">
            <img src={sea} alt="" />
            <div className="desc">
                <h2>
                    <Link to={`/show-user/${user._id}`}>
                        { user.name }
                    </Link>
                </h2>

            </div>
        </div>
    )
};

export default UserCard;