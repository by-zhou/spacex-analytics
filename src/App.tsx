import React from 'react';

import { SuccessfulLaunchCount } from './containers/SuccessfulLaunchCount';
import { TotalDragonFlightTime } from './containers/TotalDragonFlightTime';

function App() {

  return (
    <div className="App" style={{ textAlign: 'center' }}>
      <h1>SpaceX Analytics</h1>
      <h4>Insights about SpaceX flights</h4>
      <SuccessfulLaunchCount />
      <TotalDragonFlightTime />
    </div>
  );
}

export default App;
