import React, { useEffect } from "react";
import service from "../../services";

const BioQuantitiesList = () => {
  useEffect(() => {
    service.fetchAllBioNumbers(1, 2, 0);
  }, []);

  return (
    <div className="section">
      <div className="container">
        <h2 className="title is-2">Experiments</h2>
        <div className="box">
          <p>
            Model repository contains computational models of selected
            biological processes relevant for cyanobacteria. Models implemented
            on this website are manually curated, integrated within the
            e-cyanobacterium formal Biochemical Space, and associated with
            cross-references.{" "}
          </p>

          <p>
            Most of the implemented models are already published, though some of
            the models present fresh work which might be yet unpublished. All of
            the models are available in public domain.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BioQuantitiesList;
