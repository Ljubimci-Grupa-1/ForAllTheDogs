import './NavigationBar.css';
import {Button, ButtonGroup, Grid, Sheet, Stack, Typography} from "@mui/joy";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {AddNewModal} from "../AddNewModal";

const NavigationBar = () => {
    const [username, setUsername] = useState('');
    const [isLoggedIn, setLoginState] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    useEffect(() =>{
        const jwt = localStorage.getItem('jwt');
        if(jwt){
            const decoded = jwt.split(".")[1];
            try {
                //parsiraj token
                const decodedToken = JSON.parse(atob(decoded));
                //izvuci username iz tokena
                const user = decodedToken.username;
                // postavi vrtijednost statea
                setUsername(user);
                setLoginState(true);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    })
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    return (
        <nav className="navbar">
            <Grid container spacing={3} sx={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
            flexGrow:'1'}}>
                <Grid xs>
                    {!isLoggedIn && (
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}>

                        <Button size="lg" component={Link} to="/login">Login</Button>
                        <Button size="lg" component={Link} to="/signup">Signup</Button>
                    </Stack>)}
                    {isLoggedIn && (
                        <Button onClick={()=>setModalOpen(true)} size="lg">Post new ad</Button>
                    )}
                </Grid>
                <Grid xs={6} sx={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center'}}>
                    <Sheet sx={{ backgroundColor: 'rgba(255, 255, 255, 0)',
                    width:'70%'}}>
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
                <Grid xs sx={{
                    display:'flex',
                    alignItems:'center',
                justifyContent:'center'}}>
                    {isLoggedIn && (
                        <Sheet sx={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}>
                            <Typography sx={{ width: '100%',
                            color:"white"}} level="title-lg">Hello, {username}</Typography>
                            <Button size="lg" component={Link} to="/login">Sign out</Button>
                        </Sheet>
                    )}
                    {!isLoggedIn && (
                        <Sheet sx={{ backgroundColor: 'rgba(255, 255, 255, 0)'}}>
                            <Typography sx={{ width: '100%', color:"white" }} level="title-lg">Please login or signup</Typography></Sheet>
                    )}
                </Grid>
            </Grid>
            {modalOpen && (
                <AddNewModal closeModal={handleCloseModal}></AddNewModal>
            )
            }
        </nav>
    );
};

export default NavigationBar;
