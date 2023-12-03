// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import CustomArea from 'shared/components/Charts/CustomArea';
import { Grid, Typography, useTheme } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BarChart from 'shared/components/Charts/Bar';
import DataTable from 'shared/components/DataTable';
import PeopleIcon from '@mui/icons-material/People';
import StatsCard from './components/StatsCard';
import DnsIcon from '@mui/icons-material/Dns';
import Card from 'shared/components/Card';
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { CHART_DATA, BAR_CHART_DATA, DASHBOARD_TABLE_DATA } from 'shared/constants/mock';
import { getUserAuthenticated } from 'redux/services/auth/slice';
import { AppThunkDispatch, useAppSelector } from 'app/store';
import { getDashboardList } from 'redux/dashboard/thunks';
import { useCommonStyles } from 'shared/assets/styles';
import { getDashboard } from 'redux/dashboard/slice';
import useStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //

const Dashboard = () => {
  // --------------------------------------------------------- //
  // ------------------------ Redux -------------------------- //
  const dispatch = useDispatch<AppThunkDispatch>();

  const authenticated = useAppSelector(getUserAuthenticated);
  const dashboard = useAppSelector(getDashboard);
  // ----------------------- /Redux -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Statics ------------------------- //
  const theme = useTheme();
  const styles = useStyles();
  const commonSyles = useCommonStyles();
  const classes = { ...styles, ...commonSyles };
  // ---------------------- /Statics ------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ Effects ------------------------ //
  useEffect(() => {
    authenticated && dispatch(getDashboardList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);
  // ----------------------- /Effects ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // --------------------- Renderers Vars -------------------- //
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
    const { usersCount } = dashboard;

    return [
      {
        title: 'Users',
        icon: <PeopleIcon />,
        padding: theme.spacing(0),
        value: usersCount
      },
      {
        title: 'Categories',
        icon: <DnsIcon />,
        padding: theme.spacing(0),
        value: 20
      },
      {
        title: 'Posts',
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
  // -------------------- /Renderers Vars -------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
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
