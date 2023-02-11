import React, { useEffect } from "react";
import style from "./Detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";

const Detail = () => {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);
  let { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <div className={style.buttons}>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to={`/notes/${id}`}>
          <button>Edit Note</button>
        </Link>
      </div>
      <div className={style.divaHome}>
        {detail.length && (
          <div className={style.card}>
            <div className={style.body}>
              <div className={style.link}>
                <h1 className={style.title}>{detail[0].title}</h1>
              </div>
              <p>Last edited: {detail[0].fecha.split("", 10)}</p>
              <hr></hr>
              <div className={style.contentBody}>
                <p>Content: </p>
                <p className={style.contentBodyp}>{detail[0].content}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
