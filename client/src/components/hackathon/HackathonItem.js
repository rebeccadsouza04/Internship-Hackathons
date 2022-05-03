import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import hack from '../../img/hack.jpg';


const HackathonItem = ({
    hackathon: { Title, Status, Start_Date, End_Date, Participants_No, Mode, Hrefs }
}) => (
  <Section>
          <div className='float-container'>
            <div className='float-child'>
  <div className='card-container'>
    <div className="image-container">
      <img src={hack} alt='' />
    </div>
    <div className="card-content">
    <div className="card-title">
      <h3>{Title}</h3>
    </div>
    <div className="card-body">
    <ul>
      <li className='text-dark'>
        <p><small><i className='fas fa-bell' /> Status: {Status}</small></p>
        <p><small><i className='fas fa-clock' /> Starts: {Start_Date}</small></p>
        <p><small><i className='fas fa-clock' /> Ends: {End_Date}</small></p>
        <p><small><i className='fas fa-user' /> Number of Participants: {Participants_No}</small></p>
        <p><small><i className='fas fa-clock' /> Mode: {Mode}</small></p>
      </li>
  </ul>
    </div>
    </div>
    
    <div className="btn">
      <button>
        <a href={Hrefs}>
          learn more
        </a>
      </button>
    </div>
    </div>
    </div>
</div>
</Section>
);

const Section = styled.section`
h3, p{
  margin: 0;
  padding: 0;
}

.btn{
  display: flex;
  justify-content: center;
}

.btn button{
  padding: 0.rem;
  background-color: white;
  border: none;
  transition: 0.2s;
  margin-bottom: 0.rem;
  border-radius: 3px;
}

.btn button:hover{
  background: rgba(27, 156, 252, 0.1);
  transform: scale(1.);
}

a{
  text-transform: uppercase;
  color: #1B9CFC;
  text-decoration: none;
  font-weight: bold;
}
`

HackathonItem.propTypes = {
  hackathon: PropTypes.object.isRequired,
};


export default HackathonItem;