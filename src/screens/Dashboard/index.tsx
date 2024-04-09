// Packages
import _ from 'lodash';
import React, { useEffect, useMemo } from 'react';

// Components
import Card from 'shared/components/Card';
import StatsCard from './components/StatsCard';
import PlaceIcon from '@mui/icons-material/Place';
import BarChart from 'shared/components/Charts/Bar';
import DataTable from 'shared/components/DataTable';
import PeopleIcon from '@mui/icons-material/People';
import FlightIcon from '@mui/icons-material/Flight';
import { Grid, Typography, useTheme } from '@mui/material';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import CustomArea from 'shared/components/Charts/CustomArea';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';

// Utilities
import useStyles from './styles';
import { getDashboard } from 'redux/dashboard/slice';
import { useCommonStyles } from 'shared/assets/styles';
import { getDashboardList } from 'redux/dashboard/thunks';
import { useAppSelector, useAppThunkDispatch } from 'app/store';
import { getUserAuthenticated } from 'redux/services/auth/slice';
import { CHART_DATA, BAR_CHART_DATA, DASHBOARD_TABLE_DATA } from 'shared/constants/mock';

// Component

const Dashboard = () => {
  // Redux
  const dispatch = useAppThunkDispatch();

  const dashboard = useAppSelector(getDashboard);
  const authenticated = useAppSelector(getUserAuthenticated);

  // Statics
  const theme = useTheme();
  const styles = useStyles();
  const commonSyles = useCommonStyles();
  const classes = { ...styles, ...commonSyles };

  // Effects
  useEffect(() => {
    authenticated && dispatch(getDashboardList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  // Renderers Vars
  const tableHeaders = useMemo(
    () => [
      { field: 'firstName', headerName: 'First name', flex: 1, width: 130 },
      { field: 'lastName', headerName: 'Last name', flex: 1, width: 130 },
      { field: 'age', headerName: 'Age', type: 'number', flex: 1, width: 90 },
      {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 1,
        width: 160,
        valueGetter: (params) => `${params.data.firstName || ''} ${params.data.lastName || ''}`
      }
    ],
    []
  );

  const summaryCardsData = useMemo(() => {
    const { usersCount, adminsCount, destinationsCount, tripsCount, unreadMessagesCount } = dashboard;

    return [
      {
        title: 'Users',
        icon: <PeopleIcon />,
        padding: theme.spacing(0),
        value: usersCount
      },
      {
        title: 'Admins',
        icon: <SupervisorAccountIcon />,
        padding: theme.spacing(0),
        value: adminsCount
      },
      {
        title: 'Destinations',
        icon: <PlaceIcon />,
        padding: theme.spacing(0),
        value: destinationsCount
      },
      {
        title: 'Trips',
        icon: <FlightIcon />,
        padding: theme.spacing(0),
        value: tripsCount
      },
      {
        title: 'Unread Messages',
        icon: <MarkUnreadChatAltIcon />,
        padding: theme.spacing(0),
        value: unreadMessagesCount
      },
      {
        title: 'Devices',
        icon: <SmartphoneIcon />,
        padding: theme.spacing(0),
        value: 205
      }
    ];
  }, [dashboard, theme]);

  const tableProps = {
    data: DASHBOARD_TABLE_DATA,
    columns: tableHeaders,
    loading: false,
    options: {
      withoutHeader: true
    }
  };

  // Renderers
  return (
    <>
      <Typography variant="h5" className={classes.header}>
        Dashboard
      </Typography>

      <Grid container spacing={4} mb={4}>
        {_.map(summaryCardsData, ({ title, icon, padding, value }) => (
          <Grid item key={title} xs={12} sm={12} md={3}>
            <StatsCard icon={icon} title={title} value={value} padding={padding} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={8}>
          <Card>
            <Typography variant="subtitle1">Traffic</Typography>
            <CustomArea data={CHART_DATA} height={350} />
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Card>
            <Typography variant="subtitle1">Devices</Typography>
            <BarChart data={BAR_CHART_DATA} height={350} />
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Card>
            <Typography variant="subtitle1">Latest Posts</Typography>
            <DataTable tableProps={tableProps} />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
