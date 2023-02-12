import style from "./updateNote.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  getCategorys,
  getDetail,
  postCategory,
  updateNote,
} from "../../redux/actions";

const UpdateNote = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const categs = useSelector((state) => state.categorys);
  const detail = useSelector((state) => state.detail);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getCategorys());
  }, [dispatch, id]);

  const [input, setInput] = useState({
    id,
    title: "",
    content: "",
    category: [],
  });

  const handlerChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(updateNote(input, id));
    alert("Nota actualizada con éxito! Se te redirigirá al inicio...");
    setInput({
      id,
      title: "",
      content: "",
      category: [],
    });
    history.push("/");
  };

  const handlerSelectCateg = (e) => {
    if (!input.category.includes(e.target.value)) {
      setInput({
        ...input,
        category: [...input.category, e.target.value],
      });
    }
  };

  const [name, setname] = useState("");

  const handlerChangeCateg = (e) => {
    setname(e.target.value);
  };

  const handlerSubmitCateg = (e) => {
    e.preventDefault();
    console.log(name);
    dispatch(postCategory({ name }));
    dispatch(getCategorys()).then(dispatch(getCategorys()));
    setname("");
  };

  return (
    <div>
      <div className={style.createCont}>
        <h1>Update Note</h1>
        <Link to="/">
          <button>Home</button>
        </Link>

        {detail.length && (
          <div className={style.forms}>
            {/* creacion de categoría */}

            <form onSubmit={(e) => handlerSubmitCateg(e)}>
              <div className={style.inputI}>
                <label className={style.newCat}>New Category: </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  className={style.titleInput}
                  onChange={(e) => handlerChangeCateg(e)}
                ></input>

                <div>
                  <button type="submit">Create category!</button>
                </div>
              </div>
            </form>

            {/* creacion de la nota */}

            <form onSubmit={(e) => handlerSubmit(e)}>
              {detail[0].category.length ? (
                <p
                  className={style.pcategs}
                >{`Previous category: ${detail[0].category}`}</p>
              ) : (
                <p className={style.pcategs}>
                  Note without previous category! Select one:
                </p>
              )}
              <div className={style.categs}>
                {categs?.map((obj) => {
                  return (
                    <div className={style.categsDiv}>
                      <label
                        htmlFor={obj.name}
                        key={obj.id}
                        className={style.categsLabel}
                      >
                        {obj.name}
                        <input
                          type="checkbox"
                          name="categ"
                          id={obj.id}
                          value={obj.name}
                          onChange={(e) => handlerSelectCateg(e)}
                        />
                      </label>
                    </div>
                  );
                })}
              </div>

              <div className={style.inputI}>
                <label>Title: </label>
                <input
                  placeholder={`Anterior: ${detail[0].title}`}
                  type="text"
                  name="title"
                  value={input.title}
                  className={style.titleInput}
                  onChange={(e) => handlerChange(e)}
                ></input>
              </div>

              <div className={style.inputI}>
                <label>Content: </label>
                <textarea
                  placeholder={`Anterior: ${detail[0].content}`}
                  type="text"
                  name="content"
                  value={input.content}
                  className={style.contentInput}
                  onChange={(e) => handlerChange(e)}
                ></textarea>
              </div>

              <div className={style.publicar}>
                <button type="submit">Update!</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateNote;
