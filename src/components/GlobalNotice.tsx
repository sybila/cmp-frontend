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
          </Message>
        ))}
      </div>
    </section>
  ) : (
    <></>
  );
};

export default GlobalNotice;
