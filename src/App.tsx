import React from 'react';

import { SuccessfulLaunchCount } from './containers/SuccessfulLaunchCount';
import { TotalDragon2FlightTime } from './containers/TotalDragon2FlightTime';
import { KscRocketCountWithRecoveredFairings } from './containers/KscRocketCountWithRecoveredFairings';
import { UpcomingNasaCrewMemberCount } from './containers/UpcomingNasaCrewMemberCount';

function App() {

  return (
    <div className="App" style={{ textAlign: 'center' }}>
      <h1>🚀 SpaceX Analytics</h1>
      <h4>Insights about SpaceX flights</h4>

      <p><SuccessfulLaunchCount /></p>
      <p><TotalDragon2FlightTime /></p>
      <p><KscRocketCountWithRecoveredFairings /></p>
      <p><UpcomingNasaCrewMemberCount /></p>
    </div>
  );
}

export default App;
