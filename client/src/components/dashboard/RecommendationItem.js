import React from 'react';
import PropTypes from 'prop-types';

const RecommendationItem = ({
    recommendation: { Internship_Category, Company_name }
}) => (
    <div>
        <h1>{Internship_Category}</h1>
        <p>{Company_name}</p>
    </div>
  
);

RecommendationItem.propTypes = {
  recommendation: PropTypes.object.isRequired,
};


export default RecommendationItem;