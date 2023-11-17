import './NavigationBar.css';
import {Button, Grid, Sheet} from "@mui/joy";

const NavigationBar = () => {
    return (
        <nav className="navbar">
            <Grid container spacing={3} sx={{flexGrow:1}}>
                <Grid xs>
                    <Sheet>
                        <Button>Login</Button>
                        <Button>Signup</Button>
                    </Sheet>
                </Grid>
                <Grid xs={6}>
                    <Sheet>
                        <a href="/map">Map</a>
                        <a href="/account">Account</a>
                        <a href="/inbox">Inbox</a>
                    </Sheet>
                </Grid>
                <Grid xs>
                    <Sheet>
                        <Button>Sign out</Button>
                    </Sheet>
                </Grid>
            </Grid>
        </nav>
    );
};

export default NavigationBar;
