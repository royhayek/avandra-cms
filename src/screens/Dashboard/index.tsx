// Packages
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import React, { useEffect, useMemo } from 'react';

// Components
import Card from 'shared/components/Card';
import DnsIcon from '@mui/icons-material/Dns';
import StatsCard from './components/StatsCard';
import BarChart from 'shared/components/Charts/Bar';
import DataTable from 'shared/components/DataTable';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Grid, Typography, useTheme } from '@mui/material';
import CustomArea from 'shared/components/Charts/CustomArea';

// Utilities
import useStyles from './styles';
import { getDashboard } from 'redux/dashboard/slice';
import { useCommonStyles } from 'shared/assets/styles';
import { getDashboardList } from 'redux/dashboard/thunks';
import { AppThunkDispatch, useAppSelector } from 'app/store';
import { getUserAuthenticated } from 'redux/services/auth/slice';
import { CHART_DATA, BAR_CHART_DATA, DASHBOARD_TABLE_DATA } from 'shared/constants/mock';

// Component

const Dashboard = () => {
  // Redux
  const dispatch = useDispatch<AppThunkDispatch>();

  const authenticated = useAppSelector(getUserAuthenticated);
  const dashboard = useAppSelector(getDashboard);

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
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'firstName', headerName: 'First name', width: 130 },
      { field: 'lastName', headerName: 'Last name', width: 130 },
      { field: 'age', headerName: 'Age', type: 'number', width: 90 },
      {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
      }
    ],
    []
  );

  const summaryCardsData = useMemo(() => {
    const { usersCount, destinationsCount } = dashboard;

    return [
      {
        title: 'Users',
        icon: <PeopleIcon />,
        padding: theme.spacing(0),
        value: usersCount
      },
      {
        title: 'Destinations',
        icon: <DnsIcon />,
        padding: theme.spacing(0),
        value: destinationsCount
      },
      {
        title: 'Trips',
        icon: <ListAltIcon />,
        padding: theme.spacing(0),
        value: 1000
      },
      {
        title: 'Reports',
        icon: <DnsIcon />,
        padding: theme.spacing(0),
        value: 10
      }
    ];
  }, [dashboard, theme]);

  const tableProps = useMemo(
    () => ({
      data: DASHBOARD_TABLE_DATA,
      columns: tableHeaders,
      options: {
        withoutHeader: true
      }
    }),
    [tableHeaders]
  );

  // Renderers
  return (
    <>
      <Typography variant="h5" className={classes.header}>
        Dashboard
      </Typography>

      <Grid container spacing={4}>
        {_.map(summaryCardsData, ({ title, icon, padding, value }) => (
          <Grid item key={title} xs={12} sm={12} md={3}>
            <StatsCard icon={icon} title={title} value={value} padding={padding} />
          </Grid>
        ))}

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
            <DataTable {...tableProps} />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
