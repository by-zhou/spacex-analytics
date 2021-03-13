import { useUsecases } from '../useUsecases';
import { useLoadData } from './useLoadData';
import { ERROR_MESSAGE, LOADING_MESSAGE } from './messages';
import React from 'react';

export const KscRocketCountWithRecoveredFairings = () => {
  const { getKscRocketCountWithRecoveredFairings } = useUsecases();
  const { loading, data, error } = useLoadData(getKscRocketCountWithRecoveredFairings);

  if (loading) {
    return <>{LOADING_MESSAGE}</>;
  }

  if (error) {
    return <>{ERROR_MESSAGE}</>;
  }

  return <>Number of rockets launched from Kennedy Space Center Historic Launch Complex 39A with recovered fairings: {data}</>;
};
