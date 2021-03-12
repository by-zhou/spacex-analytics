import React from 'react';

import { useLoadData } from './useLoadData';
import { useUsecases } from '../useUsecases';
import { ERROR_MESSAGE, LOADING_MESSAGE } from './messages';

export const SuccessfulLaunchCount = () => {
  const { getSuccessfulLaunchCount } = useUsecases();
  const { loading, data, error } = useLoadData(getSuccessfulLaunchCount);

  if (loading) {
    return <div>{LOADING_MESSAGE}</div>;
  }

  if (error) {
    return <div>{ERROR_MESSAGE}</div>;
  }

  return <div>Number of successful launches: {data}</div>;
}
