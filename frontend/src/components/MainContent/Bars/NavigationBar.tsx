import './NavigationBar.css';
import {Button, Grid} from "@mui/joy";

const NavigationBar = () => {
    return (
        <nav className="navbar">
            <Grid container spacing={3} sx={{flexGrow:1, justifyContent:"center"}}>
                <Grid item xs="auto">
                    <Button>Login</Button>
                    <Button>Signup</Button>
                </Grid>
                <Grid item xs>
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
            </Grid>
        </nav>
    );
};

export default NavigationBar;
