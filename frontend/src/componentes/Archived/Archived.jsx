import React from "react";
import { useEffect } from "react";
import {
  deleteNote,
  getNotes,
  archiveNote,
  updateNote,
  getCategorys,
  filterByCateg,
} from "../../redux/actions";
import style from "./Archived.module.css";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import unarchivedLogo from "../../img/unarchived.png";

const Archived = () => {
  const dispatch = useDispatch();
  let notes = useSelector((state) => state.notes);
  let categs = useSelector((state) => state.categorys);
  let archived = notes.filter((note) => note.archived === true);

  useEffect(() => {
    dispatch(getNotes());
    dispatch(getCategorys());
  }, [dispatch]);

  const onClose = (id) => {
    let res = window.confirm("Are you sure to delete this note?");
    if (res === true) {
      dispatch(deleteNote(id));
    }
  };

  const archive = (id) => {
    notes.map((note) => note.id === id && (note.archived = false));

    dispatch(updateNote({ archived: "false" }, id));
    dispatch(archiveNote(id));
  };

  const handlerFilterCategs = (e) => {
    dispatch(filterByCateg(e.target.value));
  };

  return (
    <div className={style.divaHome}>
      <div className={style.divTitle}>
        <h1>Archived Notes</h1>
      </div>
      <div className={style.buttons}>
        <Link to="/">
          <button className={style.btn}>Go back to unarchived notes</button>
        </Link>

        <select onChange={(e) => handlerFilterCategs(e)} className={style.btn}>
          <option hidden>Filter by category...</option>
          <option value="all">All</option>
          {categs?.map((c) => {
            return (
              <option value={c.name} key={c.id}>
                {c.name}
              </option>
            );
          })}
        </select>
      </div>

      {archived.length > 0 ? (
        <div>
          <div className={style.section}>
            {archived.map((card) => (
              <div key={card.id}>
                <Card
                  id={card.id}
                  onClose={onClose}
                  archive={archive}
                  title={card.title}
                  category={card.category}
                  content={card.content}
                  lastEdited={card.fecha}
                  archivedLogo={unarchivedLogo}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={style.notFound}>
          <h3>You can see here any note you archived.</h3>
        </div>
      )}
    </div>
  );
};

export default Archived;
