import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Assuming you're using Redux to manage authentication state
import { logoutUser } from '../../redux/slices/authSlice'; // Adjust the path if needed
import { Box, Typography, CircularProgress } from '@mui/material';


const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Clear authentication data (e.g., token) from localStorage or sessionStorage
        localStorage.removeItem('authToken'); // Adjust key based on your token storage
        sessionStorage.removeItem('authToken'); // Clear if stored in sessionStorage

        // Dispatch a Redux action to clear authentication state
        dispatch(logoutUser());

        // Redirect the user to the login page after logout
        setTimeout(() => {
            navigate('/login'); // Adjust the path to your login route
        }, 1000); // Optional delay before redirecting
    }, [navigate, dispatch]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Typography variant="h6" gutterBottom>
                Logging out...
            </Typography>
            <CircularProgress /> {/* Spinner to show the process */}
        </Box>
    );
};

export default Logout;
