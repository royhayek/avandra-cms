// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useMemo, useCallback } from "react";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Grid, Typography } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import DnsIcon from "@mui/icons-material/Dns";
import Card from "../../components/Card";
import StatsCard from "./components/StatsCard";
import BarChart from "../../components/Charts/Bar";
import DataTable from "../../components/DataTable";
import CustomArea from "../../components/Charts/CustomArea";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import {
  BAR_CHART_DATA,
  CHART_DATA,
  DASHBOARD_TABLE_DATA,
} from "../../data.js";
import { useCommonStyles } from "lib/styles";
import useStyles from "./styles.js";

// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //

const Dashboard = () => {
  // --------------------------------------------------------- //
  // ------------------------ Static ------------------------- //
  const styles = useStyles();
  const commonSyles = useCommonStyles();
  const classes = { ...styles, ...commonSyles };
  // ----------------------- /Static ------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Callbacks ----------------------- //
  const getTableHeaders = useCallback(() => {
    return [
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
        valueGetter: (params) =>
          `${params.row.firstName || ""} ${params.row.lastName || ""}`,
      },
    ];
  }, []);
  // ---------------------- /Callbacks ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
  const renderContent = useMemo(() => {
    const data = DASHBOARD_TABLE_DATA,
      columns = getTableHeaders();

    const tableProps = {
      data,
      columns,
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
          <Grid item xs={12} sm={12} md={3}>
            <StatsCard title="Users" icon={<PeopleIcon />} value={100} />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <StatsCard title="Categories" icon={<DnsIcon />} value={20} />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <StatsCard title="Posts" icon={<ListAltIcon />} value={20} />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <StatsCard title="Categories" icon={<DnsIcon />} value={20} />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Card className={classes.card}>
              {/* <Button variant="contained" disableElevation>
                Month
              </Button>
              <Button>Week</Button>
              <Button>Year</Button> */}
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
  }, [classes.card, classes.header, getTableHeaders]);

  return renderContent;
};

export default Dashboard;
