import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { getRecommendations } from '../../actions/recommendation';
import RecommendationItem from './RecommendationItem';

const Dashboard = ({
    getCurrentProfile,
    deleteAccount,
    getRecommendations,
    auth: { user },
    profile: { profile },
    recommendation: { recommendations }
}) => {
    useEffect(() => {
        getCurrentProfile();
        getRecommendations();
    }, [getCurrentProfile], [getRecommendations]);

    return (
        <section className="container">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user" /> Welcome {user && user.name}
        </p>
        {profile !== null ? (
            <>
            <DashboardActions />
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', margin: '15px'}}>
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            </div>

            <div className="my-2">
                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                <i className="fas fa-user-minus" /> Delete My Account 
                </button>
            </div>
            <div>
        <div className="posts">
            <br></br>
            <ul>
                <li>
                <h1>RECOMMENDATIONS</h1>
                </li>
                <li>
                    <Link to="/internships" className="btn btn-success my-1">
                    View more internships
                    </Link>
                </li>
            </ul>
            
        {recommendations.map((recommendation) => (
          <RecommendationItem key={recommendation._id} recommendation={recommendation} />
        ))}
      </div>
        </div>
            </>
        ) : (
            <>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
            </Link>
            </>
        )}
        </section>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    getRecommendations: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    recommendation: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    recommendation: state.recommendation
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, getRecommendations })(
    Dashboard
);

