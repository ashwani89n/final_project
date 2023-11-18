import PropTypes from 'prop-types';
import './Card.css';
import { Link } from 'react-router-dom';


const calculateTimeSincePost = (createdAt) => {
  const now = new Date();
  const postTime = new Date(createdAt);
  const timeDifference = Math.abs(now - postTime);

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 24) {
    return `Posted ${Math.floor(hours / 24)} days ago`;
  } else if (hours > 0) {
    return `Posted ${hours} hrs ago`;
  } else if (minutes > 0) {
    return `Posted ${minutes} min ago`;
  } else {
    return `Posted ${seconds} sec ago`;
  }
};

const Card = ({ id, title, created_at, upvotes_count ,downvotes_count}) => {

  const cardLink = `/view/${id}`;

  return (
    <>
    <div className="Card">
      <Link to={cardLink} >
        <div className="postInfo">
        <div className='inlineTextLbl'>{title}</div>
          <div className="time">{calculateTimeSincePost(created_at)}</div>
        </div>
        <div className="upvotes">👍 {upvotes_count} | 👎 {downvotes_count}</div>
        </Link>
       </div>
    </>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  created_at: PropTypes.string,
  upvotes_count: PropTypes.number,
  id: PropTypes.number,
  downvotes_count: PropTypes.number,
};

export default Card;
