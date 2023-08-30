import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { receivedActions } from "../Store/recieved";
import { sentActions } from "../Store/sent";
import "./LandingPage.css";
import Compose from "../Compose";
import axios from "axios";
import ReadMail from "../ReadMail";
import { authActions } from "../Store/auth";
import { useState, useEffect } from "react";



function LandingPage() {

  const auth = useSelector(state => state.auth.isAuthenticated);
  const items = useSelector((state) => state.received.receivedMails);
  const sent = useSelector(state => state.sent.sentMails);

  const [counter, setCounter] = useState(0);
  const [readMail, setReadMail] = useState([]);
  const [readsentMail, setReadSentMail] = useState([]);
  const [isreadSentMail, setIsReadSentMail] = useState(false);
  const [isReadMail, setIsReadMail] = useState();


  const dispatch = useDispatch();
  let emailRegEX;

  useEffect(() => {
    setTimeout(() => {
      setCounter((counter) => counter + 1);
    }, 2000);
    if (localStorage.getItem('token')) {
      dispatch(authActions.login());
    }

    if (auth) {
      emailRegEX = localStorage.getItem('email').replace(/[^a-zA-Z0-9]/g, "");

      axios.get(`https://mailboxproject-5ca97-default-rtdb.firebaseio.com/${emailRegEX}/received.json`)
        .then((res) => {
          console.log('getdata', res);
          if (res.data) {
            const firebaseIDs = Object.keys(res.data);
            console.log('firebaseIDs', firebaseIDs);

            const newItems = [];
            Object.values(res.data).forEach((el) => {
              console.log("el.body", el.body);
              newItems.push({
                ...el.body,
                id: firebaseIDs[newItems.length],
                key: firebaseIDs[newItems.length],
              })
            })
            dispatch(receivedActions.getReceivedMail(newItems));
            console.log("newItems", newItems);
            console.log("object", newItems[0].data);
          }
        });

      axios
        .get(
          `https://mailboxproject-5ca97-default-rtdb.firebaseio.com/${emailRegEX}/sent.json`
        )
        .then((res) => {
          console.log(" getdata", res);
          if (res.data) {
            const firebaseIDs = Object.keys(res.data);
            console.log("firebaseIDs", firebaseIDs);
            const newItems = [];
            Object.values(res.data).forEach((el) => {
              console.log("el.body", el.body);

              newItems.push({
                ...el.body,
                id: firebaseIDs[newItems.length],
                key: firebaseIDs[newItems.length],
              });
            });
            console.log("newItems", newItems);
            dispatch(sentActions.getSentMail(newItems));
          }
        });
    }
  }, [auth,counter]);

  const readSentMailHandler = (item) => {
    setReadSentMail(item);
    setIsReadSentMail(true);
  }


  const readMailHandler = (item) => {
    setReadMail(item);
    setIsReadMail(true);

    let toRefRgx = "";
    toRefRgx = item.myEmail.replace(/[^a-zA-Z0-9 ]/g, "");

    let bodyReceived = {
      ...item,
      read: true,
    };

    axios
      .put(
        ` https://mailboxproject-5ca97-default-rtdb.firebaseio.com/${toRefRgx}/received/${item.id}.json`,

        { body: bodyReceived }
      )
      .then((res) => {
        console.log("bodyreceived", bodyReceived);
        dispatch(receivedActions.readMail(bodyReceived));
      });
  };

  const removeEmail = (item) => {
    let toRefRgx = "";
    toRefRgx = item.myEmail.replace(/[^a-zA-Z0-9 ]/g, "");

    axios
      .delete(
        ` https://mailboxproject-5ca97-default-rtdb.firebaseio.com/${toRefRgx}/received/${item.id}.json`
      )
      .then((res) => {
        dispatch(receivedActions.removeEmail(item.id));
      });
  };

  const removeSentEmail = (item) => {
    let toRefRgx = "";
    toRefRgx = item.emailSentBy.replace(/[^a-zA-Z0-9 ]/g, "");

    axios
      .delete(
        ` https://mailboxproject-5ca97-default-rtdb.firebaseio.com/${toRefRgx}/sent/${item.id}.json`
      )
      .then((res) => {
        dispatch(sentActions.removeEmail(item.id));
      });
  };

  let count = 0;

  let Items = items.map((item) => {
    if (item.read === false) {
      count++;
    }




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
        <td>
          {!item.read && (<span class="badge rounded-pill bg-primary">UR</span>)}
        </td>
        <td className="text-start" style={{ width: "200px" }}>
          {item.receivedFrom}
        </td>
        <td
          className="text-dark  text-start"
          style={{ cursor: "pointer" }}
          onClick={() => readMailHandler(item)}
        >

          {item.data}
        </td>
        <td
          className="bg-danger"
          style={{ cursor: "pointer" }}
          onClick={() => removeEmail(item)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
          </svg>
        </td>
      </tr>
    );
  });

  let sentItems = sent.map((item) => {
    return (
      <tr className="text-dark fw-bold" key={item.key}>
        <td className="text-dark fw-bold">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="defaultCheck1"
          />
        </td>

        <td className="text-start" style={{ width: "200px" }}>
          {item.to}
        </td>
        <td
          className="text-dark  text-start"
          style={{ cursor: "pointer" }}
          onClick={() => readSentMailHandler(item)}
        >
          {item.data}
        </td>
        <td
          className="bg-danger"
          style={{ cursor: "pointer" }}
          onClick={() => removeSentEmail(item)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
          </svg>
        </td>
      </tr>
    );
  });




  return (
    <div className="container mt-5">
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col sm={2}>
            <ListGroup>
              <ListGroup.Item className="text-start" action href="#compose">
                Compose
              </ListGroup.Item>
              <ListGroup.Item className="text-start" action href="#link1">
                Inbox<span className='badge bg-warning float-end'>{count}</span>
              </ListGroup.Item>
              <ListGroup.Item className="text-start" action href="#link2">
                Sent
              </ListGroup.Item>
              <ListGroup.Item className="text-start" action onClick={() => console.log(" clicked")}>
                Draft
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={10}>
            {isReadMail && (
              <ReadMail item={readMail} setIsReadMail={setIsReadMail} />
            )}
            {isreadSentMail && (
              <ReadMail item={readMail} setIsReadMail={setIsReadMail} />
            )}
            {!isReadMail && !isreadSentMail && (
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
                      <th className="fs-5 text-danger text-start">Received from</th>
                      <th className="float-start">Data</th>
                      <th style={{ width: "20px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>{Items}</tbody>
                </Table>
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
                  <Table>
                    <thead>
                      <tr className="fs-5 text-danger">
                        <th className="fs-5 text-danger">
                          <input
                            disabled
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck1"
                          />
                        </th>

                        <th className="fs-5 text-danger text-start">To</th>
                        <th className="float-start">Data</th>
                        <th style={{ width: "20px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>{sentItems}</tbody>
                  </Table>
                </Tab.Pane>
              
            </Tab.Content>
            )}
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default LandingPage;