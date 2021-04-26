import {
  Card,
  CardContent,
  Container,
  Grid,
  ThemeProvider,
  Typography,
  makeStyles,
  AppBar,
  Select,
  MenuItem,
  FormControl,
  Box,
  TextField
} from "@material-ui/core";
import {Autocomplete} from '@material-ui/lab'
import { Fragment, useState, useEffect } from "react";
import { theme } from "./Theme";
import CountUp from "react-countup";
import Infected from "./components/Infected";
import Deaths from "./components/Deaths";
import Recovered from "./components/Recovered";
import LineGraph from "./components/Linegraph";
import { statesList } from "./Data/List";
import {STATE_NAMES} from './Data/List'
const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
  },
  grid: {
    paddingTop: "10vh",
    //height: '100vh',
    backgroundColor: theme.palette.background.default,
    boxShadow: "none",
  },
  title: {
    textAlign: "center",
    paddingTop: 40,
    marginBottom: '10vh'
  },
  formControl: {
    textAlign: "center",
    minWidth: "100%",
  },
  hover: {
    '&:hover':{
    padding: 10
    }
  }
}));
function App() {
  const classes = useStyles();
  const [country, setInputCountry] = useState("Global");
  //const [cases, setCases] = useState("cases");
  const [cases, setCases] = useState();
  const [stateCases, setStateCases] = useState();
  const [countries, setCountries] = useState();
  const [summaryData, setSummaryData] = useState([]);
  const [state, setState] = useState("");
  const [stateCode, setStateCode] = useState('')
  const [individualStateCases, setIndividualStateCases]= useState()
  const [timelineData, setTimelineData] = useState()
  const [caseType, setCaseType] = useState('confirmed')
  useEffect(()=>{
    const individualStatestimeWiseData = async()=>{
      let res = await fetch("https://api.covid19india.org/v4/min/timeseries.min.json")
      let data = await res.json();
      console.log(data)
      setIndividualStateCases(data)
    }
    individualStatestimeWiseData()
  },[])
  const flatProps1 = {
    options:countries!==undefined? countries.map((country) => country.Country):null,
  };

  const flatProps2 = {
    options:statesList.map((state) => state),
  };
  useEffect(() => {
    const indianStatesData = async () => {
      let resp = await fetch("https://api.covid19india.org/data.json");
      let data = await resp.json();
      console.log(data.statewise);
      setStateCases(data.statewise);
    };
    indianStatesData();
  },[]);
  useEffect(() => {
    const fetchData = async () => {
      let resp = await fetch("https://api.covid19api.com/summary");
      let data = await resp.json();
      console.log(data);
      setSummaryData(data);
      setCases(data.Global);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchCountries = async () => {
      let resp = await fetch("https://api.covid19api.com/countries");
      let data = await resp.json();
      let arr = [{Country:'Global'}]
      // data = arr.concat(data)
      // setCountries(data);
      setCountries(arr.concat(data))
    };
    fetchCountries();
  }, []);
  const onStateChange = async (newValue) => {
    let state = newValue
    console.log(state)
    let statesData = stateCases.find(item=>item.state===state)
    setCases(statesData)
    setState(state)
    for(let key in STATE_NAMES){
      if(STATE_NAMES.hasOwnProperty(key)){
          //console.log(key, STATE_NAMES[key])
      if(STATE_NAMES[key]===state){
        setStateCode(key)
        console.log(individualStateCases[key])
        setTimelineData(individualStateCases[key])
      }
      }
  }
  };
  const onCountryChange = async (newValue) => {
   
    const countryName = newValue;

    console.log(summaryData.Global);
    let casesData =
      countryName === "Global"
        ? summaryData.Global
        : summaryData.Countries.find((item) => item.Country === countryName);
    setInputCountry(countryName);
    console.log(casesData);
    setCases(casesData);
  };
  console.log(cases);
  
const handleClick = ()=>{
  console.log('bhanu')
}

  return (
    <Fragment>
      <Typography className={classes.title} variant='h4'>
        COVID-19 TRACKER
      </Typography>

      <Container maxWidth='xl' className={classes.container}>
        <Grid container spacing={3} justify='flex-end'>
          <Grid xs={0} md={3}></Grid>
        <Grid item xs={12} md={3}>
            {/* <FormControl className={classes.formControl}>
              <Select value={country} onChange={onCountryChange} variant='outlined'>
                <MenuItem value='Global'>Global</MenuItem>
                {countries !== undefined
                  ? countries.map((country) => (
                      <MenuItem value={country.Country}>
                        {country.Country}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl> */}
           {countries!==undefined? <Autocomplete
        //{...flatProps1}
        options = {countries.map((country) => country.Country)}
        defaultValue={countries[0]}
        id="flat-demo"
        onChange={(event, newValue)=>{
          onCountryChange(newValue)
        }}
        renderInput={(params) => <TextField {...params} label="Select a Country" margin="normal" variant='outlined'/>}
      />:null}
            </Grid>
            <Grid item xs={12} md= {3}>
            {country === "India" ? (
              // <FormControl className={classes.formControl}>
              //   <Select value={state} onChange={onStateChange} variant='outlined'>
              //     {statesList.map((state) => (
              //       <MenuItem value={state}>{state}</MenuItem>
              //     ))}
              //   </Select>
              // </FormControl>
              <Autocomplete
        {...flatProps2}
     
        onChange={(event, newValue)=>{
          onStateChange(newValue)
        }}
        renderInput={(params) => <TextField {...params} label="Select a State" margin="normal" variant='outlined'/>}
      />
            ) : null}
            </Grid>
          <Grid xs={0} md={3}></Grid>
        </Grid>
        <Grid
          container
          spacing={4}
          component={Card}
          justify='center'
          className={classes.grid}
        >
          
          
          
          <Grid item xs={12} md={3} onClick={()=>{setCaseType('confirmed')}} className={classes.hover}>
            <Infected cases={cases} />
          </Grid>
          <Grid item xs={12} md={3} className={classes.hover} onClick={()=>{setCaseType('recovered')}}>
            <Recovered cases={cases} />
          </Grid>
          <Grid item xs={12} md={3} className={classes.hover} onClick={()=>{setCaseType('deceased')}}>
            <Deaths cases={cases} />
          </Grid>
          <Grid item xs ={12}>
          {timelineData!==undefined?<LineGraph timelineData={timelineData} caseType={caseType}/>:<Fragment></Fragment>}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
           {/* {timelineData!==undefined?<LineGraph timelineData={timelineData} caseType={caseType}/>:<Fragment></Fragment>} */}
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}

export default App;
