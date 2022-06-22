
import React from 'react'
import Logo from './../../../components/Logo'
import { Navbar, Nav ,Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'
export const Navigation = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const isVoterAuthenticated = localStorage.getItem("isVoterAuthenticated");
  if(isAuthenticated){
    return (
      <Navbar  sticky="top"  collapseOnSelect expand="lg" bg="light" variant="light">
        <Container fluid  className='d-flex justify-content-between navbar-container-home '  >
          <Logo/>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='navbar-flexing'>
              <Nav className="me-auto" >
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#about">About Us</Nav.Link>
                <Nav.Link href="#services">Services</Nav.Link>
              </Nav>
              <Nav.Link><Link style={{textDecoration : "none" , color : 'red'}} to="/dashboard/app">Dashboard</Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
   

  }else if(isVoterAuthenticated){
    return (
      <Navbar  sticky="top"  collapseOnSelect expand="lg" bg="light" variant="light">
        <Container fluid  className='d-flex justify-content-between navbar-container-home '  >
          <Logo/>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='navbar-flexing'>
              <Nav className="me-auto" >
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#about">About Us</Nav.Link>
                <Nav.Link href="#services">Services</Nav.Link>
              </Nav>
              <Nav.Link><Link style={{textDecoration : "none" , color : 'red'}} to="/voter-dashboard/app">Dashboard</Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )

  }else{
    return (
      <Navbar  sticky="top"  collapseOnSelect expand="lg" bg="light" variant="light">
        <Container fluid  className='d-flex justify-content-between navbar-container-home '  >
          <Logo/>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='navbar-flexing'>
              <Nav className="me-auto" >
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#about">About Us</Nav.Link>
                <Nav.Link href="#services">Services</Nav.Link>
              </Nav>
              <Nav.Link><Link style={{textDecoration : "none" , color : 'red'}} to="/register">Register</Link></Nav.Link>
              <Nav.Link eventKey={2}>
                <Link style={{textDecoration : "none" , color : 'red'}} to="/login">Login</Link>
              </Nav.Link>
              <Nav.Link eventKey={2}>
                <Link style={{textDecoration : "none" , color : 'red'}} to="/voter-login">Voter Login</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
  
}
