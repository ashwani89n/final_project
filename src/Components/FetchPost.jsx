import { useState, useEffect } from 'react';
import Card from '../Components/Card';
import { supabase } from "../client";
import './FetchPost.css';
import './CreatePost.css';
import './Header.css';
import { Link } from 'react-router-dom';

const FetchPost = () => {
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [orderBy, setOrderBy] = useState('created_at');

  useEffect(() => {
    fetchPosts(orderBy);
  }, []); 

  const fetchPosts = async (orderBy) => {
    try {
      const { data, error } = await supabase
        .from('Posts')
        .select()
        .ilike('title', `%${searchInput}%`)
        .order(orderBy, { ascending: false }); 

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data || []);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSortChange = (newOrderBy) => {
    setOrderBy(newOrderBy);
    fetchPosts(newOrderBy);
  };

  return (
    <div>
      <div className="header-contain1">
        <Link to="/">
          <div className="home-icon"></div>
        </Link>
        <h1 className="logo2">Talkin&apos; Panthers</h1>
        <div>
          <input
            className='searchDiv1'
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
        </div>
      </div>
      <div className='sort'>
        <div className='orderbyTxt'>Order By: </div>
        <button className='latest' onClick={() => handleSortChange('created_at')}>Latest</button>
       <button className='latest1' onClick={() => handleSortChange('upvotes_count')}>Popular</button>
      </div>
      <div className='rows'>
        <div className="ReadPosts" >
          {
            posts && posts.length > 0 ?
            posts.map((post) => (
              <Card key={post.id} id={post.id} title={post.title} created_at={post.created_at} upvotes_count={post.upvotes_count} downvotes_count={post.downvotes_count}/>
            )) : <div className='whole-page'><h2>{'No Posts Yet😞'}</h2></div>
          }
        </div>  
        <div className="newPosts" >
          <Link to="/create"><div className='post-txt'>Create New Post</div></Link>
          <div className='post-icon'></div>
          <div className="create-subtxt">
            Your ideas, our canvas. Create a post and paint the vibrant tapestry of Panther experiences on Talkin&apos; Panthers.
          </div>
        </div> 
      </div>
    </div>
  );
};

export default FetchPost;
