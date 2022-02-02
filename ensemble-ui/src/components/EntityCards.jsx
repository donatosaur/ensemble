import { useNavigate } from "react-router-dom";
import { CardGroup, Card, Button } from "react-bootstrap";
import entityConfig from "../entityConfig.json";

export default function EntityCards() {
  const navigate = useNavigate();

  return (
    <CardGroup id="entityCardGroup">
      {Object.keys(entityConfig).map((entity) => (
        <Card key={entity}>
          <Card.Header>
            <Card.Title>{entity}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              {entityConfig[entity].description}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button onClick={(event) => {
              event.preventDefault();
              navigate(`/entity/${entity}`);
            }}
            >
              Manage
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </CardGroup>
  );
}
