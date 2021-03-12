import React from 'react';

import { useLoadData } from './useLoadData';
import { useUsecases } from '../useUsecases';
import { ERROR_MESSAGE, LOADING_MESSAGE } from './messages';

export const TotalDragonFlightTime = () => {
  const { getTotalDragonFlightTime } = useUsecases();
  const { loading, data, error } = useLoadData(getTotalDragonFlightTime);

  if (loading) {
    return <div>{LOADING_MESSAGE}</div>;
  }

  if (error) {
    return <div>{ERROR_MESSAGE}</div>;
  }

  return <div>Total dragon flight time: {data} sec</div>;
}