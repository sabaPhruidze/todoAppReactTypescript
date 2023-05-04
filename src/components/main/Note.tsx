import { useState } from "react";
import circleNothing from "../../icons/circleNothing.svg";
import circleRight from "../../icons/circleRight.svg";
import trashCan from "../../icons/trashCan.svg";

type Note = {
  text: string;
  isChecked: boolean;
};

export default function Note() {
  const [cCircle, sCircle] = useState(true); //currentCircle,setCircle
  const [cIValue, sIValue] = useState(""); // set input value and current input value
  const [cArray, sArray] = useState<Note[]>([]);

  const handleDelete = (index: number) => {
    const newArray = [...cArray];
    newArray.splice(index, 1);
    sArray(newArray);
  };

  return (
    <div className="todoApp">
      <div className="inputAdd">
        <input
          id="input"
          name="input"
          type="text"
          onChange={(e) => {
            sIValue(e.target.value);
          }}
          title="write at least 1 word, number or symbol"
          value={cIValue}
        />
        <button
          className="btn"
          onClick={() => {
            if (cIValue.length >= 1) {
              sArray([...cArray, { text: cIValue, isChecked: false }]);
              sIValue("");
            }
          }}
        >
          +
        </button>
      </div>
      {cArray.map((note: Note, index: number) => {
        const date = new Date();

        return (
          <div className="container-outside" key={index}>
            <div className="containerTitle">
              {note.isChecked ? (
                <h4>
                  <s>{note.text}</s>
                </h4>
              ) : (
                <h4>{note.text}</h4>
              )}
              <p>{date.toLocaleDateString()}</p>
            </div>
            <div className="d-flex-row">
              <img
                alt="checked or not"
                src={note.isChecked ? circleRight : circleNothing}
                className="icon doneOrNot"
                onClick={() => {
                  const newArray = [...cArray];
                  newArray[index].isChecked = !note.isChecked;
                  sArray(newArray);
                }}
              />
              <img
                alt="remove"
                src={trashCan}
                className="icon remove"
                onClick={() => handleDelete(index)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
