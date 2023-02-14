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
      <div className={style.nav}>
        <Link
          to="/"
          className={style.allNotes}
          style={{ textDecoration: "none" }}
        >
          <button onClick={(e) => handlerAllNotes(e)} className={style.btn}>
            All Notes
          </button>
        </Link>
        <div>
          <SearchBar />
        </div>
      </div>

      <div className={style.buttons}>
        <Link to="/archivedNotes" style={{ textDecoration: "none" }}>
          <button className={style.btn}>Archived Notes</button>
        </Link>
        <Link to="/notes" style={{ textDecoration: "none" }}>
          <button className={style.btn}>Create Note</button>
        </Link>

        <select
          onChange={(e) => handlerFilterCategs(e)}
          className={style.btn}
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
