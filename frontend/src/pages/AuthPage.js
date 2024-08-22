import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import ForgotPassword from "../components/Auth/ForgotPassword";

const AuthPage = () => {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleFormSubmit = async (formType) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSnackbarMessage(`${formType} successful!`);
      setSnackbarSeverity("success");
      if (formType === "Login") {
        navigate("/dashboard");
      } else if (formType === "Register") {
        navigate("/login");
      }
    } catch (error) {
      setSnackbarMessage(`Failed to ${formType.toLowerCase()}.`);
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Cloidet
        </Typography>
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="authentication tabs"
        >
          <Tab label="Login" />
          <Tab label="Register" />
          <Tab label="Forgot Password" />
        </Tabs>
        <Box sx={{ mt: 2 }}>
          {value === 0 && <Login onSubmit={() => handleFormSubmit("Login")} />}
          {value === 1 && (
            <Register onSubmit={() => handleFormSubmit("Register")} />
          )}
          {value === 2 && <ForgotPassword />}
        </Box>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          action={
            <Button color="inherit" onClick={handleSnackbarClose}>
              Close
            </Button>
          }
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default AuthPage;
