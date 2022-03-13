import React, { useState } from "react";
import "./PopUp.css";
import notifImg from "../../assets/notif.png";

export default ({ close, items }) => {
  const [itemNumber, changeItem] = useState(0);
  return (
    <div className="popupWrap">
      <div className="popup">
        <figure>
          <img src={notifImg} alt="Help" />
        </figure>
        <div className="content">
          <p dangerouslySetInnerHTML={{ __html: items[itemNumber] }} />
          <div onClick={close} className="closePopUp">
            ×
          </div>

          {itemNumber !== 0 && (
            <div className="answer_button margin prew l">
              <button
                className="prew"
                onClick={() => changeItem(itemNumber - 1)}
              >
                {"<"}
              </button>
            </div>
          )}
          {itemNumber === items.length - 1 && (
            <div className="answer_button margin sub">
              <button className="submit" onClick={close}>
                Okay
              </button>
            </div>
          )}
          {itemNumber !== items.length - 1 && (
            <div className="answer_button margin prew r">
              <button
                className="prew"
                onClick={() => changeItem(itemNumber + 1)}
              >
                {">"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
