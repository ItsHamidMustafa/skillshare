import { useEffect, useState } from 'react';
import bgVideo from '../media/bg.mp4'

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch posts
        const postRes = await fetch('/api/posts/fetch-all', {
          headers: {
            'method': "GET"
          }
        });
        const postData = await postRes.json();
        if (!postRes.ok) throw new Error(postData.msg || 'Failed to fetch posts');
        setPosts(postData || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="home">
        <div style={{ height: '80vh' }}>
          <video autoPlay muted loop id="myVideo" src={bgVideo}></video>
          <div className="container">
            <h1 className="container-heading">Yo,<br /> need a hand?</h1>
            <p className="sub_heading">This is your spot to link up with folks right in the neighborhood who get it. Ditch the
              solo struggle – post what's up, find solutions, or just lend an ear. </p>
            <div className="signup-bar">
              <i className="fa-solid fa-store"></i><span>My Home</span><span style={{ color: "grey" }}>|</span>
              <input className="placeholder" type="text" placeholder="Enter your problem" />
              <div className="arrow"><i className="fa-solid fa-arrow-right"></i></div>
            </div>
          </div>
        </div>
        <hr style={{ margin: '2rem' }} />
        <h3>Recent Posts</h3>
        <div className="post-list">
          {posts.length > 0 ? (
            posts.map((post) => (

              <div className="box2" key={post._id}>
                <div className="icon-bar"><i className="fa-brands fa-google"></i>
                  <div className="save-bar">{post.type}<i style={{ marginLeft: '3px' }} className="fa-solid fa-bookmark"></i></div>
                </div>
                <h1 className="heading">{post.title}</h1>
                <span>
                  {post.description}
                </span>
                <div className="footer">
                  <div className='options'>
                    <span className='option'>{post.location}</span>
                    <span className='option'>{post.contactNumber}</span>
                  </div>
                  <button className="apply">Apply now</button>
                </div>
              </div>
            ))
          ) : (
            <p>Nothing have been posted yet.</p>
          )}
        </div>
        {error && <div className='error'>{error}</div>}
        {loading && <div className='loading'>{loading}</div>}
      </div>
    </>
  );
};

export default Home;