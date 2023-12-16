import './NavigationBar.css';
import {Button, ButtonGroup, Grid, Sheet, Stack} from "@mui/joy";
import {Link} from "react-router-dom";

const NavigationBar = () => {
    return (
        <nav className="navbar">
            <Grid container spacing={3} sx={{flexGrow:1}}>
                <Grid xs>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}>
                        <Button size="lg" component={Link} to="/login">Login</Button>
                        <Button size="lg" component={Link} to="/signup">Signup</Button>
                    </Stack>
                </Grid>
                <Grid xs={6} sx={{alignItems: 'center'}}>
                    <Sheet sx={{ backgroundColor: 'rgba(255, 255, 255, 0)'}}>
                        <ButtonGroup
                            buttonFlex={1}
                            color="primary"
                            disabled={false}
                            orientation="horizontal"
                            size="lg"
                            variant="soft"
                            sx={{ '--ButtonGroup-radius': '40px' }}
                        >
                            <Button component={Link} to="/map">Map</Button>
                            <Button component={Link} to="/account">Account</Button>
                            <Button component={Link} to="/inbox">Inbox</Button>
                        </ButtonGroup>
                    </Sheet>
                </Grid>
                <Grid xs>
                    <Sheet sx={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}>
                        <p>Hello,user</p>
                        <Button size="lg" component={Link} to="/login">Sign out</Button>
                    </Sheet>
                </Grid>
            </Grid>
        </nav>
    );
};

export default NavigationBar;
