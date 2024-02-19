import React from 'react';

function Highscore({ highscore }) {
  function extractNameFromName(name) {
    // const atIndex = email.indexOf('@');
    return name;
  }
  console.log("highscore",highscore);

  return (
    <div className='highscore-cont'>
      <h1>Leaderboard</h1>
      <div className='highscore'>
        {Array.isArray(highscore) ? (
          highscore.map((user, ind) => (
            <p key={ind}>
              {extractNameFromName(user.name)} - {user.score}
            </p>
          ))
        ) : (
          <p>Loading highscores...</p>
        )}
      </div>
    </div>
  );
}

export default Highscore;
