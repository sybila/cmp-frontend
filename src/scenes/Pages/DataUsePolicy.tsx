import React from "react";

const DataUsePolicy = () => {
  return (
    <div className="">
      <h1>GDPR</h1>

      <h2>Data Use Policy</h2>
      <p>
        This policy describes the information we process on
        https://new.e-cyanobacterium.org/
      </p>
      <h2>What kinds of information do we collect?</h2>
      <ul>
        <li>
          E-mail address: the address is used for contact purposes only, it is
          not provided to any third-party sites.
        </li>
        <li>
          Cookie data: data from cookies stored on your device, including cookie
          IDs and settings.
        </li>
      </ul>
      <h2>How do we use this information?</h2>
      <p>
        We use the information to communicate with you about your provided
        experimental data, and let you know about our policies and terms. We
        also use your information to respond to you when you contact us.
      </p>
      <h2>How can you exercise your rights provided under the GDPR?</h2>
      <p>
        Under the General Data Protection Regulation, you have the right to
        access, rectify, and erase your data.
      </p>
      <h2>Account deletion</h2>
      <p>
        You can request to delete your personal account by{" "}
        <a href="mailto:ecyano@fi.muni.cz?subject=Delete%20my%20ecyano%20account">
          contacting us
        </a>
        . When we delete your account, we delete all your personal data and
        private experimental data, and you won't be able to recover that
        information later. However, data publicly provided by you will not be
        deleted, since other people might depend on them.
      </p>
    </div>
  );
};

export default DataUsePolicy;
