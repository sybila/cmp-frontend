import React, { useCallback, useState } from "react";
import { isEqual } from "lodash";
import { useSelector } from "react-redux";
import { getGlobalNotices } from "ApplicationSelectors";
import Message from "./Message";
import { GlobalNoticeInterface } from "reducers/GlobalNoticeReducer";

const GlobalNotice = () => {
  const [loading, setLoading] = useState({});
  const [message, setMessage] = useState({});
  const notices: GlobalNoticeInterface[] = useSelector(
    getGlobalNotices,
    isEqual
  );

  const handleClick = useCallback(
    async (e, i, action) => {
      setLoading({ ...loading, [i]: true });
      try {
        await action.onClick(e);
        setMessage({ ...message, [i]: action.success });
      } catch (error) {
        console.warn(error);
        setMessage({ ...message, [i]: action.error });
      } finally {
        setLoading({ ...loading, [i]: false });
      }
    },
    [setLoading]
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
                    <React.Fragment key={`notice-${i}-action-${j}`}>
                      <button
                        className={`button is-text is-primary${
                          loading[j] ? " is-loading" : ""
                        }`}
                        onClick={(e) =>
                          !loading[j] && handleClick(e, j, action)
                        }
                      >
                        {action.caption}
                      </button>
                      <div>{message[j] ? message[j] : ""}</div>
                    </React.Fragment>
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
