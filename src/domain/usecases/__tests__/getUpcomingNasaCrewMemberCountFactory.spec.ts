import { mockCrewMember, mockLaunch } from '../../testing/mockModels';
import { createGetUpcomingNasaCrewMemberCount } from '../getUpcomingNasaCrewMemberCountFactory';

describe('getUpcomingNasaCrewMemberCountFactory', () => {
  describe('createGetUpcomingNasaCrewMemberCount', () => {
    const getUpcomingLaunchesMock = jest.fn();
    const getCrewMemberMock = jest.fn();
    const getUpcomingNasaCrewMemberCount =
      createGetUpcomingNasaCrewMemberCount(getUpcomingLaunchesMock, getCrewMemberMock);

    it('should return all NASA crew members in the upcoming launches', async () => {
      getUpcomingLaunchesMock.mockImplementationOnce(() => Promise.resolve([
        mockLaunch({ upcoming: true }),
        mockLaunch({ upcoming: true, crew: ['crew-member-id-1', 'crew-member-id-2'] }),
        mockLaunch({ upcoming: true, crew: ['crew-member-id-3'] }),
      ]));
      getCrewMemberMock
        .mockImplementationOnce((id: string) => Promise.resolve(mockCrewMember({ id, agency: 'NASA' })))
        .mockImplementationOnce((id: string) => Promise.resolve(mockCrewMember({ id, agency: 'ESA' })))
        .mockImplementationOnce((id: string) => Promise.resolve(mockCrewMember({ id, agency: 'NASA' })));
      await expect(getUpcomingNasaCrewMemberCount()).resolves.toEqual(2);
    });

    it('should throw error if fetching fails', async () => {
      const error = new Error();
      getUpcomingLaunchesMock.mockImplementationOnce(() => Promise.resolve([
        mockLaunch({ upcoming: true, crew: ['crew-member-id-1', 'crew-member-id-2'] }),
      ]));
      getCrewMemberMock.mockImplementation(() => Promise.reject(error));
      await expect(getUpcomingNasaCrewMemberCount()).rejects.toEqual(error);
    });
  });
});
