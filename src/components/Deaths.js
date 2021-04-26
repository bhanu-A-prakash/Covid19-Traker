import React from "react";
import {
  Card,
  CardContent,
  Container,
  Grid,
  ThemeProvider,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";
import CountUp from "react-countup";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.error.main,
    '&:hover':{
      backgroundColor: theme.palette.error.light
    },
    [theme.breakpoints.up("xs")]: {
      height: 250,
      width: 350,
      //backgroundColor: theme.palette.primary.light,
    },

    [theme.breakpoints.up("md")]: {
      height: "50vh",
      width: "100%",
     // backgroundColor: theme.palette.secondary.light,
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
     // backgroundColor: theme.palette.secondary.light,
    },
  },
}));
const Deaths = ({cases}) => {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Box pl={3}>
            <Box p={1}>
              <Typography color='textSecondary' gutterBottom variant='h6'>
                Deaths
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant='h5'>
                <CountUp
                  start={0}
                  end={cases!==undefined?cases.TotalDeaths||cases.deaths:0}
                  duration={2}
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
              <Typography variant='body2' component='p'>Number of deaths caused by COVID-19</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Deaths;
