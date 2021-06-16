import React, { useCallback, useEffect, useState } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { moduleNames as modelsNames } from "../../../modelsRepository/reducers/MainReducer";
import api from "../../services";

const AddModel = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [rawImport, setRawImport] =
    useState<string | ArrayBuffer | undefined>();

  const handleFileUpload = useCallback(() => {
    api.importModel(rawImport);
  }, [rawImport]);

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
          <div>
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <button disabled={!rawImport} onClick={handleFileUpload}>
              Upload
            </button>
          </div>
          {!selectedFile && (
            <div>
              <br />
              <h4>Choose the file before Uploading</h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddModel;
