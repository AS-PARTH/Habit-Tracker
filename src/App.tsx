import { Container, Typography } from "@mui/material";
import "./App.css";
import AddHabitForm from "./component/add-habit";
import HabitList from "./component/habit-list";

function App() {
  return (
    <Container maxWidth="md">
      <Typography
        component={"h1"}
        variant="h2"
        align="center"
        sx={{
          fontSize: {
            xs: "1.5rem",
            sm: "2rem",
            md: "2.5rem",
            lg: "3rem",
          },
        }}
      >
        Habit Tracker
      </Typography>
      <AddHabitForm />
      <HabitList />
    </Container>
  );
}

export default App;
