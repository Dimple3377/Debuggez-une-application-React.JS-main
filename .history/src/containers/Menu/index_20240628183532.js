/* eslint-disable no-return-assign */
import Button from "../../components/Button";
import Logo from "../../components/Logo";

import "./style.scss";

const Menu = () => (
  <nav>
    <Logo />
    <ul>
      <li>
        <a href="#nos-services" onClick={(e) => e.preventDefault()}>
          Nos services
        </a>
      </li>
      <li>
        <a href="#nos-realisations" onClick={(e) => e.preventDefault()}>
          Nos réalisations
        </a>
      </li>
      <li>
        <a href="#notre-equipe" onClick={(e) => e.preventDefault()}>
          Notre équipe
        </a>
      </li>
    </ul>
    <Button
      title="contact"
      onClick={(e) => {
        e.preventDefault();
        window.document.location.hash = "#contact";
      }}
    >
      Contact
    </Button>
  </nav>
);

export default Menu;
