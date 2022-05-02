import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import InternshipItem from './InternshipItem'
import { getInternships } from '../../actions/internship'
import { Link } from 'react-router-dom';

const Internship = ({ getInternships, internship: {internships }}) => {
  useEffect(() => {
    getInternships();
  }, [getInternships]);

  const checkList = ["Web Development", "Graphic Design", "Mobile App Development"];
    
  return (
    <section className="container">
        <div className="title">
          <h1>CATEGORIES OF INTERNSHIPS:</h1>
          </div>
        <div className="list-container">
          {checkList.map((item) => (
                <Link to={`/internships/${item}`} className='btn btn-light'>
                  <span>{item}</span>
                </Link>
            
          ))}
          <Link to='/internships' className='btn btn-light'>
                  <span>All</span>
                </Link>
        </div>

      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <div className="posts">
        {internships.map((internship) => (
          <InternshipItem key={internship._id} internship={internship} />
        ))}
      </div>
    </section>
  )
}

Internship.propTypes = {
  getInternships: PropTypes.func.isRequired,
  internship: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  internship: state.internship
});


export default connect(mapStateToProps, {getInternships})(Internship);