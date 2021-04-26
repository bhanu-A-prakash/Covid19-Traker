import { Scale } from "chart.js";

export const cardStyles = (theme, color, component) => {
  return {
    [theme.breakpoints.up("xs")]: {
      height: 250,
      width: 350,
      backgroundColor: theme.palette.primary.main,
    },

    [theme.breakpoints.up("md")]: {
      height: "50vh",
      width: "100%",
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.down("md")]: {
      height: "40vh",
      width: "100%",
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up("lg")]: {
      height: "40vh",
      width: "100%",
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.down("lg")]: {
      height: "40vh",
      width: "100%",
      backgroundColor: theme.palette.secondary.main,
    },
    
    '&:hover':{
      backgroundColor: theme.palette.secondary.light,
       //height: '35vh',
      // width: '120%',
      padding: 10
      
    },
    transistion: 'transform .2s'
  };
};
