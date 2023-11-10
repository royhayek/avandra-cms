// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useMemo } from "react";
import _ from "lodash";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import CustomArea from "../../components/Charts/CustomArea";
import { Grid, Typography, useTheme } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import BarChart from "../../components/Charts/Bar";
import DataTable from "../../components/DataTable";
import StatsCard from "./components/StatsCard";
import DnsIcon from "@mui/icons-material/Dns";
import Card from "../../components/Card";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { CHART_DATA, BAR_CHART_DATA, DASHBOARD_TABLE_DATA } from "../../data";
import { useCommonStyles } from "lib/styles/index.ts";
import useStyles from "./styles.ts";
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
const Dashboard = () => {
  // --------------------------------------------------------- //
  // ----------------------- Statics ------------------------- //
  const theme = useTheme();
  const styles = useStyles();
  const commonSyles = useCommonStyles();
  const classes = { ...styles, ...commonSyles };
  // ---------------------- /Statics ------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // --------------------- Renderers Vars -------------------- //
  const tableHeaders = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "firstName", headerName: "First name", width: 130 },
      { field: "lastName", headerName: "Last name", width: 130 },
      { field: "age", headerName: "Age", type: "number", width: 90 },
      {
        field: "fullName",
        headerName: "Full name",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 160,
        valueGetter: params => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
      },
    ],
    [],
  );

  const summaryCardsData = useMemo(
    () => [
      {
        title: "Users",
        icon: <PeopleIcon />,
        padding: theme.spacing(0),
        value: 100,
      },
      {
        title: "Categories",
        icon: <DnsIcon />,
        padding: theme.spacing(0),
        value: 20,
      },
      {
        title: "Posts",
        icon: <ListAltIcon />,
        padding: theme.spacing(0),
        value: 1000,
      },
      {
        title: "Reports",
        icon: <DnsIcon />,
        padding: theme.spacing(0),
        value: 10,
      },
    ],
    [theme],
  );
  // -------------------- /Renderers Vars -------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
  const renderContent = useMemo(() => {
    const tableProps = {
      data: DASHBOARD_TABLE_DATA,
      columns: tableHeaders,
      options: {
        withoutHeader: true,
      },
    };
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
            <Card className={classes.card}>
              <Typography variant="subtitle1">Traffic</Typography>
              <CustomArea data={CHART_DATA} height={350} />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Card className={classes.card}>
              <Typography variant="subtitle1">Devices</Typography>
              <BarChart data={BAR_CHART_DATA} height={350} />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Card className={classes.card}>
              <Typography variant="subtitle1">Latest Posts</Typography>
              <DataTable {...tableProps} />
            </Card>
          </Grid>
        </Grid>
      </>
    );
  }, [tableHeaders, summaryCardsData, classes.header, classes.card]);

  return renderContent;
};

export default Dashboard;
