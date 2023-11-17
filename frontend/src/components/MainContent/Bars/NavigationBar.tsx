import './NavigationBar.css';
import {Button, Grid} from "@mui/joy";

const NavigationBar = () => {
    return (
        <nav className="navbar">
            <Grid container spacing={3} sx={{flexGrow:1}}>
                <Grid xs>
                    <Button>Login</Button>
                    <Button>Signup</Button>
                </Grid>
                <Grid xs={6}>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <a href="/map">Map</a>
                        </li>
                        <li className="nav-item">
                            <a href="/account">Account</a>
                        </li>
                        <li className="nav-item">
                            <a href="/inbox">Inbox</a>
                        </li>
                    </ul>
                </Grid>
                <Grid>
                    <Button>Sign out</Button>
                </Grid>
            </Grid>
        </nav>
    );
};

export default NavigationBar;
