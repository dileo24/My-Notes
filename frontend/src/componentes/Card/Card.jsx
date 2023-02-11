import React from "react";
import style from "./cards.module.css";
import edit from "../../img/edit.png";
import trash from "../../img/trash.png";
import { Link, NavLink } from "react-router-dom";

const Card = ({
  id,
  title,
  lastEdited,
  onClose,
  archive,
  archivedLogo,
  category,
}) => {
  return (
    <div>
      <div className={style.card}>
        <div className={style.body}>
          <NavLink to={`/detail/${id}`} style={{ textDecoration: "none" }}>
            <div className={style.link}>
              <h1 className={style.title}>{title}</h1>
              <p>({category.join(", ")})</p>
            </div>
          </NavLink>
          <p>Last edited: {lastEdited.split("", 10)}</p>
          <div className={style.imgs}>
            <button onClick={() => archive(id)}>
              <img src={archivedLogo} alt="img"></img>
            </button>

            <button onClick={() => onClose(id)}>
              <img src={trash} alt="img"></img>
            </button>

            <Link to={`/notes/${id}`}>
              <button>
                <img src={edit} alt="img"></img>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
