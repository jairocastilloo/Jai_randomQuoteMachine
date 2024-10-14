import { useState, useEffect } from "react";
import "./App.css";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import quotes from "./assets/quotes.json";
import { FaTwitter } from "react-icons/fa";

interface Quote {
  quote: string;
  author: string;
}

const getQuote = (): Quote => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

const getRandomRgbColor = () => {
  const r = Math.floor(Math.random() * 256); // Red component (0-255)
  const g = Math.floor(Math.random() * 256); // Green component (0-255)
  const b = Math.floor(Math.random() * 256); // Blue component (0-255)
  return `rgb(${r}, ${g}, ${b})`;
};

const getComplementaryColor = (rgb: string) => {
  const rgbArray = rgb.match(/\d+/g)?.map(Number) || [0, 0, 0]; // Extract RGB values
  const [r, g, b] = rgbArray;

  // Calculate complementary color by subtracting each value from 255
  const compR = 255 - r;
  const compG = 255 - g;
  const compB = 255 - b;

  return `rgb(${compR}, ${compG}, ${compB})`;
};
const isLightColor = (rgb: string) => {
  const rgbArray = rgb.match(/\d+/g)?.map(Number) || [0, 0, 0];
  const [r, g, b] = rgbArray;

  // Calculate relative luminance
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  // If luminance is greater than 128, it's a light color
  return luminance > 128;
};

function App() {
  const [quote, setQuote] = useState<Quote>(getQuote());
  const [color, setColor] = useState(getRandomRgbColor());

  const [complementaryColor, setComplementaryColor] = useState(
    getComplementaryColor(color)
  );
  const [isLight, setIsLight] = useState(isLightColor(complementaryColor));

  const handleRandomize = () => {
    setColor(getRandomRgbColor());
    setQuote(getQuote());
  };

  useEffect(() => {
    document.body.style.backgroundColor = color;
    const newComplementaryColor = getComplementaryColor(color);
    setComplementaryColor(newComplementaryColor);
    setIsLight(isLightColor(newComplementaryColor));
  }, [color]);
  return (
    <>
      <Container className="p-2 pt-5 mt-5">
        <Card
          className="mt-5 p-4"
          style={{ backgroundColor: complementaryColor }}>
          <Card.Body>
            <blockquote className="blockquote mb-0" id="quote-box">
              <p
                className="fs-1 fw-bold"
                style={{
                  WebkitTextStroke: `1px ${isLight ? "black" : "white"}`,
                  color: color,
                }}
                id="text">
                {quote.quote}
              </p>
              <footer
                className="blockquote-footer fs-2 fw-bold"
                style={{
                  WebkitTextStroke: `1px ${isLight ? "black" : "white"}`,
                  color: color,
                }}>
                <cite title="Author" id="author">
                  {quote.author}
                </cite>
              </footer>
              <Container>
                <Row>
                  <Col>
                    <a
                      href="https://twitter.com/intent/tweet"
                      id="tweet-quote"
                      target="_blank"
                      rel="noopener noreferrer">
                      <Button className="d-flex align-items-center px-4 fw-bold m-2 mt-4 ms-0 btn-lg">
                        <FaTwitter className="me-2" /> Tweet
                      </Button>
                    </a>
                  </Col>
                  <Col className="text-end">
                    <Button
                      variant={isLight ? "dark" : "light"}
                      onClick={handleRandomize}
                      className="px-4 fw-bold m-2 btn-lg"
                      id="new-quote">
                      New Quote
                    </Button>
                  </Col>
                </Row>
              </Container>
            </blockquote>
          </Card.Body>
        </Card>
        <footer>
          <p style={{ color: `${isLight ? "white" : "black"}` }}>
            &copy; 2024 Jairo Castillo - All rights reserved
          </p>
        </footer>
      </Container>
    </>
  );
}

export default App;
