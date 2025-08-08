import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import Navbar from "./components/Navbar";
import GlobalProvider from "./contexts/GlobalContext";
import TaskDetail from "./pages/TaskDetail"

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/task/:id" element={<TaskDetail />} />
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<AddTask />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
