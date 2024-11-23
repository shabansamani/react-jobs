import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";

const addJob = async (newJob) => {
  const res = await fetch("/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newJob),
  });
  return;
};

const deleteJob = async (jobId) => {
  const res = await fetch(`/api/jobs/${jobId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route
        path="/jobs/:id"
        element={<JobPage deleteJobSubmit={deleteJob} />}
        loader={jobLoader}
      />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
    </Route>,
  ),
);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
