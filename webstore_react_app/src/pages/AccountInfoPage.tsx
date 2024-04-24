import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ROUTE_PATHS } from "../constants/routes";
import { API_BASE_URL, API_ROUTE_PATHS } from "../constants/apiConstants";
import { useAuth } from "../contexts/AuthProvider";
import { ISignUpInfo, IUserInfoView } from "../types";

interface IUserFormData {
  userid: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  day: string;
  month: string;
  year: string;
  isaseller: boolean;
  total_spent: number;
}

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
  const { signIn, userID, isASeller } = useAuth();

  // States for form values
  const [selectedMonth, setSelectedMonth] = useState(
    (new Date().getMonth() + 1).toString()
  );
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [days, setDays] = useState(Array.from({ length: 31 }, (_, i) => i + 1));
  const [disableForm, setDisableForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [userFormInfo, setUserFormInfo] = useState<IUserFormData>({
    userid: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    day: "1",
    month: "1",
    year: "2000",
    isaseller: false,
    total_spent: 0,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Handler for form submission
  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const updateUserInfo: IUserInfoView = {
      userid: userID,
      firstname: userFormInfo.firstname,
      lastname: userFormInfo.lastname,
      email: userFormInfo.email,
      password: userFormInfo.password,
      dob:
        userFormInfo.year + "-" + userFormInfo.month + "-" + userFormInfo.day,
      isaseller: isASeller,
      total_spent: userFormInfo.total_spent,
    };

    console.log(updateUserInfo);

    //Try to run sign up API call
    try {
      // Make API calls and store response
      const response = await fetch(
        `${API_BASE_URL}/${API_ROUTE_PATHS.ToUpdateUserInfo}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateUserInfo),
        }
      );

      // If the response is not a status in 200-299
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid Input: Email already in use.");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Set AuthContext/SignIn
      signIn(
        userFormInfo.firstname,
        userFormInfo.userid,
        userFormInfo.isaseller
      );
      // Disable form
      setDisableForm(true);
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
        setUserFormInfo({ ...userFormInfo, month: e.target.value });
        setSelectedMonth(value);
        break;
      case "year":
        setUserFormInfo({ ...userFormInfo, year: e.target.value });
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

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const fetchAndShowUserInfo = async () => {
    try {
      // Make API calls and store response
      const response = await fetch(
        `${API_BASE_URL}/${API_ROUTE_PATHS.ToGetUserInfoByID}/${userID}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
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
      const responseJSON: IUserInfoView[] = await response.json();
      const retUserData: IUserInfoView = responseJSON[0];
      const userInfoToSet: IUserFormData = {
        userid: retUserData.userid,
        firstname: retUserData.firstname,
        lastname: retUserData.lastname,
        email: retUserData.email,
        password: retUserData.password,
        day: retUserData.dob.split("-")[2],
        month: retUserData.dob.split("-")[1],
        year: retUserData.dob.split("-")[0],
        isaseller: retUserData.isaseller,
        total_spent: retUserData.total_spent,
      };
      // Show and set user info
      setUserFormInfo(userInfoToSet);
      signIn(retUserData.firstname, retUserData.userid, retUserData.isaseller);
    } catch (error: any) {
      console.error("SignUp Error:", error.message);
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    }
  };

  // Get user data initially
  useEffect(() => {
    fetchAndShowUserInfo();
  }, []);

  // Effect hook to update the days array when the selected month or year changes
  useEffect(() => {
    const daysInMonth = getDaysInMonth(
      parseInt(selectedMonth),
      parseInt(selectedYear)
    );
    const newDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    setDays(newDays);
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    fetchAndShowUserInfo();
  }, [disableForm]);

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
        <Typography component="h1" variant="h5" align="center">
          Your Account Information
        </Typography>
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleFormSubmission}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end", // Aligns the child (Button) to the right
                marginBottom: 2, // Adds some space below the button before the table
              }}
            >
              <Button
                onClick={() => {
                  setShowPassword(false);
                  setDisableForm(!disableForm);
                }}
              >
                {!disableForm && "Cancel"} Edit
              </Button>
            </Grid>
            {/* Status Fields */}
            <Grid item xs={3}>
              <Typography
                component="h1"
                variant="body1"
                align="center"
                sx={{ display: "flex", height: "100%", alignItems: "center" }}
              >
                Status:
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography
                component="h1"
                variant="h6"
                align="center"
                sx={{ display: "flex", height: "100%", alignItems: "center" }}
              >
                {isASeller ? "Seller" : "Buyer"}
              </Typography>
            </Grid>
            {/* Total Spent Field */}
            <Grid item xs={3}>
              <Typography
                component="h1"
                variant="body1"
                align="center"
                sx={{ display: "flex", height: "100%", alignItems: "center" }}
              >
                Total Spent:
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography
                component="h1"
                variant="h6"
                align="center"
                sx={{ display: "flex", height: "100%", alignItems: "center" }}
              >
                ${userFormInfo.total_spent}
              </Typography>
            </Grid>
            {/* First Name Fields */}
            <Grid item xs={3}>
              <Typography
                component="h1"
                variant="body1"
                align="center"
                sx={{ display: "flex", height: "100%", alignItems: "center" }}
              >
                First Name:
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                disabled={disableForm}
                required
                id="fname-field"
                name="fname"
                inputProps={{ maxLength: 20 }}
                value={userFormInfo.firstname}
                onChange={(e) =>
                  setUserFormInfo({
                    ...userFormInfo,
                    firstname: e.target.value,
                  })
                }
              />
            </Grid>
            {/* Last Name Fields */}
            <Grid item xs={3}>
              <Typography
                component="h1"
                variant="body1"
                align="center"
                sx={{ display: "flex", height: "100%", alignItems: "center" }}
              >
                Last Name:
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                disabled={disableForm}
                id="lname-field"
                name="lname"
                inputProps={{ maxLength: 20 }}
                value={userFormInfo.lastname}
                onChange={(e) =>
                  setUserFormInfo({ ...userFormInfo, lastname: e.target.value })
                }
              />
            </Grid>
            {/* Email Field */}
            <Grid item xs={3}>
              <Typography
                component="h1"
                variant="body1"
                align="center"
                sx={{ display: "flex", height: "100%", alignItems: "center" }}
              >
                Email:
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                fullWidth
                disabled={disableForm}
                id="email-field"
                name="email"
                inputProps={{ maxLength: 100 }}
                value={userFormInfo.email}
                onChange={(e) =>
                  setUserFormInfo({ ...userFormInfo, email: e.target.value })
                }
              />
            </Grid>

            {/* Passsword Field */}
            <Grid item xs={3}>
              <Typography
                component="h1"
                variant="body1"
                align="center"
                sx={{ display: "flex", height: "100%", alignItems: "center" }}
              >
                Password:
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  disabled={disableForm}
                  value={userFormInfo.password}
                  onChange={(e) =>
                    setUserFormInfo({
                      ...userFormInfo,
                      password: e.target.value,
                    })
                  }
                />
              </FormControl>
            </Grid>
            {/* DOB Fields */}
            <Grid item xs={3}>
              <Typography
                component="h1"
                variant="body1"
                align="center"
                sx={{ display: "flex", height: "100%", alignItems: "center" }}
              >
                Birthday:
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                select
                fullWidth
                required
                disabled={disableForm}
                type="button"
                size="small"
                id="month-field"
                label="Month"
                name="month"
                value={parseInt(userFormInfo.month)}
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
                disabled={disableForm}
                type="button"
                size="small"
                id="day-field"
                label="Day"
                name="day"
                value={parseInt(userFormInfo.day)}
                onChange={(e) =>
                  setUserFormInfo({ ...userFormInfo, day: e.target.value })
                }
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
                disabled={disableForm}
                type="button"
                size="small"
                id="year-field"
                label="Year"
                name="year"
                value={parseInt(userFormInfo.year)}
                onChange={handleFieldChange}
              >
                {years.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Submit Edits Button */}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!disableForm && (
                <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                  Update
                </Button>
              )}
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
