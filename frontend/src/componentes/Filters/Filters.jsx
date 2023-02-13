import React from "react";
import { useEffect } from "react";
import { getNotes, filterByCateg, getCategorys } from "../../redux/actions";
import style from "./Filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Filters = () => {
  const dispatch = useDispatch();
  let categs = useSelector((state) => state.categorys);

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);

  const handlerFilterCategs = (e) => {
    dispatch(filterByCateg(e.target.value));
  };

  const handlerAllNotes = () => {
    dispatch(getNotes());
    document.getElementById("categFilter").value = "Filter by category...";
  };

  return (
    <div className={style.divaHome}>
      <Link
        to="/"
        className={style.allNotes}
        style={{ textDecoration: "none" }}
      >
        <button onClick={(e) => handlerAllNotes(e)}>All Notes</button>
      </Link>

      <div className={style.buttons}>
        <Link
          to="/archivedNotes"
          className={style.b}
          style={{ textDecoration: "none" }}
        >
          <button>Archived Notes</button>
        </Link>
        <Link
          to="/notes"
          className={style.b}
          style={{ textDecoration: "none" }}
        >
          <button>Create Note</button>
        </Link>

        <SearchBar className={style.b} />

        <select
          onChange={(e) => handlerFilterCategs(e)}
          className={style.b}
          id="categFilter"
        >
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
    </div>
  );
};

export default Filters;
