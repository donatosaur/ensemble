import { Container, Row } from "react-bootstrap";
import EntityCards from "../components/EntityCards";

/**
 * @returns {JSX.Element}
 */
export default function HomePage() {
  return (
    <Container fluid>
      <Row>
        <h1>Ensemble</h1>
      </Row>
      <Row>
        <EntityCards />
      </Row>
    </Container>
  );
}
