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

// RE-USABLE COMPONENTS... D.R.Y
const Linkss = (props) => {
  return (
    <>
      <NavLink to={props.url}>
        <p>{props.t}</p>
      </NavLink>
    </>
  );
};
const HeadingLinks = (props) => {
  return (
    <>
      <NavLink to={props.url}>
        <h3>{props.head}</h3>
      </NavLink>
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
            <HeadingLinks head="MainPage" url="./" />
            <HeadingLinks head="About Us" url="about" />
            <HeadingLinks head="Contact Us" url="contact-us" />
          </div>
          <div>
            <h3>CATALOGUE</h3>
            <Linkss t="Skin Care" url="/catalogue/Skincare" />
            <Linkss t="Hair & Body" url="/catalogue/Hair" />
            <Linkss t="Best Sellers" url="bestsellers" />
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
            <NavLink to="https://www.instagram.com/yashwardhanm_singh/">
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
