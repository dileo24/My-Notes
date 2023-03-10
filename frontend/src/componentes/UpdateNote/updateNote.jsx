import style from "./updateNote.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  deleteCategory,
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

  const handleDeleteCateg = (e) => {
    e.preventDefault();
    dispatch(deleteCategory(e.target.value));
    dispatch(getCategorys()).then(dispatch(getCategorys()));
    console.log(e.target.value + " ELIMINADO");
    setTimeout(() => dispatch(getCategorys()), 100);
  };

  const handlerSubmitCateg = (e) => {
    e.preventDefault();
    console.log(name);
    dispatch(postCategory({ name }));
    dispatch(getCategorys()).then(dispatch(getCategorys()));
    setTimeout(() => dispatch(getCategorys()), 100);
    setname("");
  };

  return (
    <div>
      <div className={style.createCont}>
        <h1>Update Note</h1>
        <Link to="/">
          <button className={style.btn}>Home</button>
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

                <div className={style.publicCat}>
                  <button type="submit" className={style.btn} disabled={!name}>
                    Create category!
                  </button>
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
                        <div className={style.selectss}>
                          <input
                            type="checkbox"
                            name="categ"
                            id={obj.id}
                            value={obj.name || detail[0].category}
                            onChange={(e) => handlerSelectCateg(e)}
                          />
                          <button
                            value={obj.id}
                            onClick={(e) => handleDeleteCateg(e)}
                          >
                            x
                          </button>
                        </div>
                      </label>
                    </div>
                  );
                })}
              </div>

              <div className={style.inputI}>
                <label>Title: </label>
                <input
                  type="text"
                  name="title"
                  value={[input.title || detail[0].title]}
                  className={style.titleInput}
                  onChange={(e) => handlerChange(e)}
                ></input>
              </div>

              <div className={style.inputI}>
                <label>Content: </label>
                <textarea
                  type="text"
                  name="content"
                  value={[input.content || detail[0].content]}
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
