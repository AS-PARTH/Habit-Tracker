import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Delete } from "@mui/icons-material";
import { Habit, removeHabit, toggleHabit } from "../store/habit-slice";

const HabitList = () => {
  const { habits } = useSelector((state: RootState) => state.habits);
  const today = new Date().toISOString().split("T")[0];
  const dispatch = useDispatch<AppDispatch>();

  const getStreak = (habit: Habit): number => {
    let streak = 0;
    const curr = new Date();
    while (true) {
      const dateString = curr.toISOString().split("T")[0];
      if (habit.completeDates.includes(dateString)) {
        streak++;
        curr.setDate(curr.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {habits.map((item) => (
        <Paper
          key={item.id}
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: "#f5f5f5",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#333",
                  textTransform: "capitalize",
                }}
              >
                {item.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  textTransform: "capitalize",
                  fontStyle: "italic",
                  mt: 0.5,
                }}
              >
                Frequency: {item.frequency}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <Button
                  variant="outlined"
                  color={
                    item.completeDates.includes(today) ? "success" : "primary"
                  }
                  startIcon={<CheckCircleIcon />}
                  onClick={() =>
                    dispatch(toggleHabit({ id: item.id, date: today }))
                  }
                  sx={{
                    textTransform: "none",
                    color: item.completeDates.includes(today)
                      ? "#2e7d32"
                      : "#1976d2",
                    borderColor: item.completeDates.includes(today)
                      ? "#2e7d32"
                      : "#1976d2",
                  }}
                >
                  {item.completeDates.includes(today)
                    ? "Completed"
                    : "Mark Complete"}
                </Button>
                <IconButton
                  color="error"
                  onClick={() => dispatch(removeHabit({ id: item.id }))}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, color: "#444" }}>
              Current Streak: {getStreak(item)} days
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(getStreak(item) / 30) * 100}
              sx={{
                mt: 1,
                height: 8,
                borderRadius: 2,
                backgroundColor: "#ddd",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#1976d2",
                },
              }}
            />
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default HabitList;
