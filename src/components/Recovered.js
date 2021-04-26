import React from "react";
import {
  Card,
  CardContent,
  Container,
  Grid,
  ThemeProvider,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CountUp from "react-countup";
import { green } from "@material-ui/core/colors";
import numeral from 'numeral'
const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "green",

    [theme.breakpoints.up("xs")]: {
      height: 250,
      width: 350,
      //backgroundColor: theme.palette.primary.light,
    },

    [theme.breakpoints.up("md")]: {
      height: "50vh",
      width: "100%",
      //backgroundColor: theme.palette.secondary.light,
    },
    [theme.breakpoints.down("md")]: {
      height: "40vh",
      width: "100%",
      //backgroundColor: theme.palette.secondary.light,
    },
    [theme.breakpoints.up("lg")]: {
      height: "40vh",
      width: "100%",
      //backgroundColor: theme.palette.secondary.light,
    },
    [theme.breakpoints.down("lg")]: {
      height: "40vh",
      width: "100%",
      //backgroundColor: theme.palette.secondary.light,
    },
    "&:hover": {
      backgroundColor: green[600],
    },
  },
}));
const Recovered = ({ cases }) => {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Box pl={3}>
            <Box p={1}>
              <Typography color='textSecondary' gutterBottom variant='h6'>
                Recovered
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant='h5'>
                <CountUp
                  start={0}
                  end={
                    cases !== undefined
                      ? cases.TotalRecovered || cases.recovered
                      : 0
                  }
                  duration={2.75}
                  seperator=','
                ></CountUp>
              </Typography>
            </Box>
            <Box p={1}>
              <Typography color='textSecondary'>
                {new Date().toDateString()}
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant='body2' component='p'>
                Number of deaths caused by COVID-19
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Recovered;
