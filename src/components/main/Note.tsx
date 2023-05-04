import { useState, useEffect } from "react";
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

  useEffect(() => {
    const storedData = localStorage.getItem("localStorageData");
    if (storedData) {
      sArray(JSON.parse(storedData));
    }
  }, []);

  const deleteItem = (index: number) => {
    const newArray = [...cArray];
    newArray.splice(index, 1);
    sArray(newArray);
    localStorage.setItem("localStorageData", JSON.stringify(newArray));
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
              const newArray = [...cArray, { text: cIValue, isChecked: false }];
              sArray(newArray);
              sIValue("");
              localStorage.setItem(
                "localStorageData",
                JSON.stringify(newArray)
              );
            }
          }}
        >
          +
        </button>
      </div>
      {cArray.map((note: Note, idx: number) => {
        const date = new Date();

        return (
          <div className="container-outside" key={idx}>
            <div className="containerTitle">
              {note.isChecked ? (
                <h4>
                  <s>{note.text}</s>
                </h4>
              ) : (
                <h4>{note.text}</h4>
              )}
              {/* So is the circle will be checked it will have crossover */}
              <p>{date.toLocaleDateString()}</p>
            </div>
            <div className="d-flex-row">
              <img
                alt="checked or not"
                src={note.isChecked ? circleRight : circleNothing}
                className="icon doneOrNot"
                onClick={() => {
                  const newArray = [...cArray];
                  newArray[idx].isChecked = !note.isChecked; // using this the circle will toggle in local storage as well.
                  sArray(newArray);
                  localStorage.setItem(
                    "localStorageData",
                    JSON.stringify(newArray)
                  );
                }}
              />
              <img
                alt="remove"
                src={trashCan}
                className="icon remove"
                onClick={() => deleteItem(idx)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
