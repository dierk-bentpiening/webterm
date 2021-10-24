import {createSelector} from 'reselect';
import {webtermState} from './hyper';

const getTermGroups = ({termGroups}: Pick<webtermState, 'termGroups'>) => termGroups.termGroups;
export const getRootGroups = createSelector(getTermGroups, (termGroups) =>
  Object.keys(termGroups)
    .map((uid) => termGroups[uid])
    .filter(({parentUid}) => !parentUid)
);
