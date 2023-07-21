import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"/>
        <Route path="/login"/>
        <Route path="/register"/>
        <Route path="/task"/>
        <Route path="/add-task"/>
        <Route path="/task/:id"/>
        <Route path="/profile"/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
