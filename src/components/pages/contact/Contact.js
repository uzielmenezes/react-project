import Container from "../../layout/container/Container";

function Contact() {
  return (
    <Container customClass="column">
      <h1>Contact</h1>
      <h3>
        E-mail:{" "}
        <span style={{ fontWeight: "100" }}>cassandra_evergreen@costs.app</span>
      </h3>
      <h3>
        Phone: <span style={{ fontWeight: "100" }}>+17696489153</span>
      </h3>
    </Container>
  );
}

export default Contact;
