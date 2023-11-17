import './NavigationBar.css';
import {Button, ButtonGroup, Grid, Sheet} from "@mui/joy";
import {Link} from "react-router-dom";

const NavigationBar = () => {
    return (
        <nav className="navbar">
            <Grid container spacing={3} sx={{flexGrow:1}}>
                <Grid xs>
                    <Sheet sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                        <Button>Login</Button>
                        <Button>Signup</Button>
                    </Sheet>
                </Grid>
                <Grid xs={6}>
                    {/*<Sheet sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)',*/}
                    {/*    justifyContent: "space-between"}}>*/}
                        <ButtonGroup
                            color="primary"
                            disabled={false}
                            orientation="horizontal"
                            size="lg"
                            spacing={3}
                            variant="soft"
                        >
                            <Button component={Link} to="/map">Map</Button>
                            <Button component={Link} to="/account">Account</Button>
                            <Button component={Link} to="/inbox">Inbox</Button>
                        </ButtonGroup>
                    {/*</Sheet>*/}
                </Grid>
                <Grid xs>
                    <Sheet sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                        <Button>Sign out</Button>
                    </Sheet>
                </Grid>
            </Grid>
        </nav>
    );
};

export default NavigationBar;
