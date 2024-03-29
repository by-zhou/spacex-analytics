import React from 'react';

import { useLoadData } from './useLoadData';
import { useUsecases } from '../useUsecases';
import { ERROR_MESSAGE, LOADING_MESSAGE } from './messages';

export const SuccessfulLaunchCount = () => {
  const { getSuccessfulLaunchCount } = useUsecases();
  const { loading, data, error } = useLoadData(getSuccessfulLaunchCount);

  if (loading) {
    return <>{LOADING_MESSAGE}</>;
  }

  if (error) {
    return <>{ERROR_MESSAGE}</>;
  }

  return <>Number of successful launches: {data?.successCount} of {data?.totalCount}</>;
};
