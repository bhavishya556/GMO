
import  { useState } from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [ischeck, setIscheck] = useState(false);
    const [msg, setMsg] = useState(false);
    const navigate = useNavigate();

    const defaultTheme = createTheme();

    const handleSubmit = () => {
        
        if (ischeck && fullname && email && phoneNumber) {
            const userDetails = {
                fullName: fullname,
                email: email,
                phoneNumber: phoneNumber,
            };

            // Convert the userDetails object to a JSON string
            const userDetailsJSON = JSON.stringify(userDetails);

            // Store the userDetails in local storage
            localStorage.setItem('userDetails', userDetailsJSON);

            console.log('User details stored in local storage:', userDetailsJSON);
            navigate("/secondPage")
         

        }
        else {
            setMsg(true);

        }
     

    };

    return (
        <Box>

            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Typography component="h1" variant="h5" >
                            Enter Your Details
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <TextField
                                        autoComplete="given-name"
                                        name="fullName"
                                        required
                                        fullWidth
                                        id="fullName"
                                        label="Full Name"
                                        autoFocus
                                        type='text'
                                        onChange={(e)=>setFullName(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="phoneNumber"
                                        label="Phone Number"
                                        type="number"
                                        id="phoneNumber"
                                        onChange={(e)=>setPhoneNumber(e.target.value)}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox name="allowExtraEmails" color="primary"
                                            onChange={() => {
                                                setIscheck(!ischeck)
                                                setMsg(false)

                                            }} />}
                                        label="I confirm all details are correct"
                                    />
                                    {
                                        msg ? (
                                            <Typography component="p" >
                                                Please ckeck the checkbox and fill all details
                                            </Typography>)
                                            : ("")
                                    }
                                </Grid>

                            </Grid>
                            <Button
                                type="button"
                                onClick={handleSubmit}

                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
                            >
                                Next
                            </Button>

                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </Box>
    );

}

export default Home