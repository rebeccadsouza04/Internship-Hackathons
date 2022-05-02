import React from 'react';
import PropTypes from 'prop-types';

const InternshipItem = ({
    internship: { Internship_Category, Company_name }
}) => (
    <div>
        <h1>{Internship_Category}</h1>
        <p>{Company_name}</p>
    </div>
  
);

InternshipItem.propTypes = {
  internship: PropTypes.object.isRequired,
};


export default InternshipItem;