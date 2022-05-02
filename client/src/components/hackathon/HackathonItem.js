import React from 'react';
import PropTypes from 'prop-types';
import temp from '../../img/temp.jpg';

const HackathonItem = ({
    hackathon: { Title, Status }
}) => (
  <div className='profile bg-light'>
  <img src={temp} alt='' className='round-img' />
  <div>
    <h2>{Title}</h2>
    <p>
      {Status && <span> at {Status}</span>}
    </p>
</div>
</div>
);

HackathonItem.propTypes = {
  hackathon: PropTypes.object.isRequired,
};


export default HackathonItem;