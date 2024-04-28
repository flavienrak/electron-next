import React from "react";
import { useRouter } from "next/router";
import { Row, Col, Card } from "antd";

const MoreOptionsPage = () => {
  const router = useRouter();

  const handleImageClick = (destination) => {
    router.push(destination);
  };

  const imageCardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "10px",
  };

  return (
    <div className="more-options-container">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card
            hoverable
            onClick={() => handleImageClick("/donate-page")}
            style={imageCardStyle}
          >
            <div className="image-container">
              <img src="/images/logo.png" alt="Donate" />
              <p style={titleStyle}>Donner</p>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card
            hoverable
            onClick={() => handleImageClick("/rate-page")}
            style={imageCardStyle}
          >
            <div className="image-container">
              <img src="/images/logo.png" alt="Rate" />
              <p style={titleStyle}>Évaluer</p>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card
            hoverable
            onClick={() => handleImageClick("/support-page")}
            style={imageCardStyle}
          >
            <div className="image-container">
              <img src="/images/logo.png" alt="Support" />
              <p style={titleStyle}>Supporter</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MoreOptionsPage;

