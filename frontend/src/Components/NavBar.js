import React,{ useState } from 'react';
import { useLocation } from 'react-router';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Form,
  Button,
  FormGroup,
  Input
} from 'reactstrap';

import {history} from '../Helpers'

const NavBar = (props) => {

  const {pathname} = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const onSubmit = async (e) => {
    e.preventDefault();
      history.push(`/district/${e.target.district.value}`)

  }
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/" className={pathname==='/' ? 'text-white' : 'text-secondary'} style={{}}>District Data</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/allDistricts" className={pathname==='/allDistricts' ? 'text-white' : ''}>All Districts</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/dashboard"  className={pathname==='/dashboard' ? 'text-white' : ''}>Dashboard</NavLink>
            </NavItem>
          </Nav>
          <Form inline className="ml-auto" onSubmit={onSubmit}>
            <FormGroup className="mr-5">
              <Input 
                type="text" 
                name="district" 
                placeholder="Enter District Name" 
                className="mr-2"/>
              <Button color="info" className="mt-auto">Search</Button>
            </FormGroup>
          </Form>
        </Collapse>
      </Navbar>
    </div>
  );
}


export default NavBar;
