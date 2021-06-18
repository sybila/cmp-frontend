import { faUpload } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Button, Flex } from "rebass/styled-components";
import { moduleNames as modelsNames } from "../../../modelsRepository/reducers/MainReducer";
import api from "../../services";
import styled, { css } from "styled-components/macro";
import { rem } from "polished";
import WhiteBox from "components/WhiteBox";
import XMLViewer from "react-xml-viewer";

const UploadButton = styled(Button)(
  ({ theme }) => css`
    padding: ${rem(theme.custom.sizes["size-1"])}
      ${rem(theme.custom.sizes["size-2"])};
    margin-bottom: ${rem(theme.custom.sizes["size-1"])};
    margin-left: ${rem(theme.custom.sizes["size-3"])};
  `
);

const XMLBox = styled(WhiteBox)`
  overflow: auto;
`;

const enc = new TextDecoder("utf-8");

const AddModel = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [rawImport, setRawImport] =
    useState<string | ArrayBuffer | undefined>();
  const [uploadStatus, setUploadStatus] = useState<string>();

  const handleFileUpload = useCallback(() => {
    api
      .importModel(rawImport)
      .then(() => {
        setSelectedFile(undefined);
        setRawImport(undefined);
        setUploadStatus("Uploaded successfully");
      })
      .catch(() => setUploadStatus("Upload failed"));
  }, [rawImport]);

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setSelectedFile(e.target.files[0]);
      setUploadStatus("");
    }, []);

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        setRawImport(e.target.result);
      };

      reader.readAsArrayBuffer(selectedFile);
    }
  }, [selectedFile]);

  return (
    <>
      <BreadcrumbsItem to={`/${modelsNames.url}/detail`}>
        New model
      </BreadcrumbsItem>
      <div className="section">
        <div className="container">
          <h2>Import SBML v3 model</h2>
          <WhiteBox $isRow>
            <Flex>
              <div className={`file${selectedFile ? " has-file" : ""}`}>
                <label className="file-label">
                  <input
                    className="file-input"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <span className="file-cta">
                    <span className="file-icon">
                      <FontAwesomeIcon className="m-r-10" icon={faUpload} />
                    </span>
                    <span className="file-label">Choose a file…</span>
                  </span>
                  {selectedFile && (
                    <span className="file-name">{selectedFile.name}</span>
                  )}
                </label>
              </div>
              <UploadButton
                type="button"
                disabled={!rawImport}
                onClick={handleFileUpload}
              >
                Upload
              </UploadButton>
            </Flex>
          </WhiteBox>
          {rawImport && (
            <XMLBox $isRow>
              <XMLViewer xml={enc.decode(rawImport as BufferSource)} />
            </XMLBox>
          )}
          {uploadStatus && (
            <article className="message is-dark">
              <div className="message-body">{uploadStatus}</div>
            </article>
          )}
        </div>
      </div>
    </>
  );
};

export default AddModel;
