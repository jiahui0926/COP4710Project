import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ROUTE_PATHS } from "../constants/routes";
import { API_BASE_URL, API_ROUTE_PATHS } from "../constants/apiConstants";
import { useAuth } from "../contexts/AuthProvider";
import { ISignUpInfo, IUserInfoView } from "../types";

// Constants for month and year options
const months = [
  {
    value: 1,
    label: "January",
  },
  {
    value: 2,
    label: "February",
  },
  {
    value: 3,
    label: "March",
  },
  {
    value: 4,
    label: "April",
  },
  {
    value: 5,
    label: "May",
  },
  {
    value: 6,
    label: "June",
  },
  {
    value: 7,
    label: "July",
  },
  {
    value: 8,
    label: "August",
  },
  {
    value: 9,
    label: "September",
  },
  {
    value: 10,
    label: "October",
  },
  {
    value: 11,
    label: "November",
  },
  {
    value: 12,
    label: "December",
  },
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1900 + 1 }, (v, k) => ({
  value: 1900 + k,
  label: 1900 + k,
}));

export default function SignUpPage() {
  let navigate = useNavigate();

  const { signIn } = useAuth();

  // States for form values
  const [selectedMonth, setSelectedMonth] = useState(
    (new Date().getMonth() + 1).toString()
  );
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [days, setDays] = useState(Array.from({ length: 31 }, (_, i) => i + 1));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Handler for form submission
  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const signUpInfo: ISignUpInfo = {
      firstname: formData.get("fname") as string,
      lastname: formData.get("lname") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      dob: `${formData.get("month")}-${formData.get("day")}-${formData.get(
        "year"
      )}`,
    };

    // Try to run sign up API call
    try {
      // Make API calls and store response
      const response = await fetch(
        `${API_BASE_URL}/${API_ROUTE_PATHS.SignUp}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signUpInfo),
        }
      );

      // If the response is not a status in 200-299
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("A user with this email already exists.");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // If response is ok, extract json object from it
      const newUserData: IUserInfoView = await response.json();
      // Log new user info
      console.log(newUserData.firstname);
      // Set AuthContext/SignIn
      signIn(newUserData.firstname, newUserData.userid, newUserData.isaseller);
      // Redirect to homepage
      navigate(ROUTE_PATHS.Home);
    } catch (error: any) {
      console.error("SignUp Error:", error.message);
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    }
  };

  // Handlers for form field changes
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "month":
        setSelectedMonth(value);
        break;
      case "year":
        setSelectedYear(value);
        break;
      default:
        break;
    }
  };

  // Function to calculate the number of days in a given month and year
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  // Effect hook to update the days array when the selected month or year changes
  useEffect(() => {
    const daysInMonth = getDaysInMonth(
      parseInt(selectedMonth),
      parseInt(selectedYear)
    );
    const newDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    setDays(newDays);
  }, [selectedMonth, selectedYear]);

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh", // Full height of the viewport
      }}
    >
      <Paper elevation={3} sx={{ marginTop: 8, padding: 8 }}>
        <Typography component="h1" variant="h3" align="center">
          Sign Up
        </Typography>
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleFormSubmission}>
          <Grid container spacing={2}>
            {/* Name Fields */}
            <Grid item xs={6}>
              <TextField
                required
                id="fname-field"
                label="First Name"
                name="fname"
                inputProps={{ maxLength: 20 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="lname-field"
                label="Last Name"
                name="lname"
                inputProps={{ maxLength: 20 }}
              />
            </Grid>
            {/* Email Field */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email-field"
                label="Email"
                name="email"
                inputProps={{ maxLength: 100 }}
              />
            </Grid>

            {/* Passsword Field */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password-field"
                label="Password"
                name="password"
                inputProps={{ maxLength: 50 }}
              />
            </Grid>

            {/* DOB Fields */}
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" height="100%">
                <Typography>Birthday:</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                fullWidth
                required
                type="button"
                size="small"
                id="month-field"
                label="Month"
                name="month"
                defaultValue={new Date().getMonth() + 1}
                onChange={handleFieldChange}
              >
                {months.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                select
                fullWidth
                required
                type="button"
                size="small"
                id="day-field"
                label="Day"
                name="day"
                defaultValue={new Date().getDate()}
              >
                {days.map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                select
                required
                type="button"
                size="small"
                id="year-field"
                label="Year"
                name="year"
                defaultValue={new Date().getFullYear()}
                onChange={handleFieldChange}
              >
                {years.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Sign Up Button */}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                Submit
              </Button>
            </Grid>
            {/* Log In link/option */}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Typography variant="subtitle2">
                Already have an account?{" "}
                <Link
                  className="link-hover-pointer"
                  color="primary"
                  onClick={() => {
                    navigate(ROUTE_PATHS.Login);
                  }}
                >
                  Log In
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
