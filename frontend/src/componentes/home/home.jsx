import React from "react";
import { useEffect } from "react";
import {
  deleteNote,
  getNotes,
  archiveNote,
  updateNote,
} from "../../redux/actions";
import style from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import archivedLogo from "../../img/archived.png";
import Filters from "../Filters/Filters";

const Home = () => {
  const dispatch = useDispatch();
  let notes = useSelector((state) => state.notes);
  let unarchived = notes.filter((note) => note.archived !== true);

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  const onClose = (id) => {
    let res = window.confirm("Are you sure to delete this note?");
    if (res === true) {
      dispatch(deleteNote(id));
    }
  };

  const archive = (id) => {
    notes.map((note) => note.id === id && (note.archived = true));

    dispatch(updateNote({ archived: true }, id));
    dispatch(archiveNote(id));
  };

  return (
    <div className={style.divaHome}>
      <div className={style.divTitle}>
        <h1>My Notes</h1>
      </div>

      <Filters />

      {unarchived.length > 0 ? (
        <div className={style.section}>
          {unarchived.map((card) => (
            <div key={card.id}>
              <Card
                id={card.id}
                onClose={onClose}
                archive={archive}
                title={card.title}
                category={card.category}
                content={card.content}
                lastEdited={card.fecha}
                archivedLogo={archivedLogo}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={style.notFound}>
          <h3>You can charge any note you want in the button "Create Note"</h3>
        </div>
      )}
    </div>
  );
};

export default Home;
