import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import HackathonItem from './HackathonItem'
import { getHackathons } from '../../actions/hackathon'

const Hackathon = ({ getHackathons, hackathon: { hackathons }}) => {
  useEffect(() => {
    getHackathons();
  }, [getHackathons]);
    
  return (
    <section className="container">
        <div className="title">
          <h1>HACKATHONS:</h1>
          </div>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <div className="posts">
        {hackathons.map((hackathon) => (
          <HackathonItem key={hackathon._id} hackathon={hackathon} />
        ))}
      </div>
    </section>
  )
}

Hackathon.propTypes = {
  getHackathons: PropTypes.func.isRequired,
  hackathon: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  hackathon: state.hackathon
});


export default connect(mapStateToProps, {getHackathons})(Hackathon);