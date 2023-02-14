import React from "react";
import style from "./searchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import img from "../../img/lupa.png";
import { NavLink } from "react-router-dom";
import { searchXtitle } from "../../redux/actions";

const SearchBar = () => {
  const [state, setState] = useState("");

  const dispatch = useDispatch();

  const fnState = (event) => {
    setState(event.target.value);
  };

  const limpiarState = () => {
    dispatch(searchXtitle(state));
    setState("");
  };

  return (
    <div className={style.divInput}>
      <input
        type="text"
        placeholder="Search notes..."
        onChange={fnState}
        value={state}
        className={style.input}
      ></input>{" "}
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <button type="submit" onClick={limpiarState} className={style.btn}>
          <img className={style.lupa} alt="" src={img}></img>
        </button>
      </NavLink>
    </div>
  );
};

export default SearchBar;
