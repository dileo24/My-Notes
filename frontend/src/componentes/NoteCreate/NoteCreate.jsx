import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import style from "./NoteCreate.module.css";
import {
  getCategorys,
  getNotes,
  postCategory,
  postNotes,
} from "../../redux/actions";

const NoteCreate = () => {
  const dispatch = useDispatch();
  const categs = useSelector((state) => state.categorys);

  const history = useHistory();
  const [input, setInput] = useState({
    title: "",
    content: "",
    category: [],
  });

  useEffect(() => {
    dispatch(getNotes());
    dispatch(getCategorys());
  }, [dispatch]);

  const handlerChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handlerSubmitForm = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(postNotes(input));
    alert("Note created succefully! You will be redirected to the home...");
    setInput({
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
    dispatch(postCategory({ name }))
      .then(dispatch(getCategorys()))
      .then(dispatch(getCategorys()));
    setname("");
  };

  return (
    <div>
      <div className={style.createCont}>
        <h1>Create Note</h1>
        <Link to="/">
          <button className={style.btn}>Home</button>
        </Link>
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

          <form onSubmit={(e) => handlerSubmitForm(e)}>
            <p className={style.pcategs}>Select one category!</p>
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
                type="text"
                name="content"
                value={input.content}
                className={style.contentInput}
                onChange={(e) => handlerChange(e)}
              ></textarea>
            </div>

            <div className={style.publicar}>
              <button type="submit">Create!</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteCreate;
