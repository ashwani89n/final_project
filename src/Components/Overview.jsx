import { useState } from 'react';
import './Overview.css';
import { Link } from 'react-router-dom';

const cardsData = [
  {
    title: 'Diverse Conversations',
    content: 'Engage in a wide range of discussions covering academics, campus life, extracurricular activities, and more, reflecting the diverse interests and experiences of our university community.',
  },
  {
    title: 'Student Voices Amplified',
    content: 'A platform designed to empower every student\'s voice, fostering an inclusive space where opinions are valued, and perspectives are celebrated.',
  },
  {
    title: 'Idea Incubator',
    content: 'Ignite your creativity and watch ideas come to life. Our forum is a thriving space where innovative thoughts and projects find support and collaboration.',
  },
  {
    title: 'Community Connections',
    content: 'Forge meaningful connections with fellow Panthers. Whether you\'re a freshman exploring campus or a seasoned senior, this is your space to connect with like-minded individuals.',
  },
  {
    title: 'Events and Updates',
    content: 'Stay in the loop with the latest campus events, announcements, and updates. Talkin\' Panthers keeps you informed and connected with what\'s happening in and around our university community.',
  },
  {
    title: 'Panther Pride',
    content: 'Showcase your Panther pride! Share and celebrate achievements, milestones, and the unique aspects that make our university community exceptional.',
  },
];

const Overview = () => {
  const [isFlipped, setIsFlipped] = useState(Array(cardsData.length).fill(false));

  const handleClick = (index) => {
    const updatedFlippedStatus = [...isFlipped];
    updatedFlippedStatus[index] = !updatedFlippedStatus[index];
    setIsFlipped(updatedFlippedStatus);
  };

  return (
    <>
      <div className='overview-container'>
        <div className='desc-container'>
          <div className="title">Unleash the roar of conversation at Talkin&apos; Panthers</div>
          <div className="subtext">A place where every student&apos;s voice echoes, ideas thrive, and connections flourish in the heart of our dynamic university community!</div>
          <br></br>
          <br></br>
        </div>
        <div className='desc-button'>
          <Link to="/dashboard" ><button className="sign-button">Dive into vibrant discussions and insights now!</button></Link>
        </div>
      </div>
      <br></br>
      <div className='container'>
        <div className='desc-container1'>
          <h3>Standout aspects of Talkin&apos; Panthers:</h3>
        </div>
        <div className='row'>
          {cardsData.slice(0, 3).map((card, index) => (
            <div className='how-it-works-container' key={index} onClick={() => handleClick(index)}>
              {!isFlipped[index] ? (
                <>
                  <div className={`imageUrl${index + 1}`}></div>
                  <div className='content'>
                    <div className={`highlt${index % 2 === 0 ? '1' : '2'}`}>{card.title}</div>
                  </div>
                </>
              ) : (
                <div className={`highlttxt${index % 2 === 0 ? '1' : '2'}`}>{card.content}</div>
              )}
              <div className='flipIcon'></div>
            </div>
          ))}
        </div>
        <div className='row'>
          {cardsData.slice(3).map((card, index) => (
            <div className='how-it-works-container' key={index + 3} onClick={() => handleClick(index + 3)}>
              {!isFlipped[index + 3] ? (
                <>
                  <div className={`imageUrl${index + 4}`}></div>
                  <div className='content'>
                    <div className={`highlt${index % 2 === 0 ? '1' : '2'}`}>{card.title}</div>
                  </div>
                </>
              ) : (
                <div className={`highlttxt${index % 2 === 0 ? '1' : '2'}`}>{card.content}</div>
              )}
              <div className='flipIcon'></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Overview;
