import { Link } from "react-router-dom";

const Banner = () => {
  const banner = "https://i.ibb.co/sjbKKKJ/adspem-mission.png";
  return (
    <div>
      <div
        className="hero h-[600px]"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="space-y-3">
            <h1 className="text-2xl font-bold">Donate Blood, Save Life</h1>
            <p className="text-xl">
              Your Blood Can Bring Smile In Other Person Face
            </p>
            <div className="flex justify-around">
              <Link to={"/signUp"}>
                <button className="btn bg-red-700 text-white">
                  Join as a donor
                </button>
              </Link>
              <Link to="/search">
                <button className="btn bg-red-700 text-white">
                  Search Donors
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
