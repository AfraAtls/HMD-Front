import Grid from './Grid/Grid';
import ActivitiesGraph from './ActivitiesGraph/ActivitiesGraph';
import HydrationsGraph from './HydrationsGraph/HydrationsGraph';
import SmokesGraph from './SmokesGraph/SmokesGraph';
import SleepGraph from './SleepsGraph/SleepsGraph';
import DrugsGraph from './DrugsGraph/DrugsGraph';
import FoodGraph from './FoodGraph/FoodGraph';
import {
  sleepChartData,
  smokeChartData,
  hydrationsChartData,
  activitiesChartData,
  mergeData,
} from '../../utils/chartsData';
import { useAppSelector } from '../../store/hooks';
import { selectHydrations, selectSleeps, selectSmokes, selectSports } from '../../reducers/user/userSlice';

export default function DashboardPage(): JSX.Element {
  const smokeData = smokeChartData(useAppSelector(selectSmokes));
  const { sleepDates, sleepQualities, sleepAmounts } = sleepChartData(useAppSelector(selectSleeps));
  const hydrationData = hydrationsChartData(useAppSelector(selectHydrations));
  const { activitiesPercentages, activitiesLabels } = activitiesChartData(useAppSelector(selectSports));

  return (
    <Grid>
      <FoodGraph />

      {activitiesPercentages && (
        <ActivitiesGraph
          labels={activitiesLabels}
          percentages={activitiesPercentages}
        />
      )}

      <HydrationsGraph
        dates={hydrationData.dates}
        amounts={hydrationData.data}
      />

      {sleepDates.length > 0 && (
        <SleepGraph
          dates={sleepDates}
          amounts={sleepAmounts}
          qualities={sleepQualities}
        />
      )}

      <DrugsGraph />
      <SmokesGraph
        dates={smokeData.dates}
        amounts={smokeData.data}
      />
    </Grid>
  );
}
