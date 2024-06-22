import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Contact from "../Contact/Contact";
import Feature from "../FeatureSection/Feature";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>VITAL Blood | Home</title>
      </Helmet>

      <Banner></Banner>
      <Contact></Contact>
      <Feature></Feature>
    </div>
  );
};

export default Home;
