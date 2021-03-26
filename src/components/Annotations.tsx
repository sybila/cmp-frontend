import React, { useState } from "react";
import styled from "styled-components/macro";
import { rem } from "polished";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Annotation } from "models/GenericTypes";

type Props = {
  list: Annotation[];
};

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  display: flex;
  margin-right: ${rem(12)};
  align-items: center;
`;

const Line = styled.div`
  background: #43c6ac;
  height: 1px;
  width: 40%;
`;

const AnnotationsList = styled.div.attrs<{ show?: boolean }>(({ show }) => ({
  style: { display: show ? "flex" : "none" },
}))`
  flex-direction: column;
  padding-left: ${rem(26)};
`;

const AnnotationItem = styled.div`
  display: flex;
  margin: ${rem(12)} 0;
`;

const AnnotationName = styled.span`
  display: flex;
  margin-right: ${rem(8)};
`;

const AnnotationLink = styled.a`
  display: flex;
`;

const Annotations = ({ list }: Props) => {
  const [isOpen, setOpen] = useState(false);

  if (!list.length) return;

  return (
    <div>
      <ButtonWrapper>
        <ToggleButton type="button" onClick={() => setOpen(!isOpen)}>
          <FontAwesomeIcon
            className="m-r-10"
            icon={isOpen ? faAngleUp : faAngleDown}
          />
          Annotations
        </ToggleButton>
        <Line />
      </ButtonWrapper>
      <AnnotationsList show={isOpen}>
        {list.map((annotation, i) => (
          <AnnotationItem key={`annotation-item-${i}`}>
            <AnnotationName>{annotation.id}</AnnotationName>
            <AnnotationLink href={annotation.link} target="_blank">
              {annotation.link}
            </AnnotationLink>
          </AnnotationItem>
        ))}
      </AnnotationsList>
    </div>
  );
};

export default Annotations;
