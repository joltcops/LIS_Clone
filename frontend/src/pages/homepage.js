import React from 'react';
import { Link } from 'react-router-dom';
import LatestBooks from '../components/LatestBooks'; // Import the LatestBooks component

function Home() {
  return (
    <div className="home">
      <div className="topBar">
        <h2>LibZ</h2>
        <div className="topButtons">
          <button className="loginButton">
            <Link to="/login" className="underline">
              Login
            </Link>
          </button>
          <button className="loginButton">
            <Link to="/search" className="underline">
              Search for Books
            </Link>
          </button>
        </div>
      </div>
      <div className="mainpage">
        <h1 className="welcome">Where Every Page Is A New Adventure</h1>
        <div className="latest_wrapper">
        <LatestBooks /> {/* Add the LatestBooks component here */}
        </div>
      </div>
    </div>
  );
}

export default Home;
