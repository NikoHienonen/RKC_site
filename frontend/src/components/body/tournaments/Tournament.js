import React from 'react';

const Tournament = (props) => {
  return (
    <div className="tournament">
      {props.tournament.name}
    </div>
  );
};

export default Tournament;