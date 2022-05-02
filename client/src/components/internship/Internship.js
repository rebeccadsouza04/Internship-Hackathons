import React, { useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import InternshipItem from './InternshipItem'
import { getInternships } from '../../actions/internship'

const Internship = ({ getInternships, internship: {internships }}) => {
  useEffect(() => {
    getInternships();
  }, [getInternships]);
  return (
    <section className="container">
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