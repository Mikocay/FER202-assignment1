import { useState } from "react";
import { ADMIN_API } from "../../utils";
import axios from "axios";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const URL = ADMIN_API;

function Authentication() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await axios.get(`${URL}`);
        const user = res.data.find((user: any) => user.username === username && user.password === password);
        if (user) {
            toast.success("Login successfully!");
            navigate('/dashboard');
        } else {
            toast.error("Your are not admin!");
            navigate('/');
        }
    };

    return (
        <Box className="popup" sx={{ display: 'flex', alignItems: 'center' }}>
            <Box className="popup-content">
                <Typography
                    sx={{
                        color: '#1976D2',
                        fontSize: 20,
                        fontWeight: 700,
                        paddingLeft: 0,
                        margin: 0
                    }}
                >
                    Login Form
                </Typography>
                <Grid container>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            sx={{
                                color: '#1976D2',
                                fontSize: 15,
                                fontWeight: 400,
                                paddingLeft: 0,
                                margin: 0,
                                width: '100px'
                            }}
                        >
                            Username:
                        </Typography>
                        <TextField sx={{ mb: 1, ml: 1 }} onChange={handleUsernameChange} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            sx={{
                                color: '#1976D2',
                                fontSize: 15,
                                fontWeight: 400,
                                paddingLeft: 0,
                                margin: 0,
                                width: '100px'
                            }}
                        >
                            Password:
                        </Typography>
                        <TextField type="password" sx={{ mb: 1, ml: 1 }} onChange={handlePasswordChange}></TextField>
                    </Box>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <Button type="submit">
                        Login
                    </Button>
                </form>
            </Box>
        </Box>
    );
}

export default Authentication;