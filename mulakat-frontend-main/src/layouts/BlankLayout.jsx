import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";

const BlankLayout = (props) => {
  return (
    <Container fluid>
      <Nav>
        <NavItem>
          <NavLink active href="/">
            Banka
          </NavLink>
        </NavItem>
      </Nav>

      <Row className="px-3">
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h5" className="mb-4">
                {props.title}
              </CardTitle>
              {props.children}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BlankLayout;
