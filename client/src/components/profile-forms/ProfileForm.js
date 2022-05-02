import React, { Fragment, useState, useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

/*
  NOTE: declare initialState outside of component
  so that it doesn't trigger a useEffect
  we can then safely use this to construct our profileData
 */
const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  preference1: '',
  preference2: '',
  preference3: '',
  skills: '',
  githubusername: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: ''
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile
}) => {
  const [formData, setFormData] = useState(initialState);

  const creatingProfile = useMatch('/create-profile');

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // if there is no profile, attempt to fetch one
    if (!profile) getCurrentProfile();

    // if we finished loading and we do have a profile
    // then build our profileData
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      // the skills may be an array from our API response
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');
      // set local state with the profileData
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    company,
    website,
    location,
    status,
    preference1,
    preference2,
    preference3,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate, profile ? true : false);
  };

  return (
    <section className="container">
      <h1 className="large text-primary">
        {creatingProfile ? 'Create Your Profile' : 'Edit Your Profile'}
      </h1>
      <p className="lead">
        <i className="fas fa-user" />
        {creatingProfile
          ? ` Let's get some information to make your`
          : ' Add some changes to your profile'}
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option>* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <select name="preference1" value={preference1} onChange={onChange}>
            <option>* Select Preference 1</option>
            <option value=".NET Development">.NET Development</option>
            <option value="2D Animation">2D Animation</option>
            <option value="3D Animation">3D Animation</option>
            <option value="Android App Development">Android App Development</option>
            <option value="Angular Development">Angular Development</option>
            <option value="Animation">Animation</option>
            <option value="Artificial Intelligence (AI)">Artificial Intelligence (AI)</option>
            <option value="ASP.NET Development">ASP.NET Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="Blockchain Development">Blockchain Development</option>
            <option value="C# Development">C# Development</option>
            <option value="CAD Design">CAD Design</option>
            <option value="Chemical Engineering">Chemical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Computer Vision">Computer Vision</option>
            <option value="Data Analysis">Data Analysis</option>
            <option value="Data Science">Data Science</option>
            <option value="DevOps">DevOps</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Electronics Engineering">Electronics Engineering</option>
            <option value="Embedded Systems">Embedded Systems</option>
            <option value="Flutter App Development">Flutter App Development</option>
            <option value="Front End Development">Front End Development</option>
            <option value="Full Stack Development">Full Stack Development</option>
            <option value="Game Development">Game Development</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Internet Of Things (IoT)">Internet Of Things (IoT)</option>
            <option value="iOS App Development">iOS App Development</option>
            <option value="Java Development">Java Development</option>
            <option value="Laravel Development">Laravel Development</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="MERN Stack Development">MERN Stack Development</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="Node.js Development">Node.js Development</option>
            <option value="PHP Development">PHP Development</option>
            <option value="Python Development">Python Development</option>
            <option value="React Native Development">React Native Development</option>
            <option value="Search Engine Optimization (SEO)">Search Engine Optimization (SEO)</option>
            <option value="Software Development">Software Development</option>
            <option value="Software Testing">Software Testing</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Unity Development">Unity Development</option>
            <option value="Web Development">Web Development</option>
            <option value="WordPress Development">WordPress Development</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of your 1st preference
          </small>
        </div>
        <div className="form-group">
          <select name="preference2" value={preference2} onChange={onChange}>
            <option>* Select Preference 2</option>
            <option value=".NET Development">.NET Development</option>
            <option value="2D Animation">2D Animation</option>
            <option value="3D Animation">3D Animation</option>
            <option value="Android App Development">Android App Development</option>
            <option value="Angular Development">Angular Development</option>
            <option value="Animation">Animation</option>
            <option value="Artificial Intelligence (AI)">Artificial Intelligence (AI)</option>
            <option value="ASP.NET Development">ASP.NET Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="Blockchain Development">Blockchain Development</option>
            <option value="C# Development">C# Development</option>
            <option value="CAD Design">CAD Design</option>
            <option value="Chemical Engineering">Chemical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Computer Vision">Computer Vision</option>
            <option value="Data Analysis">Data Analysis</option>
            <option value="Data Science">Data Science</option>
            <option value="DevOps">DevOps</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Electronics Engineering">Electronics Engineering</option>
            <option value="Embedded Systems">Embedded Systems</option>
            <option value="Flutter App Development">Flutter App Development</option>
            <option value="Front End Development">Front End Development</option>
            <option value="Full Stack Development">Full Stack Development</option>
            <option value="Game Development">Game Development</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Internet Of Things (IoT)">Internet Of Things (IoT)</option>
            <option value="iOS App Development">iOS App Development</option>
            <option value="Java Development">Java Development</option>
            <option value="Laravel Development">Laravel Development</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="MERN Stack Development">MERN Stack Development</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="Node.js Development">Node.js Development</option>
            <option value="PHP Development">PHP Development</option>
            <option value="Python Development">Python Development</option>
            <option value="React Native Development">React Native Development</option>
            <option value="Search Engine Optimization (SEO)">Search Engine Optimization (SEO)</option>
            <option value="Software Development">Software Development</option>
            <option value="Software Testing">Software Testing</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Unity Development">Unity Development</option>
            <option value="Web Development">Web Development</option>
            <option value="WordPress Development">WordPress Development</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of your 2nd preference
          </small>
        </div>
        <div className="form-group">
          <select name="preference3" value={preference3} onChange={onChange}>
            <option>* Select Preference 3</option>
            <option value=".NET Development">.NET Development</option>
            <option value="2D Animation">2D Animation</option>
            <option value="3D Animation">3D Animation</option>
            <option value="Android App Development">Android App Development</option>
            <option value="Angular Development">Angular Development</option>
            <option value="Animation">Animation</option>
            <option value="Artificial Intelligence (AI)">Artificial Intelligence (AI)</option>
            <option value="ASP.NET Development">ASP.NET Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="Blockchain Development">Blockchain Development</option>
            <option value="C# Development">C# Development</option>
            <option value="CAD Design">CAD Design</option>
            <option value="Chemical Engineering">Chemical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Computer Vision">Computer Vision</option>
            <option value="Data Analysis">Data Analysis</option>
            <option value="Data Science">Data Science</option>
            <option value="DevOps">DevOps</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Electronics Engineering">Electronics Engineering</option>
            <option value="Embedded Systems">Embedded Systems</option>
            <option value="Flutter App Development">Flutter App Development</option>
            <option value="Front End Development">Front End Development</option>
            <option value="Full Stack Development">Full Stack Development</option>
            <option value="Game Development">Game Development</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Internet Of Things (IoT)">Internet Of Things (IoT)</option>
            <option value="iOS App Development">iOS App Development</option>
            <option value="Java Development">Java Development</option>
            <option value="Laravel Development">Laravel Development</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="MERN Stack Development">MERN Stack Development</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="Node.js Development">Node.js Development</option>
            <option value="PHP Development">PHP Development</option>
            <option value="Python Development">Python Development</option>
            <option value="React Native Development">React Native Development</option>
            <option value="Search Engine Optimization (SEO)">Search Engine Optimization (SEO)</option>
            <option value="Software Development">Software Development</option>
            <option value="Software Testing">Software Testing</option>
            <option value="UI UX Design">UI/UX Design</option>
            <option value="Unity Development">Unity Development</option>
            <option value="Web Development">Web Development</option>
            <option value="WordPress Development">WordPress Development</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of your 3rd preference
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={onChange}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={onChange}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={onChange}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={onChange}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={onChange}
          />
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={onChange}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
