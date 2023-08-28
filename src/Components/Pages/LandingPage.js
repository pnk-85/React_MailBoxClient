import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./LandingPage.css";
import Compose from "../Compose";

function LandingPage() {
  const items = useSelector((state) => state.received.receivedMails);

  const Items = items.map((item) => {
    return (
      <tr className="text-dark fw-bold" key={item.key}>
        <td className="text-dark fw-bold">
          {" "}
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="defaultCheck1"
          />
        </td>

        <td className="text-start" style={{ width: "200px" }}>
          {item.receivedFrom}
        </td>
        <button className="btnn">
          {" "}
          <td className="text-dark  text-start"> {item.data}</td>
        </button>
      </tr>
    );
  });
  return (
    <div className="container mt-5">
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col sm={2}>
            <ListGroup>
              <ListGroup.Item action href="#compose">
                Compose
              </ListGroup.Item>
              <ListGroup.Item action href="#link1">
                Inbox
              </ListGroup.Item>
              <ListGroup.Item action href="#link2">
                Sent
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => console.log(" clicked")}>
                Draft
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="#compose">
                <Compose />
              </Tab.Pane>
              <Tab.Pane eventKey="#link1">
                <Table striped="columns">
                  <thead>
                    <tr className="fs-5 text-danger">
                      <th className="fs-5 text-danger">
                        {" "}
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="defaultCheck1"
                        />
                      </th>
                      <th className="fs-5 text-danger">Received from</th>
                      <th>Data</th>
                    </tr>
                  </thead>
                  <tbody>{Items}</tbody>
                </Table>
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">Sent Mails</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default LandingPage;