import React from 'react';
import PropTypes from 'prop-types';
import temp from '../../img/temp.jpg';
import {Link} from 'react-router-dom';

const InternshipItem = ({
    internship: { Internship_Category, Company_name, location, Start_Date, Duration, Stipend, Apply_By }
}) => (
  <div className='profile bg-light'>
  <img src={temp} alt='' className='round-img' />
  <div>
    <h2>{Internship_Category}</h2>
    <p>
      {Company_name && <span> at {Company_name}</span>}
    </p>
    <p className='my-1'><i className='fas fa-map-marker' />{location && <span> {location}</span>}</p>
    <ul>
      <li className='text-primary'>
        <p><i className='fas fa-check' /> {Start_Date}</p>
        <p><i className='fas fa-check' /> {Duration}</p>
      </li>
  </ul><br></br>
    <Link to={`/profile}`} className='btn btn-primary'>
      View Profile
    </Link>
  </div>
  <ul>
      <li className='text-primary'><br></br>
      <br></br><p><i className='fas fa-check' /> {Stipend}</p>
        <p><i className='fas fa-check' /> {Apply_By}</p>
      </li>
  </ul>
</div>
);

InternshipItem.propTypes = {
  internship: PropTypes.object.isRequired,
};


export default InternshipItem;