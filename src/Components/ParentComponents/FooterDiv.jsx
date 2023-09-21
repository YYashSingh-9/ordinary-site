import classes from "./Footer.module.css";
import { CiSearch } from "react-icons/ci";
import {
  BiLogoInstagramAlt,
  BiLogoTwitter,
  BiLogoLinkedin,
} from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import logo from "../../assets/logo2.png";
import { NavLink } from "react-router-dom";
import Popup from "reactjs-popup";
const Linkss = (props) => {
  return (
    <>
      <p>
        <a>{props.t}</a>
      </p>
    </>
  );
};
const HeadingLinks = (props) => {
  return (
    <>
      <h3>
        <a>{props.head}</a>
      </h3>
    </>
  );
};

const FooterDiv = () => {
  const mailConfirmer = () => {
    window.alert("Mail sent.");
  };
  return (
    <>
      <footer className={classes.parentFooter}>
        <div className={classes.logo_N_SearchIcon}>
          <img src={logo} />
          <CiSearch className={classes.logos} />
        </div>
        <div className={classes.links_N_Email}>
          <div>
            <HeadingLinks head="MainPage" />
            <HeadingLinks head="About Us" />
            <HeadingLinks head="Contact Us" />
          </div>
          <div>
            <h3>CATALOGUE</h3>
            <Linkss t="Skin Care" />
            <Linkss t="Hair & Body" />
            <Linkss t="Best Sellers" />
          </div>
          <div>
            <h3>CUSTOMER CARE</h3>
            <Linkss t="FAQ" />
            <Linkss t="Dissposal Instructions" />
            <Linkss t="Return Policy" />
            <Linkss t="Promotion Terms & Conditions" />
          </div>
          <div>
            <div className={classes.input_s}>
              <input
                type="email"
                placeholder="Give an Email , get the News Letter "
              />
              <BsArrowRight className={classes.logos} onClick={mailConfirmer} />
            </div>
          </div>
        </div>
        <div className={classes.final_N_Socials}>
          <div>
            <p>Two Fragrence</p>
            <p style={{ textDecoration: "underLine" }}>
              Terms of use and privacy policy
            </p>
          </div>
          <div className={classes.social_Logos}>
            <NavLink to="https://www.instagram.com/yyashsingh_/">
              <BiLogoInstagramAlt className={classes.logos} />
            </NavLink>
            <NavLink to="https://twitter.com/">
              <BiLogoTwitter className={classes.logos} />
            </NavLink>
            <NavLink to="https://www.linkedin.com/">
              <BiLogoLinkedin className={classes.logos} />
            </NavLink>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterDiv;
