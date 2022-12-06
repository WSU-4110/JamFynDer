import React, { useState, useEffect } from "react";
import "./WelcomePage.css";
import ClipLoader from "react-spinners/ClipLoader";
import NavigationBar from "../NavigationBar";


const WelcomePage = () => {
<<<<<<< HEAD
 
=======
  //Loader is set to 1.7s so give the background time to load
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }, []);

  //Temp overrides the CSS for the spinner
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8c52ff",
  };

>>>>>>> 61798e0e04521e93b6ce34da49b1c61f7c684a63
  return (
    <div className="Hero">
      {loading ? (
        <ClipLoader
          color={"#8c52ff"}
          cssOverride={override}
          loading={loading}
          size={300}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div class="WelcomePage-Content">
          <video class="vid-background" autoPlay muted loop>
            <source
              src="https://www.dropbox.com/s/d3xpfg5c607fo5h/156.mp4?raw=1"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <h1 class="logo">Discover new</h1>
          <div id="flip">
            <div>
              <div>K-Pop</div>
            </div>
            <div>
              <div>Country</div>
            </div>
            <div>
              <div>Rap</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;

