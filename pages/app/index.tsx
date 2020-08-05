import { Button, Paper, createStyles, Grid, makeStyles, Theme, IconButton, InputBase, Container, Typography, Box } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { appendBaseURL } from '../../src/utils/url';
import StackGrid, { easings, transitions } from 'react-stack-grid';
import SearchIcon from '@material-ui/icons/Search';
import { ChainContext } from '../_app';
import CategoryIcon from '@material-ui/icons/Category';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            height: '23vh',
            width: '20vw',
            minWidth: '10rem',
            cursor: 'pointer',
        },
        control: {
            padding: theme.spacing(2),
        },
        formContainer:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        form:{
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
        },
        input:{
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        storeContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        store: {
            overflow: 'hidden',
            display: 'grid',
            '& img': {
                gridColumn: '1 / -1',
                gridRow: '1 / -1',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                top: '10px',
            },
            gridColumn: 'span 2',
        },
        logo: {
            display: 'grid',
            objectFit: 'cover',
            gridColumn: 'span 6',
            alignSelf: 'center',
            justifySelf: 'center',
        },
    })
);

export const Home = (): JSX.Element => {
    const chainContext = useContext(ChainContext);
    const classes = useStyles();
    const [search, setSearch] = useState('');

    const transition = transitions['fadeDown'];
    // TODO: load stores into stackgrid
    return (
        <Container maxWidth="lg">
            <Grid
                container
                justify="center"
                spacing={5}
                style={{
                    marginTop: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Button variant="contained" color="primary" href={appendBaseURL('app/user', true)}>
                Go Profile
            </Button>
                <Grid item xs={12} className={classes.formContainer}>
                <Paper component="form" className={classes.form}>
                    <InputBase
                        className={classes.input}
                        placeholder="Search Decentramall Stores"
                        inputProps={{ 'aria-label': 'search stores' }}
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={12} style={{display: 'flex', flexDirection: 'column'}}>
                    <Box fontWeight="bold" fontSize="1.2rem" textAlign="center">
                        Stores Currently Open
                    </Box>
                <StackGrid
                    duration={480}
                    columnWidth={'33.33%'} 
                    gutterWidth={5}
                    gutterHeight={5}
                    easing={easings.quartOut}
                    appear={transition.appear}
                    appeared={transition.appeared}
                    enter={transition.enter}
                    entered={transition.entered}
                    leaved={transition.leaved}
                    rtl={false}
                    style={{marginTop: '2rem'}}
                >
                    {chainContext.spaces.filter(space => 
                        space.rent?.title.toLowerCase().includes(search.toLowerCase())).map((space) => (
                            <Grid key={space.tokenId} item xs={3}>
                                <Paper className={classes.paper}>
                                    {/* <img height="95" src={choice.picture} /> */}
                                    <Typography component="div" gutterBottom className={classes.storeContainer}>
                                        <Box fontWeight="bold" fontSize="1.5rem" style={{margin: '1rem'}}>
                                            {space.rent.title}
                                        </Box>
                                        <Box fontSize="1rem" style={{margin: '1rem'}}>
                                            {space.rent.description}
                                        </Box>
                                        <Box fontSize="1rem" style={{margin: '1rem'}}>
                                            Category: {space.rent.category}
                                        </Box>
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))
                    }
                </StackGrid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
