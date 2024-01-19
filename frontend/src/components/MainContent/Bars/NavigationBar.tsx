import './NavigationBar.css';
import {Button, ButtonGroup, Grid, Sheet, Stack, Typography} from "@mui/joy";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {AddNewModal, adUser} from "../AddNewModal";

{/*
1.NavigationBarProps explained in MainContent

2.handleCloseModal-to close form of posting a new ad

3.handleProfile, handleBackToMain-toggling between all ads and user's ads
*/}

interface NavigationBarProps{
    handleLoggedIn:(user:adUser)=>void;
    handleLoggedOut:()=>void;
    setMainContentState:(state:boolean)=>void;
    mainContentState:boolean;
    handleShelterAdsShow:(state:boolean)=>void;
    shelterAdsShow:boolean;
}
const NavigationBar = ({
                           handleLoggedIn,
                           handleLoggedOut,
                           setMainContentState,
                           mainContentState,
                           handleShelterAdsShow, shelterAdsShow
                       }: NavigationBarProps) => {
    const location = useLocation();
    const isSheltersRoute = location.pathname === '/shelters';
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userTelephoneNo, setUserTelephoneNo] = useState('');
    const [userType, setUserType] = useState(1);
    const [name, setName] = useState('');
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
                setUserEmail(decodedToken.email);
                setUserTelephoneNo(decodedToken.telephoneNumber);
                setLoginState(true);
                setUserType(decodedToken.userType);
                setName(decodedToken.name);
                //poslati maincontent da je ovo user mail
                handleLoggedIn({name:decodedToken.username, email:decodedToken.email, telephoneNumber:decodedToken.telephoneNumber, userType:decodedToken.userType});
                //handleLoggedIn(user);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, [])
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const handleProfile=()=>{
        setMainContentState(false);
        handleShelterAdsShow(false);
    };
    const handleBackToMain=()=>{
        setMainContentState(true);
        handleShelterAdsShow(false);
    };
    const handleSignOut=()=>{
        setLoginState(false);
        localStorage.removeItem('jwt');
        handleLoggedOut();
    };


    function handlePostsClick() {
        setMainContentState(true);
        handleShelterAdsShow(false);
    }

    return (
        <nav className="navbar">
            <Grid container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                  spacing={{ xs: 4, md: 3 }}
                  columns={{ xs: 2, sm: 8, md: 12 }}
                  sx={{ flexGrow: 1 }}
                      >
                <Grid xs={2} sm={4} md={4}>
                    {!isLoggedIn && (
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}>

                            <Button id={"loginButton"} size="lg" component={Link} to="/login">Login</Button>
                            <Button id={"signupButton"} size="lg" component={Link} to="/signup">Signup</Button>
                        </Stack>)}
                    {isLoggedIn &&(
                        <Button id="addNewPostButton" onClick={()=>setModalOpen(true)} size="lg">Post new ad</Button>
                    )}
                </Grid>
                <Grid xs={2} sm={4} md={4}
                      justifyContent="space-around"
                      alignItems="center">

                        <ButtonGroup
                            buttonFlex={1}
                            color="primary"
                            disabled={false}
                            orientation="horizontal"
                            size="lg"
                            variant="soft"
                            className={"buttonGroup"}
                        >
                            <Button className={"button"} component={Link} to="/map">Map</Button>
                            {isLoggedIn && (isSheltersRoute ? (
                                <Button className={"button"} component={Link} to="/">Posts</Button>
                            ) : (
                                shelterAdsShow ? (
                                    <Button className={"button"} component={Link} to="/" onClick={handlePostsClick}>Posts</Button>
                                ) : (
                                    <Button className={"button"} component={Link} to="/shelters">Shelters</Button>
                                )
                            ))}

                        </ButtonGroup>
                </Grid>
                <Grid xs={2} sm={4} md={4}>
                    {isLoggedIn && (
                        <Sheet className={"sheet"} sx={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}>
                            <Typography id={"showUsername"} sx={{ width: '100%',
                                color:"white"}} level="title-lg">Hello, {username}</Typography>
                            <Button id="signout" size="lg" component={Link} to="/" onClick={handleSignOut}>Sign out</Button>
                            {!shelterAdsShow && mainContentState&&<Button size="lg" component={Link} to="/" onClick={handleProfile}><i className="bi bi-person-circle"></i></Button>}
                            {!mainContentState&&<Button size="lg" component={Link} to="/" onClick={handleBackToMain}><i className="bi bi-arrow-left-circle"></i></Button>}
                            {!mainContentState&&!shelterAdsShow&&
                                <div className={"personalData"}>
                                    <Typography sx={{ width: '100%', color:"white" }} level="title-lg">Name: {name}</Typography>
                                    <Typography sx={{ width: '100%', color:"white" }} level="title-lg">Email: {userEmail}</Typography>
                                    <Typography sx={{ width: '100%', color:"white" }} level="title-lg">Telephone: {userTelephoneNo}</Typography></div>}
                        </Sheet>
                    )}
                    {!isLoggedIn && (
                        <Sheet sx={{ backgroundColor: 'rgba(255, 255, 255, 0)'}}>
                            <Typography id="loginText" sx={{ width: '100%', color:"white" }} level="title-lg">Please login or signup</Typography></Sheet>
                    )}
                </Grid>
            </Grid>
            {modalOpen && (
                <AddNewModal
                    closeModal={handleCloseModal} speciesFill="" nameFill="" ageFill={0}
                    cityFill="" latitudeFill={45.813257} longitudeFill={15.976448} datetimeFill="" descriptionFill="" colorsFill={[]}
                    text="Post new ad" imagesFill={[]} adIdFill={0} countyFill="" isLoggedIn={isLoggedIn}
                    user={{
                        name:username,
                        email:userEmail,
                        telephoneNumber:userTelephoneNo,
                        userType:userType
                    }}
                ></AddNewModal>
            )
            }
        </nav>
    );
};

export default NavigationBar;