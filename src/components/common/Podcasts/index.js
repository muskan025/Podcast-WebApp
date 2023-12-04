import React from "react";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import "./styles.css";
const PodcastCard = ({ id, title, displayImage }) => {
  return (
    <Link to={`/podcast/${id}`}>
      <div className="podcast-card">
        <img className="display-image-podcast" src={displayImage} />

        <div className="lower-div">
          <span className="title-podcast">{title}</span>
          <FaPlay className="play-icon" />
        </div>
      </div>
    </Link>
  );
};

export default PodcastCard;
