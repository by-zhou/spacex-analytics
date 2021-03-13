import React from 'react';

import { useLoadData } from './useLoadData';
import { useUsecases } from '../useUsecases';
import { ERROR_MESSAGE, LOADING_MESSAGE } from './messages';

export const TotalDragon2FlightTime = () => {
  const { getTotalDragon2FlightTime } = useUsecases();
  const { loading, data, error } = useLoadData(getTotalDragon2FlightTime);

  if (loading) {
    return <>{LOADING_MESSAGE}</>;
  }

  if (error) {
    return <>{ERROR_MESSAGE}</>;
  }

  return <>Total flight time for all launched Dragon 2.0: {data} sec</>;
};
