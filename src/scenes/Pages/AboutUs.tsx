import React from "react";

const AboutUs = () => {
  return (
    <div className="">
      <h1>About us</h1>

      <h3>Contact</h3>
      <p>
        Systems Biology Laboratory
        <br />
        <a href="https://sybila.fi.muni.cz/" target="__blank">
          {" "}
          https://sybila.fi.muni.cz/
        </a>
      </p>

      <p>
        Faculty of Informatics
        <br />
        Masaryk University Brno
        <br />
        Czech Republic
      </p>

      <p>
        In case of any questions, please do not hesitate to contact us: <br />
        email: <a href="mailto:sybila@fi.muni.cz">sybila@fi.muni.cz</a>
      </p>

      <h3>Our Team</h3>
      <p>
        <strong>Active developers:</strong> Radoslav Doktor, Ondřej Lošťák,
        Alexandra Stanová, Martin Petr, Lukrécia Mertová, David Šafránek
      </p>
      <p>
        <strong>External collaborators:</strong> Jan Červený, Jozef Mikušinec,
        Matej Troják, Jakub Hrabec, Marek Havlík
      </p>

      <h3>How to cite</h3>
      <p>
        Please use the following reference to cite this web site:
        <br /> M. Trojak, D. Safranek, J. Hrabec, J. Salagovic, F. Romanovska,
        J. Cerveny: E-Cyanobacterium.org: A Web-Based Platform for Systems
        Biology of Cyanobacteria. In: Computational Methods in Systems Biology,
        CMSB 2016, Vol. 9859 of LNCS, pp. 316-322. Springer, 2016. DOI
      </p>

      <h3>Funding</h3>
      <p>
        Masaryk University
        <br />
        FI Dean's Programme: MUNI/33/01/2019
        <br />
        https://www.muni.cz/en/research/projects/51107
      </p>

      <h3>Related websites</h3>
      <p>
        <a href="https://www.e-cyanobacterium.org/" target="__blank">
          https://www.e-cyanobacterium.org/
        </a>
        <br />
        <a href="http://www.e-photosynthesis.org/" target="__blank">
          http://www.e-photosynthesis.org/
        </a>
      </p>
    </div>
  );
};

export default AboutUs;
