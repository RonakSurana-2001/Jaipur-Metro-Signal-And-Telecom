import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import Welcome from './Welcome';
function NavScrollExample() {
  let navigate=useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate("/");
  }
  return (
    <>
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/admin">Jaipur Metro</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/admin/faults">Faults</Nav.Link>
            <Nav.Link href="/admin/attendence">Attendence</Nav.Link>
            <Nav.Link href="/admin/leave">Leave Apply</Nav.Link>
          </Nav>
          <button type="button" className="btn btn-secondary" onClick={logout}>Logout</button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {window.location.href === 'https://service-3.onrender.com/admin' && 
      (
        <Welcome/>
      )
    }
    </>
  );
}

export default NavScrollExample;