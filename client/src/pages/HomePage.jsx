import { useEffect, useState } from "react";
import SideBar from "../components/Nav/SideBar";
import RecentsCard from "../components/Home/RecentsCard";
import StatsCard from "../components/Home/StatsCard";
import '../components/Styles/Homepage.css';
import { animateCards } from "../animations";
import NavBar from "../components/Nav/NavBar";
import { api } from "../utils/api";

const HomePage = () => {
  const [view, setView] = useState("daily");
  const [recentTasks, setRecentTasks] = useState([]);
  const [taskStats, setTaskStats] = useState({
    completed: 0,
    inProgress: 0,
    pending: 0,
  });

  // const username = localStorage.getItem("username") 

  useEffect(() => {
    // Fetch recent tasks
    api
      .get(
        "/recent-tasks",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        setRecentTasks(response.data);
      })
      .catch((error) => console.error("Error fetching recent tasks:", error));

    // Fetch task statistics
    fetchTaskStats(view);

    animateCards(); // Trigger animation on component mount
  }, [view]); // Refetch stats when view changes

  const fetchTaskStats = (view) => {
    api
      .get(`/tasks/stats`, {
        params: { view },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setTaskStats(response.data);
      })
      .catch((error) => console.error("Error fetching task stats:", error));
  };

  return (
    <div className="home">
      <NavBar />
      <div className="content">
        <SideBar />
        <div className="homepage-container">
          <RecentsCard recentTasks={recentTasks} />
          <StatsCard
            view={view}
            currentStats={taskStats}
            handleViewChange={setView}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

