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
import { useLoginMutation } from "../../store/features/Authentication/authApi";
import { setLoginName } from "../../store/features/Authentication/authSlice";

const Login: React.FC = () => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [login,{isLoading, error}] = useLoginMutation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {isAuthenticated } = useSelector((state: RootState) => {
    return state.auth
  })

  console.log(error)

  const location = useLocation();
const redirectPath = location.state?.from || "/";

useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate])

// send data to db
  const handleLogin = async() => {
    try{
      const response = await login({phoneNumber,password}).unwrap() as {name:string};
      dispatch(setLoginName(response.name));
      console.log("Login Response:" , response);
      navigate('/');
    }catch(err){
      console.log("Login Response:",err);
    }
  }

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${ASSESTS.images.loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: {xs:'center',md:"flex-end"},
        p:{xs:'20px 30px',md:'0 60px'},
        margin: 0,
      }}
    >
      {/* Login Card */}
      <Container
        sx={{
          width: "600px",
          height: "85vh",
          backgroundColor: "white",
          padding: 8,
          boxShadow: "4px 4px 12px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          gap: error ? 1 : 2,
          margin: 0,
          borderRadius: 2,
          position: 'relative'
        }}
      >
        <Typography variant="h2" fontWeight="bold"
          sx={{
            fontSize: '36px'
          }}>
          Sign in to TIX ID
        </Typography>

        {/* Phone Number Input */}
        <TextField
          label="Phone Number"
          variant="standard"
          fullWidth
          type="tel"
          placeholder="Enter Phone Number"
          autoComplete="off"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          inputProps={{ autoComplete: "new-password" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography sx={{ fontWeight: 500, color: "gray" }}>
                  +91 |
                </Typography>
              </InputAdornment>
            ),
            sx: {
              paddingTop: "10px",
              borderBottom: "1px solid rgba(157, 168, 190, 1) !important",
              mt: 2,
              "&:hover": {
                borderBottom: "1px solid rgba(157, 168, 190, 1) !important",
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
              fontSize: "18px",
              textTransform: 'uppercase',
              color: "black !important",
              transition: "none",
            },
          }}
        />

        {/* Password Input */}
        <TextField
          label="Password"
          variant="standard"
          fullWidth
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
              fontSize: "18px",
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
            {(error as any)?.data?.error || "Login failed"}
          </Typography>}

        {/* Buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mt: 5,
            gap: 2
          }}>

          {/* Sign In Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "royalblue.main",
              color: "white",
              fontWeight: "bold",
              fontSize: '20px',
              py: 1,
              ":hover": { backgroundColor: "#12203D" },
            }}
            onClick={handleLogin}
          >
            Sign In Now
          </Button>

          <Typography textAlign="center" color="gray">
            Don't have an account?
          </Typography>

          {/* Register Button */}
          <Button
            variant="outlined"
            fullWidth
            sx={{
              border: "1px solid",
              borderColor: "grey.500",
              color: "grey.900",
              fontWeight: "bold",
              fontSize: '20px',
              py: 1,
            }}
            onClick={()=> navigate('/register')}
          >
            Register Now
          </Button>
        </Box>

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
          top: {xs:5,md:30},
          left: 30,
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
        }}
        onClick={() => navigate('/')}
      >
        Back
      </Button>
    </Box>
  );
};

export default Login;
