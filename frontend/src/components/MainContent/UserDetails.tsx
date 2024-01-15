import {adUser} from "./AddNewModal.tsx";
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
interface UserDetailsProps{
    user:adUser
}

 const userDetails=({user}:UserDetailsProps)=>{
     return (
         <Box
             sx={{
                 width: '100%',
                 maxWidth: 500,
                 display: 'grid',
                 gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                 gap: 2,
             }}
         >
             <Card variant="plain" size="lg">
                 <CardContent>
                     <Typography level="h4">User Details</Typography>
                     <Typography>{user.name}</Typography>
                     <Typography>{user.email}</Typography>
                     <Typography>{user.telephoneNumber}</Typography>
                 </CardContent>
             </Card>
         </Box>
     );


 };

export default userDetails;