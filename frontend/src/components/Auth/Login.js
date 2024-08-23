import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Box,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  FormControl,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email) {
      setError("Email is required.");
      return false;
    }
    if (!password) {
      setError("Password is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setError("");
      const success = await login(email, password);
      if (success) {
        setModalOpen(true);
        if (onSubmit) onSubmit();
      } else {
        setError("Login failed. Please check your credentials and try again.");
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate("/dashboard");
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error && !email}
          helperText={error && !email ? "Email is required." : ""}
          autoComplete="off"
        />
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error && !password}
            helperText={error && !password ? "Password is required." : ""}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            autoComplete="off"
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Login"
          )}
        </Button>
        {error && (
          <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
            {error}
          </Typography>
        )}
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Link
            href="#"
            variant="body2"
            onClick={() => navigate("/")}
          >
            Forgot your password?
          </Link>
        </Box>
      </form>

      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Login Successful</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            You have successfully logged in!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Login;
