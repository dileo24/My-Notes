import React, { useEffect } from "react";
import style from "./Detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail, getDetail } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";

const Detail = () => {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);
  let { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
    return function () {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  return (
    <div>
      {detail.length ? (
        <div className={style.buttons}>
          <Link to="/">
            <button className={style.btn}>Home</button>
          </Link>
          <Link to={`/notes/${id}`}>
            <button className={style.btn}>Edit Note</button>
          </Link>
        </div>
      ) : (
        <div className={style.buttons}>
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>
      )}
      <div className={style.divaHome}>
        {detail.length ? (
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
        ) : (
          <div className={style.notFound}>
            <h3>
              This note doesn't exist or has been deleted, come back to see the
              created ones.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
