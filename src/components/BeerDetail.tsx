import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Root as Beer } from "../types/types";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Container, Col } from "react-bootstrap";
import BeerHeader from "./BeerHeader";

type RouteParams = {
  id: string;
};

const BeerDetail: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams<RouteParams>();
  const selectedBeer = useSelector((state: RootState) =>
    state.allBeers.beers.find((beer: Beer) => beer.id === Number(id))
  );

  if (!selectedBeer) {
    return <div>Beer not found.</div>;
  }

  const goToOverviewPage = () => navigate(`/`);

  return (
    <>
      <BeerHeader search={false} />
      <Container>
        <Col className="pb-5">
          <Card
            border="info"
            className="w-80 mx-auto border shadow"
            style={{ maxWidth: "40rem" }}
          >
            <Card.Header className="custom-header">
              Details {selectedBeer.name}
            </Card.Header>
            <Card.Img
              variant="top"
              src={selectedBeer.image_url}
              className="mt-3"
              style={{ height: "500px", objectFit: "scale-down" }}
            />
            <Card.Body className="p-3">
              <Card.Title>{selectedBeer.name}</Card.Title>
              <Card.Text>Tagline: {selectedBeer.tagline}</Card.Text>
              <Card.Text>ABV: {selectedBeer.abv}%</Card.Text>
              <Card.Text>
                <ul>
                  {selectedBeer.ingredients.malt.map((malt, index) => (
                    <li key={malt.name + index}>
                      {malt.name}: {malt.amount.value} {malt.amount.unit}
                    </li>
                  ))}
                  {selectedBeer.ingredients.hops.map((hop, index) => (
                    <li key={hop.name + index}>
                      {hop.name}: {hop.amount.value} {hop.amount.unit}, Add:{" "}
                      {hop.add}, Attribute: {hop.attribute}
                    </li>
                  ))}
                  <li>Yeast: {selectedBeer.ingredients.yeast}</li>
                </ul>
              </Card.Text>
            </Card.Body>
            <Button
              className="w-30 btn-lg text-white"
              style={{ borderRadius: 0 }}
              variant="info"
              onClick={() => goToOverviewPage()}
            >
              Back to overview
            </Button>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default BeerDetail;
