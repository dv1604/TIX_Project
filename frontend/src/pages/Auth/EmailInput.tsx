import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    InputAdornment,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import ASSESTS from "../../assests";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { RootState } from "../../store/store";
import { useSignUpMutation } from "../../store/features/Authentication/authApi";

interface CustomError {
    data: {
        email?: string;
        password?: string;
        phoneNumber?: string;
    };
    status: number;
}

const EmailInput = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [SignUp , {isLoading, error}] = useSignUpMutation();

    const fetchedError = error as CustomError;
    console.log(fetchedError)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated , name , phoneNumber } = useSelector((state: RootState) => {
        return state.auth
    })

    console.log(name,phoneNumber)

    const location = useLocation();
    const redirectPath = location.state?.from || "/";

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         navigate('/register')
    //     }
    // }, [isAuthenticated, navigate])

    const handleSubmit = async() => {

        try{

            const response = await SignUp({name,phoneNumber,email,password}).unwrap();
            console.log("SignUp Response",response);
            navigate(redirectPath);

        }catch(err){

            console.log("SignUp Error: ", err);

            if(err && typeof err === "object" &&'data' in err){
                const errorData = err as CustomError;
                if(errorData?.data.phoneNumber){
                    alert(errorData?.data.phoneNumber);
                    navigate('/register')
                }
            }
        }

    }



    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                backgroundImage: `url(${ASSESTS.images.signUpBg2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: 'center', md: "flex-end" },
                p: { xs: '20px 30px', md: '0 60px' },
                margin: 0,
            }}
        >
            {/* Login Card */}
            <Container
                sx={{
                    width: "600px",
                    height: "85vh",
                    backgroundColor: "white",
                    padding: '50px',
                    boxShadow: "4px 4px 12px rgba(0,0,0,0.2)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: 'stretch',
                    gap: error? 4: 6,
                    margin: 0,
                    borderRadius: 2,
                    position: 'relative'
                }}
            >
                <Typography variant="h2" fontWeight="bold"
                    sx={{
                        fontSize: '36px'
                    }}>
                    Register to TIX ID
                </Typography>

                {/* Email Input */}
                <TextField
                    label="email"
                    variant="standard"
                    type="email"
                    placeholder="Enter Input"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    inputProps={{ autoComplete: "new-password" }}
                    InputProps={{
                        sx: {
                            paddingTop: "10px",
                            borderBottom: "1px solid rgba(157, 168, 190, 1) !important",
                            "&:hover": {
                                borderBottom: "1px solid rgba(157, 168, 190, 1)!important",
                            },
                            "&:before, &:after": {
                                borderBottom: "1px solid rgba(157, 168, 190, 1) !important",
                            },
                            "& input": {
                                backgroundColor: "transparent !important",
                                WebkitBoxShadow: "0 0 0 1000px white inset !important",
                            },
                        },
                    }}
                    InputLabelProps={{
                        shrink: true, // Always keeps label visible
                        sx: {
                            fontSize: "20px",
                            textTransform: 'uppercase',
                            color: "black !important",
                            transition: "none",
                        },
                    }}
                />

                {error &&
                    <Typography
                        sx={{
                            fontSize: '14px',
                            color: 'rgba(255, 107, 107, 1)'
                        }}>
                        {fetchedError.data.email}</Typography>}

                {/* Password Input */}
                <TextField
                    label="password"
                    variant="standard"
                    type="password"
                    placeholder="Enter Input"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    inputProps={{ autoComplete: "new-password" }}
                    InputProps={{
                        sx: {
                            paddingTop: "10px",
                            borderBottom: "1px solid rgba(157, 168, 190, 1) !important",
                            "&:hover": {
                                borderBottom: "1px solid rgba(157, 168, 190, 1)!important",
                            },
                            "&:before, &:after": {
                                borderBottom: "1px solid rgba(157, 168, 190, 1) !important",
                            },
                            "& input": {
                                backgroundColor: "transparent !important",
                                WebkitBoxShadow: "0 0 0 1000px white inset !important",
                            },
                        },
                    }}
                    InputLabelProps={{
                        shrink: true, // Always keeps label visible
                        sx: {
                            fontSize: "20px",
                            textTransform: 'uppercase',
                            color: "black !important",
                            transition: "none",
                        },
                    }}
                />

                {error && 'data' in error &&
                    <Typography
                        sx={{
                            fontSize: '14px',
                            color: 'rgba(255, 107, 107, 1)'
                        }}>
                        {fetchedError?.data.password}</Typography>}


                {/* Register Button */}
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        bgcolor: 'royalblue.main',
                        border: "1px solid",
                        borderColor: "grey.500",
                        color: "primary.main",
                        fontWeight: "bold",
                        fontSize: '20px',
                        py: 1.2,
                    }}
                    onClick={handleSubmit}
                >
                    Register Now
                </Button>

                <Typography
                    sx={{
                        fontSize: '14px',
                        color: 'grey.600'
                    }}>
                    *By registering, I agree to the policies of TIX ID
                </Typography>

                {/* Footer */}
                <Typography variant="body2" color="gray" textAlign="center"
                    sx={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '40px'
                    }}>
                    2025 TIX ID - PT Nusantara Elang Sejahtera.
                </Typography>
            </Container>

            {/* Back Button */}
            <Button
                startIcon={<ArrowBack />}
                sx={{
                    position: "absolute",
                    top: { xs: 5, md: 30 },
                    left: 30,
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold",
                }}
                onClick={() => navigate('/register')}
            >
                Back
            </Button>
        </Box>
    );
};

export default EmailInput;
