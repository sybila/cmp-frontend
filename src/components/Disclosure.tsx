import React, { useState } from "react";
import styled, { css } from "styled-components/macro";
import { rem } from "polished";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

type Props = {
  children?: React.ReactNode;
  noContent?: string;
  caption: string;
  defaultExpanded?: boolean;
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

const Line = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.greyLighter};
    height: 1px;
    width: 40%;
  `
);

type DisclosureListProps = { show?: boolean };
const DisclosureList = styled.div.attrs<DisclosureListProps>(({ show }) => ({
  style: { display: show ? "flex" : "none" },
}))<DisclosureListProps>(
  ({ theme }) => css`
    flex-direction: column;
    padding-left: ${rem(theme.custom.sizes["size-1"] * 3.25)};
  `
);

const NoDisclosureMsg = styled.span(
  ({ theme }) => css`
    color: rgb(153, 153, 153);
    display: flex;
    margin-right: ${rem(theme.custom.sizes["size-1"])};
  `
);

const Disclosure = ({
  children,
  noContent,
  caption,
  defaultExpanded,
}: Props) => {
  const [isOpen, setOpen] = useState(defaultExpanded ?? false);
  if (!React.Children.count(children))
    return (
      <ButtonWrapper>
        {noContent && <NoDisclosureMsg>{noContent}</NoDisclosureMsg>}
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
          {caption}
        </ToggleButton>
        <Line />
      </ButtonWrapper>
      <DisclosureList show={isOpen}>{children}</DisclosureList>
    </div>
  );
};

export default Disclosure;
