import React from 'react';
import { NavDropDownToggle } from '../../_elements';
import useComponentVisible from '../../hooksandHOCS/hooks/useComponentVisible';

export default function NavItem(props) {
  const { ref, componentVisible, setComponentVisible } = useComponentVisible('');

  return (
    <div ref={ref}>
      <div
        className="costume-nav-item"
        onClick={() => {
          componentVisible !== props.navId ? setComponentVisible(props.navId) : setComponentVisible('');
        }}
      >
        <NavDropDownToggle>{props.icon}</NavDropDownToggle>
        {componentVisible === props.navId && props.children}
      </div>
    </div>
  );
}
