import {
    Button,
    Container,
    makeStyles,
    Paper,
    Typography,
    Grid,
    Avatar,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    RadioGroup,
    FormControlLabel,
    Radio,
    DialogActions,
    Slider,
    Input,
    TextField,
    Checkbox,
    AppBar,
    Toolbar,
    useScrollTrigger,
    InputAdornment, withStyles, Tooltip,
} from "@material-ui/core";
import {ToggleButtonGroup, ToggleButton} from '@material-ui/lab'
import {cloneElement, useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {shift as shiftData, perActiveClientsPayout} from "../constants/Data";

const useStyles = makeStyles((theme) => ({
    root: {},
    container: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(3, 5)
    },
    stepper: {
        padding: theme.spacing(3, 0)
    },
    navigationButtons: {
        marginTop: theme.spacing(5),
        display: "flex",
        justifyContent: "stretch"
    },
    backNavigationButton: {
        marginRight: theme.spacing(1)
    },
    coachSelector: {},
    clients: {
        marginTop: theme.spacing(2)
    },
    sliderInput: {
        width: 42,
        marginLeft: theme.spacing(6),
    },
    avatarLarge: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    }
}))

function ElevationScroll(props) {
    const {children} = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const StyledToggleButtonGroup = withStyles((theme) => ({
    root: {
        border: "none"
    },
    grouped: {
        margin: theme.spacing(0.5, 2),
        border: "none",
        "&:not(:first-child)": {
            width: theme.spacing(11),
            height: theme.spacing(11),
            borderRadius: "100%"
        },
        "&:first-child": {
            width: theme.spacing(11),
            height: theme.spacing(11),
            borderRadius: "100%"
        }
    }
}))(ToggleButtonGroup);

export default function Home(props) {
    const classes = useStyles()
    const [coach, setCoach] = useState("junior")
    const [activeClients, setActiveClients] = useState(1)
    const [npsSlab, setNpsSlab] = useState(30)
    const [newSaleRev, setNewSaleRev] = useState(0)
    const [referralRev, setReferralRev] = useState(0)
    const [renewRev, setRenewRev] = useState(0)
    const [shift, setShift] = useState("shift1")
    const [textTestimonials, setTextTestimonials] = useState(0)
    const [videoTestimonials, setVideoTestimonials] = useState(0)
    const [targetAchieved, setTargetAchieved] = useState(false)

    const activeClientsMarks = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 50,
            label: '50',
        },
        {
            value: 100,
            label: '100',
        },
        {
            value: 150,
            label: '150',
        },
        {
            value: 200,
            label: '200',
        },
        {
            value: 250,
            label: '250',
        },
        {
            value: 300,
            label: '300',
        },
    ];

    const npsSlabMarks = [3, 4, 5, 6, 7].map(e => ({
        value: e * 10,
        label: e === 7 ? `> ${e * 10}` : `${e * 10}`
    }))

    const handleResetData = () => {
        setActiveClients(1)
        setNpsSlab(30)
        setNewSaleRev(0)
        setReferralRev(0)
        setRenewRev(0)
        setShift("shift1")
    }

    const handleCoachSelect = (e, coachValue) => {
        if (coachValue)
            setCoach(coachValue)
    }

    const handleActiveClientsSliderChange = (event, value) => {
        setActiveClients(value)
    }

    const handleActiveClientsInputChange = (event) => {
        setActiveClients(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleActiveClientsBlur = () => {
        if (activeClients < 0) {
            setActiveClients(0);
        } else if (activeClients > 300) {
            setActiveClients(300);
        }
    };

    const handleNpsSlabSliderChange = (event, value) => {
        setNpsSlab(value)
    }

    const handleNpsSlabInputChange = (event) => {
        setNpsSlab(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleNpsSlabBlur = () => {
        if (npsSlab < 30) {
            setNpsSlab(30);
        } else if (npsSlab > 70) {
            setNpsSlab(70);
        }
    }

    const handleNewSaleRevChange = (event) => {
        setNewSaleRev(event.target.value === '' ? '' : Number(event.target.value))
    }

    const handleReferralRevChange = (event) => {
        setReferralRev(event.target.value === '' ? '' : Number(event.target.value))
    }

    const handleRenewRevChange = (event) => {
        setRenewRev(event.target.value === '' ? '' : Number(event.target.value))
    }

    const handleShiftChange = (event) => {
        setShift(event.target.value)
    }

    const handleTargetReachedChange = (event) => {
        setTargetAchieved(event.target.checked)
    }

    const getClientsValueText = (value) => {
        return `${value} Clients`
    }

    const getNpsSlabValueText = (value) => {
        return `${value}%`
    }

    const clientIncentive = (clients) => perActiveClientsPayout[coach](npsSlab) * clients

    const revenueIncentive = () => (
        (0.15 * newSaleRev) +
        (0.3 * referralRev) +
        ((targetAchieved ? 0.2 : 0.15) * renewRev) +
        (renewRev >= 50000 && renewRev < 70000
            ? 2500
            :
            renewRev >= 70000 && renewRev < 100000
                ? 5000
                :
                renewRev >= 100000
                    ? 10000
                    : 0)
    )

    return <div className={classes.root}>
        <ElevationScroll {...props}>
            <AppBar color="default">
                <Toolbar>
                    <IconButton>
                        {/*<img*/}
                        {/*    src="https://www.whizsky.com/wp-content/uploads/2018/12/unnamed.jpg"*/}
                        {/*    alt="logo"*/}
                        {/*    height={50}*/}
                        {/*    width={50}*/}
                        {/*/>*/}
                        <img
                            src="https://healthifyme-public.s3-ap-southeast-1.amazonaws.com/static/images/landing-website/images/healthifyme_logo.png"
                            height={40}
                            alt="logo"
                        />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
        <Toolbar/>
        <Container maxWidth="sm" className={classes.container} component={Paper}>
            <Typography variant="h4" align="center" gutterBottom>
                Know your incentive
            </Typography>
            <div className={classes.clients}>
                <Grid container justify="center" spacing={2}>
                    <Grid id="couch-grid" item xs={12} className={classes.coachSelector} container justify="center">
                        <StyledToggleButtonGroup
                            value={coach}
                            exclusive
                            onChange={handleCoachSelect}
                            size="large"
                        >
                            <ToggleButton value="junior">
                                <Tooltip title="Junior">
                                    <Avatar className={classes.avatarLarge}>
                                        J
                                    </Avatar>
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton value="senior">
                                <Tooltip title="Senior">
                                    <Avatar className={classes.avatarLarge}>
                                        S
                                    </Avatar>
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton value="master">
                                <Tooltip title="Master">
                                    <Avatar className={classes.avatarLarge}>
                                        M
                                    </Avatar>
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton value="principle">
                                <Tooltip title="Principle">
                                    <Avatar className={classes.avatarLarge}>
                                        P
                                    </Avatar>
                                </Tooltip>
                            </ToggleButton>
                        </StyledToggleButtonGroup>
                    </Grid>
                    <Grid id="nps-slab-grid" item container>
                        <Typography id="nps-slab" gutterBottom>
                            NPS Slab
                        </Typography>
                        <Grid item xs={12} container>
                            <Grid item xs>
                                <Slider
                                    defaultValue={30}
                                    value={typeof npsSlab === 'number' ? npsSlab : 0}
                                    getAriaValueText={getNpsSlabValueText}
                                    aria-labelledby="nps-slab"
                                    valueLabelDisplay="auto"
                                    onChange={handleNpsSlabSliderChange}
                                    min={30}
                                    max={70}
                                    marks={npsSlabMarks}
                                />
                            </Grid>
                            <Grid item>
                                <Input
                                    className={classes.sliderInput}
                                    value={npsSlab}
                                    margin="dense"
                                    onChange={handleNpsSlabInputChange}
                                    onBlur={handleNpsSlabBlur}
                                    inputProps={{
                                        step: 10,
                                        min: 10,
                                        max: 100,
                                        type: 'number',
                                        'aria-labelledby': 'active-clients',
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid id="active-clients-grid" item container>
                        <Typography id="active-clients" align="justify" gutterBottom>
                            {`Active Clients ( ₹${clientIncentive(activeClients)} )`}
                        </Typography>
                        <Grid item xs={12} container>
                            <Grid item xs>
                                <Slider
                                    defaultValue={1}
                                    value={typeof activeClients === 'number' ? activeClients : 0}
                                    getAriaValueText={getClientsValueText}
                                    aria-labelledby="active-clients"
                                    valueLabelDisplay="auto"
                                    onChange={handleActiveClientsSliderChange}
                                    min={1}
                                    max={300}
                                    marks={activeClientsMarks}
                                />
                            </Grid>
                            <Grid item>
                                <Input
                                    className={classes.sliderInput}
                                    value={activeClients}
                                    margin="dense"
                                    onChange={handleActiveClientsInputChange}
                                    onBlur={handleActiveClientsBlur}
                                    inputProps={{
                                        step: 1,
                                        min: 1,
                                        max: 300,
                                        type: 'number',
                                        'aria-labelledby': 'active-clients',
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid id="revenue-grid" item container>
                        <Grid item xs={12} container justify="space-between">
                            <Typography id="revenue-label" gutterBottom>
                                {`Revenue ( ₹${(Math.round(revenueIncentive() * 100) / 100).toFixed(2)} )`}
                            </Typography>
                        </Grid>
                        <Grid item container spacing={4}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    id="new-sales-revenue"
                                    label="New Sales"
                                    inputProps={{
                                        type: 'number',
                                        'aria-labelledby': 'active-clients',
                                    }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                    }}
                                    value={newSaleRev}
                                    onChange={handleNewSaleRevChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    id="referral-revenue"
                                    label="Referral"
                                    inputProps={{
                                        type: 'number',
                                        'aria-labelledby': 'active-clients',
                                    }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                    }}
                                    value={referralRev}
                                    onChange={handleReferralRevChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    id="renewal-revenue"
                                    label="Renewal"
                                    inputProps={{
                                        type: 'number',
                                        'aria-labelledby': 'active-clients',
                                    }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                    }}
                                    value={renewRev}
                                    onChange={handleRenewRevChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid id="testimonials-grid" item container>
                        <Grid item xs={12}>
                            <Typography id="testimonials-label" gutterBottom>
                                Testimonials
                            </Typography>
                        </Grid>
                        <Grid item xs={12} container alignContent="center">
                            <Typography variant="body2">
                                {`Text`}
                            </Typography>
                            <IconButton size="small" onClick={() => {
                                if (textTestimonials < 10)
                                    setTextTestimonials(textTestimonials + 1)
                            }}>
                                <AddIcon fontSize="inherit"/>
                            </IconButton>
                            <Typography variant="body2">
                                {textTestimonials}
                            </Typography>
                            <IconButton size="small" onClick={() => {
                                if (textTestimonials > 0)
                                    setTextTestimonials(textTestimonials - 1)
                            }}>
                                <RemoveIcon fontSize="inherit"/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} container alignContent="center">
                            <Typography variant="body2">
                                {`Video`}
                            </Typography>
                            <IconButton size="small" onClick={() => {
                                if (videoTestimonials < 10)
                                    setVideoTestimonials(videoTestimonials + 1)
                            }}>
                                <AddIcon fontSize="inherit"/>
                            </IconButton>
                            <Typography variant="body2">
                                {videoTestimonials}
                            </Typography>
                            <IconButton size="small" onClick={() => {
                                if (videoTestimonials > 0)
                                    setVideoTestimonials(videoTestimonials - 1)
                            }}>
                                <RemoveIcon fontSize="inherit"/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid id="shift-grid" item xs={12}>
                        <Typography id="shift-label" gutterBottom>
                            {`Shift ( ₹${shiftData[shift].payout[coach]} )`}
                        </Typography>
                        <RadioGroup aria-label="shift" name="shift" row value={shift} onChange={handleShiftChange}>
                            <FormControlLabel value="shift1" control={<Radio size="small"/>}
                                              label="Shift 1"/>
                            <FormControlLabel value="shift2" control={<Radio size="small"/>}
                                              label="Shift 2"/>
                            <FormControlLabel value="shift3" control={<Radio size="small"/>}
                                              label="Shift 3"/>
                            <FormControlLabel value="shift4" control={<Radio size="small"/>}
                                              label="Shift 4"/>
                        </RadioGroup>
                    </Grid>
                    <Grid id="checkbox-grid" item xs>
                        <FormControlLabel
                            control={<Checkbox name="checkedH"/>}
                            label="Renewal target reached"
                            onChange={handleTargetReachedChange}
                        />
                    </Grid>
                </Grid>
            </div>
            <div className={classes.navigationButtons}>
                <Button color="primary" onClick={handleResetData}>Reset< /Button>
            </div>
        </Container>
    </div>;
}
