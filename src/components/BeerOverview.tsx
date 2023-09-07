import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Root as Beer } from "../types/types";
import { BeerInfoState, loadBeers } from "../redux/beerSlice";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import BeerHeader from "./BeerHeader";
import PagePagination from "./PagePagination";
import "../scss/styles.scss";

const BeerOverview: React.FC = () => {
  const state: BeerInfoState = useSelector(
    (state: RootState) => state.allBeers
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      loadBeers({
        page: state.page,
        searchQuery: state.searchValue,
        searchType: state.searchValueType,
      })
    );
  }, [dispatch, state.page, state.searchValue, state.searchValueType]);

  const goToDetailPage = (id: number) => navigate(`/beer/${id}`);

  return (
    <>
      <BeerHeader search={true} />
      <Container>
        <Row xs={1} md={2} lg={3}>
          {state.beers.length > 0 ? (
            state.beers.map((beer: Beer, index: number) => (
              <Col key={index} className="d-flex justify-content-center">
                <Card
                  className="custom-card mx-1 col-sm-x border shadow"
                  style={{
                    height: "35rem",
                    margin: "15px",
                  }}
                >
                  <Card.Header className="custom-header">
                    {beer.name}
                  </Card.Header>
                  <Card.Img
                    variant="top"
                    src={beer.image_url}
                    style={{ height: "300px", objectFit: "scale-down" }}
                    className="p-3"
                  />
                  <Card.Body className="px-4 text-nowrap">
                    <Card.Title className="text-truncate">
                      {beer.name}
                    </Card.Title>
                    <Card.Text className="text-truncate">
                      Tagline: {beer.tagline}
                    </Card.Text>
                    <Card.Text>ABV: {beer.abv}%</Card.Text>
                    <Button
                      variant="info"
                      style={{ color: "white" }}
                      onClick={() => goToDetailPage(beer.id)}
                    >
                      Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <>
              <div className="mx-auto" style={{ height: "75vh" }}>
                <p className="text-center">No results</p>
              </div>
            </>
          )}
        </Row>
        <Row xs={1} md={2} className="my-5 d-flex justify-content-center">
          <PagePagination />
        </Row>
      </Container>
    </>
  );
};

export default BeerOverview;
