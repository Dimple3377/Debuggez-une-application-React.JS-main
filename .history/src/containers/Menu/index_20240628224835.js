/* eslint-disable no-return-assign */
import Button from "../../components/Button";
import Logo from "../../components/Logo";

import "./style.scss";

const Menu = () => {
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav>
      <Logo />
      <ul>
        <li>
          <a
            href="#nos-services"
            onClick={(e) => handleScroll(e, "nos-services")}
          >
            Nos services
          </a>
        </li>
        <li>
          <a
            href="#nos-realisations"
            onClick={(e) => handleScroll(e, "nos-realisations")}
          >
            Nos réalisations
          </a>
        </li>
        <li>
          <a
            href="#notre-equipe"
            onClick={(e) => handleScroll(e, "notre-equipe")}
          >
            Notre équipe
          </a>
        </li>
      </ul>
      <Button title="contact" onClick={(e) => handleScroll(e, "contact")}>
        Contact
      </Button>
    </nav>
  );
};

export default Menu;
