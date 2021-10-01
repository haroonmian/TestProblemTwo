import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import * as actions from "./actions";
import objs from "./keys.json";
import { useState } from "react";

const App = () => {
  const [results, setResults] = useState(0);
  const [number, setNumber] = useState(0);
  const [currentAction, setCurrentAction] = useState(null);

  const onClick = (value) => {
    switch (value) {
      case actions.ac:
        setNumber(0);
        setResults(0);
        setCurrentAction(null);
        break;
      case actions.toggle:
        setNumber(Number(number) * -1);
        break;
      case actions.mole:
        setNumber(Number(number) / 100);
        break;
      case actions.div:
        if (results && number) {
          if (currentAction && currentAction != value) {
            setCurrentAction(value);
            onClick(currentAction);
          } else {
            setNumber(results / number);
            setResults(0);
          }
        } else if (number) {
          setResults(number);
          setCurrentAction(value);
          setNumber(0);
        }
        break;
      case actions.mul:
        if (results && number) {
          if (currentAction && currentAction != value) {
            setCurrentAction(value);
            onClick(currentAction);
          } else {
            setNumber(results * number);
            setResults(0);
          }
        } else if (number) {
          setResults(number);
          setCurrentAction(value);
          setNumber(0);
        }
        break;
      case actions.min:
        if (results && number) {
          if (currentAction && currentAction != value) {
            setCurrentAction(value);
            onClick(currentAction);
          } else {
            setNumber(results - number);
            setResults(0);
          }
        } else if (number) {
          setResults(number);
          setCurrentAction(value);
          setNumber(0);
        }
        break;
      case actions.plus:
        if (results && number) {
          if (currentAction && currentAction != value) {
            setCurrentAction(value);
            onClick(currentAction);
          } else {
            setNumber(results + number);

            setResults(0);
          }
        } else if (number) {
          setResults(number);
          setCurrentAction(value);
          setNumber(0);
        }
        break;
      case actions.equal:
        if (results && number) {
          if (currentAction) {
            onClick(currentAction);
            setCurrentAction(value);
            setResults(0);
          }
        }
        break;
      default:
        if (currentAction && number && !results) {
          if (currentAction == actions.equal) {
            setNumber(Number(value));
            setCurrentAction(null);
            setResults(0);
          } else {
            setNumber(Number(value));
            setResults(number);
          }
        } else {
          setNumber(Number(number + value));
        }
    }
  };

  return (
    <div className="app">
      <Container className="calculator">
        <Row>
          <Col>
            <div className="screen">
              <label>{number}</label>
            </div>
          </Col>
        </Row>

        {objs.map((row, index) => (
          <Row key={index}>
            {row.map((cell, index) => (
              <Col
                key={index}
                md={row.length === 3 && index === 0 ? 6 : 3}
                sm={row.length === 3 && index === 0 ? 6 : 3}
                xs={row.length === 3 && index === 0 ? 6 : 3}
              >
                <Row>
                  <button
                    value={cell.value}
                    className={cell.type == "action" ? "cell actions" : "cell"}
                    onClick={(e) => onClick(e.target.value)}
                  >
                    {cell.label == "div" ? <>&divide;</> : cell.label}
                  </button>
                </Row>
              </Col>
            ))}
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default App;
