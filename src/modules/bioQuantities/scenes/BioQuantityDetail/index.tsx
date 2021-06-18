import { BioQuantityDetail as BioQuantityDetailType } from "models/BioQuantities";
import DetailSection from "components/DetailSection";
import React, { useCallback, useEffect, useState } from "react";
import { Flex, Box } from "rebass";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Link, useRouteMatch } from "react-router-dom";
import Disclosure from "components/Disclosure";

import { moduleNames as bioQuantitiesNames } from "../../reducers/MainReducer";
import services from "../../services";
import { useApi, ApiStates } from "hooks/useApi";

type Params = { detailId: string };

const BioQuantityDetail = () => {
  const match = useRouteMatch<Params>();

  const [detail, loadingState] = useApi(
    useCallback(
      () => services.fetchBioNumber(parseInt(match.params.detailId, 10)),
      []
    )
  );

  return detail ? (
    <>
      <BreadcrumbsItem to={`/${bioQuantitiesNames.url}/detail/${detail.id}`}>
        {detail.name}
      </BreadcrumbsItem>
      <DetailSection title={detail.name}>
        <Disclosure
          caption="Annotations"
          noContent="This item has no annotations."
        >
          {detail.annotations?.map((annotation) => {
            return (
              <Flex my={1}>
                <Box mr={2}>{annotation.id}</Box>
                <Box as="a" mr={2} href={annotation.link} target="_blank">
                  {annotation.link}
                </Box>
              </Flex>
            );
          })}
        </Disclosure>
      </DetailSection>
    </>
  ) : (
    <section className="section p-b-0">
      <div className="container">
        {loadingState === ApiStates.REJECTED && (
          <div className="box ">
            <h4 className="title is-4 m-b-10">Error</h4>
            <div className="notification is-danger is-light">
              <strong>Error: </strong>selected bio quantity was not found.
            </div>
            <Link to="/bio-quantity">Return to repository</Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BioQuantityDetail;
