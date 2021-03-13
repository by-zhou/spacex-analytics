import React from 'react';

import { useLoadData } from './useLoadData';
import { useUsecases } from '../useUsecases';
import { ERROR_MESSAGE, LOADING_MESSAGE } from './messages';

export const UpcomingNasaCrewMemberCount = () => {
  const { getUpcomingNasaCrewMemberCount } = useUsecases();
  const { loading, data, error } = useLoadData(getUpcomingNasaCrewMemberCount);

  if (loading) {
    return <>{LOADING_MESSAGE}</>;
  }

  if (error) {
    return <>{ERROR_MESSAGE}</>;
  }

  return <>Number of NASA crew member to be in the upcoming launches: {data}</>;
};
