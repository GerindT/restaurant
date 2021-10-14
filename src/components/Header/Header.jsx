import React, { useState , useEffect } from 'react';
import LocationIQ from 'react-native-locationiq-autocomplete';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles'

const Header = ({ setCoordinates }) => {
    LocationIQ.init("92a0df9de5f33a")
    const classes = useStyles();
  
    const [title, setTitle] = useState('')

    // const onLoad = (autoC) => setAutoComplete(autoC);
   
    const onPlaceChanged = (event) =>
     {
       
        // setTitle(e.target.value)
        LocationIQ.search(title)
		.then(json => {
			const lat = Math.floor(json[0].lat * 1000)/1000;
			const lng = Math.floor(json[0].lon* 1000)/1000;
			console.log(lat, lng);
            setCoordinates({ lat:lat, lng:lng });
		})
		.catch(error => console.warn(error));
        // const lat = autoComplete.getPlace().geometry.location.lat();
        // const lng = autoComplete.getPlace().geometry.location.lng();

       
        event.preventDefault()
    }
    // useEffect(onPlaceChanged, [title])

  
    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    Travel Advisor
                </Typography>
                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Explore new places
                    </Typography>
                        <form onSubmit={onPlaceChanged} > 
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase placeholder="Search ..." onChange={event => setTitle(event.target.value)} classes={{ root: classes.inputRoot, input: classes.inputInput }} />
                                
                            </div>
                        </form>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
