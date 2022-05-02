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

  const checkList = [".NET Development", "2D Animation", "3D Animation", "Android App Development", "Angular Development", "Animation", "Artificial Intelligence (AI)", "ASP.NET Development", "Backend Development", "Blockchain Development", "C# Development", "CAD Design", "Chemical Engineering", "Civil Engineering", "Cloud Computing", "Computer Vision", "Data Analysis", "Data Science", "DevOps", "Digital Marketing", "Electronics Engineering", "Embedded Systems", "Flutter App Development", "Front End Development", "Full Stack Development", "Game Development", "Graphic Design", "Internet Of Things (IoT)", "iOS App Development", "Java Development", "Laravel Development", "Machine Learning", "Mechanical Engineering", "MERN Stack Development", "Mobile App Development", "Node.js Development", "PHP Development", "Python Development", "React Native Development", "Search Engine Optimization (SEO)", "Software Development", "Software Testing", "UI/UX Design", "Unity Development", "Web Development", "WordPress Development"];
    
  return (
    <section className="container">
        <div className="title">
          <h1>CATEGORIES OF INTERNSHIPS:</h1>
          </div>
        <div className="list-container">
          {checkList.map((item) => (
                <Link to={`/internships/${item}`} className='btn btn-light'>
                  <small>{item}</small>
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

InternshipCategory.propTypes = {
  getCategory: PropTypes.func.isRequired,
  internship: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  internship: state.internship
});


export default connect(mapStateToProps, {getCategory})(InternshipCategory);