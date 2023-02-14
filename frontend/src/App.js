import "./App.css";
import Home from "./componentes/home/home.jsx";
import { Route } from "react-router-dom";
import axios from "axios";
import NoteCreate from "./componentes/NoteCreate/NoteCreate";
import UpdateNote from "./componentes/UpdateNote/updateNote";
import Archived from "./componentes/Archived/Archived";
import Detail from "./componentes/Detail/Detail";

/* axios.defaults.baseURL = "http://localhost:3001"; */
axios.defaults.baseURL = "https://mynotesback.onrender.com";

function App() {
  return (
    <div className="divPadre">
      <Route exact path="/" component={Home} />
      <Route exact path="/notes" component={NoteCreate} />
      <Route exact path="/archivedNotes" component={Archived} />
      <Route path="/notes/:id" component={UpdateNote} />
      <Route path="/detail/:id" component={Detail} />
    </div>
  );
}

export default App;
