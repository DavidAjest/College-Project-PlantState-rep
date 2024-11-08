import Accordion from "react-bootstrap/Accordion";

function QnA() {
  return (
    <div className="w-full overflow-hidden self-start mr-auto">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>What factors affect plant health?</Accordion.Header>
          <Accordion.Body>
            Plant health is influenced by several factors including the amount of sunlight, soil
            quality, water availability, and nutrient levels. Properly balancing these factors is
            essential for optimal plant growth. Monitoring these conditions regularly can help
            prevent diseases and promote healthy development.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>How do I know if my plant needs more water?</Accordion.Header>
          <Accordion.Body>
            To determine if your plant needs more water, check the soil moisture level. If the top
            1-2 inches of soil feel dry, it's usually time to water. Additionally, if the leaves
            start to wilt or the plant looks droopy, it may indicate that the plant is
            under-watered. However, over-watering can also cause similar symptoms, so it's important
            to check the soil before adding more water.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            What is the ideal soil moisture level for most plants?
          </Accordion.Header>
          <Accordion.Body>
            The ideal soil moisture level varies depending on the plant species, but most plants
            thrive when the soil is kept consistently moist but not waterlogged. For many
            houseplants, maintaining soil moisture at around 40-60% is ideal. Using a soil moisture
            meter can help you monitor and maintain the proper moisture levels for your plants.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>How can I improve the water conditions for my plants?</Accordion.Header>
          <Accordion.Body>
            Improving water conditions involves ensuring proper drainage, avoiding over-watering,
            and maintaining consistent watering schedules. Using well-draining soil, checking for
            proper pot drainage holes, and adjusting watering frequency based on the season and
            plant type can all help improve water conditions for your plants.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>What are signs of over-watering in plants?</Accordion.Header>
          <Accordion.Body>
            Over-watering can lead to root rot and other issues. Signs of over-watering include
            yellowing leaves, mushy or soft stems, and a musty smell coming from the soil. If you
            notice these symptoms, it's important to reduce watering and allow the soil to dry out
            before watering again.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default QnA;
