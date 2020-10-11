import React from "react";
import { isEqual } from "lodash";
import { useSelector } from "react-redux";
import { getGlobalNotices } from "ApplicationSelectors";
import Message from "./Message";
import { GlobalNoticeInterface } from "reducers/GlobalNoticeReducer";

const GlobalNotice = () => {
  const notices: GlobalNoticeInterface[] = useSelector(
    getGlobalNotices,
    isEqual
  );

  return notices.length ? (
    <section className="section global-notices">
      <div className="container">
        {notices.map((notice, i) => (
          <Message key={`notice-${i}`} type={notice.type}>
            <h3>{notice.heading}</h3>
            <p>{notice.message}</p>
            <div className="actions m-t-20">
              {notice.actions &&
                notice.actions.map((action, j) => {
                  return (
                    <button
                      key={`notice-${i}-action-${j}`}
                      className="button is-text is-primary"
                      onClick={action.onClick}
                    >
                      {action.caption}
                    </button>
                  );
                })}
            </div>
          </Message>
        ))}
      </div>
    </section>
  ) : (
    <></>
  );
};

export default GlobalNotice;
