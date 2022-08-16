import React from "react";

const Note = (props) => {
  const deleteByIndex = () => props.removeNote(props.noteID);

  const updateTitle = (e) => {
    const updatedVal = e.target.value;
    const noteID = props.note.id;
    props.onType(noteID, "title", updatedVal);
  };

  const updateDescription = (e) => {
    const updatedVal = e.target.value;
    const noteID = props.note.id;
    props.onType(noteID, "description", updatedVal);
  };

  const clickDelete = (e) => {
    props.removeNote(props.note.id);
  };

  return (
    <li className="note">
      <input
        className="note__title"
        type="text"
        placeholder="Title"
        value={props.note.title}
        onChange={updateTitle}
      />
      <hr />
      <textarea
        className="note__description"
        placeholder="Description..."
        value={props.note.description}
        onChange={updateDescription}
      />
      <span onClick={clickDelete} className="note__delete">
        X
      </span>
      <div className="note__dogear"></div>
    </li>
  );
};

export default Note;
