import React from 'react'
import {
    Card,
    CardContent,
    Container,
    Grid,
    ThemeProvider,
    Typography,
    makeStyles,
    Box
  } from "@material-ui/core";
  import CountUp from "react-countup";

import { cardStyles } from '../styles.js/cardStyles';
  const useStyles = makeStyles((theme)=>({
      card: cardStyles(theme)
  }))
const Infected = ({cases}) => {
  
    const classes = useStyles()
    return (
      <div>
      <Card className={classes.card}>
        <CardContent>
          <Box pl={3}>
            <Box p={1}>
              <Typography color='textSecondary' gutterBottom variant='h6'>
                Infected
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant='h5'>
                <CountUp
                  start={0}
                  end={cases!==undefined?cases.TotalConfirmed||cases.confirmed:0}
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
              <Typography variant='body2' component='p'>Number of deaths caused by COVID-19</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
    )
}

export default Infected
