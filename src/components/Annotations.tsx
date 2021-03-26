import React, { useState } from "react";
import styled, { css } from "styled-components/macro";
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

const ToggleButton = styled.button(
  ({ theme }) => css`
    background: none;
    border: none;
    display: flex;
    margin-right: ${rem(theme.custom.sizes["size-1"])};
    align-items: center;
  `
);

const Line = styled.div`
  background: #43c6ac;
  height: 1px;
  width: 40%;
`;

type AnnotationsListProps = { show?: boolean };
const AnnotationsList = styled.div.attrs<AnnotationsListProps>(({ show }) => ({
  style: { display: show ? "flex" : "none" },
}))<AnnotationsListProps>(
  ({ theme }) => css`
    flex-direction: column;
    padding-left: ${rem(theme.custom.sizes["size-1"] * 3.25)};
  `
);

const AnnotationItem = styled.div(
  ({ theme }) => css`
    display: flex;
    margin: ${rem(theme.custom.sizes["size-1.5"])} 0;
  `
);

const AnnotationName = styled.div(
  ({ theme }) => css`
    display: flex;
    margin-right: ${rem(theme.custom.sizes["size-1"])};
  `
);

const AnnotationLink = styled.a`
  display: flex;
`;

const NoAnnotationsMsg = styled.span(
  ({ theme }) => css`
    color: rgb(153, 153, 153);
    display: flex;
    margin-right: ${rem(theme.custom.sizes["size-1"])};
  `
);

const Annotations = ({ list }: Props) => {
  const [isOpen, setOpen] = useState(false);

  if (!list.length)
    return (
      <ButtonWrapper>
        <NoAnnotationsMsg>This item has no annotations.</NoAnnotationsMsg>
      </ButtonWrapper>
    );

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
