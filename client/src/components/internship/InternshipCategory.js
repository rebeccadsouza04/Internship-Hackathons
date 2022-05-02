import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import InternshipItem from './InternshipItem'
import { getCategory } from '../../actions/internship'
import { Link, useParams } from 'react-router-dom';

const InternshipCategory = ({ getCategory, internship: {internships }}) => {
    const { id } = useParams();
  useEffect(() => {
    getCategory(id);
  }, [getCategory, id]);
    
  return (
    <section className="container">
      <div className="list-container">
        <Link to='/internships' className='btn btn-light'>
                <span>Go Back To View All Internships</span>
              </Link>
        </div>

        <div className="title">
          <h1>Internships on {id}:</h1>
          </div>
      <div className="posts">
        {internships.map((internship) => (
          <InternshipItem key={internship._id} internship={internship} />
        ))}
      </div>
    </section>
  )
}

InternshipCategory.propTypes = {
  getCategory: PropTypes.func.isRequired,
  internship: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  internship: state.internship
});


export default connect(mapStateToProps, {getCategory})(InternshipCategory);