import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addHabit } from "../store/habit-slice";

const AddHabitForm = () => {
  const [name, setName] = useState<string>("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(
        addHabit({
          name,
          frequency,
        })
      );
      setName("");
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#fff",
        borderRadius: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        maxWidth: 400,
        mx: "auto",
        mt: 4,
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{
          textAlign: "center",
          mb: 3,
          fontWeight: 600,
          color: "#333",
          fontSize: {
            xs: "1.25rem",
            sm: "1.5rem",
            md: "1.75rem",
            lg: "2rem",
            xl: "2.25rem",
          },
        }}
      >
        Add a New Habit
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Habit Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Habit Name"
            fullWidth
            required
            variant="outlined"
            InputLabelProps={{
              sx: {
                fontWeight: 500,
                color: "#666",
              },
            }}
            InputProps={{
              sx: {
                backgroundColor: "#f9f9f9",
              },
            }}
          />
          <FormControl
            fullWidth
            required
            sx={{
              marginTop: "16px",
            }}
          >
            <InputLabel
              sx={{
                fontWeight: 500,
                color: "#666",
                backgroundColor: "#fff",
                padding: "0 4px",
                marginLeft: "-4px",
              }}
            >
              Frequency
            </InputLabel>
            <Select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as any)}
              sx={{
                backgroundColor: "#f9f9f9",
                "& .MuiSelect-select": {
                  paddingTop: "12px",
                  paddingBottom: "12px",
                },
              }}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              fontWeight: 600,
              py: 1.5,
              textTransform: "none",
            }}
          >
            Add Habit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddHabitForm;
