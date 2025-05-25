import { useEffect, useState } from 'react';
import loadingGif from '../media/loader.gif';

export const Profile = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch user
        const userRes = await fetch('/api/auth/complete-me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await userRes.json();
        if (!userRes.ok) throw new Error(userData.msg || 'Failed to fetch user');
        setUser(userData.user);
        setFormData(userData.user);

        // Fetch posts
        const postRes = await fetch('/api/posts/fetch', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);
    const token = JSON.parse(localStorage.getItem('token'));

    try {
      const res = await fetch('/api/auth/update-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(passwordData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg || 'Failed to change password!');
      }

      setPasswordSuccess('Password updated successfully!');
      setPasswordData({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setPasswordError(err.message);
    }
  };

  if (error) return <div className='error'>{error}</div>;

  if (loading) {
    return (
      <div className='loading-container'>
        <img src={loadingGif} alt="loader" className='loading' />
      </div>
    );
  }

  return (
    <div className='profile-container'>
      {user ? (
        <>
          <form>
            <label htmlFor="firstName">
              First Name
              <input
                value={formData.firstName || ''}
                id="firstName"
                className="input-box"
                readOnly
              />
            </label>
            <label htmlFor="lastName">
              Last Name
              <input
                value={formData.lastName || ''}
                id="lastName"
                className="input-box"
                readOnly
              />
            </label>
            <label htmlFor="contactNumber">
              Contact Number
              <input
                value={formData.contactNumber || ''}
                id="contactNumber"
                className="input-box"
                readOnly
              />
            </label>
          </form>
          <hr style={{ margin: '2rem 0' }} />
          <h3>Change Password</h3>
          <form onSubmit={handlePasswordSubmit}>
            <label>
              Current Password
              <input
                type="password"
                id="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="input-box"
                required
              />
            </label>
            <label>
              New Password
              <input
                type="password"
                id="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="input-box"
                required
              />
            </label>
            <button type="submit" className="primary-styled-button">
              Change Password
            </button>
            {passwordError && <p className="error">{passwordError}</p>}
            {passwordSuccess && <p className="success" onClick={() => setPasswordSuccess(null)}>{passwordSuccess}</p>}
          </form>
          <hr style={{ margin: '2rem 0' }} />
          <h3>Your Posts</h3>
          <div className="post-list">
            {posts.length > 0 ? (
              posts.map((post) => (
                // <div className="post-card" key={post._id}>
                //   <h4>{post.title}</h4>
                //   <p>Type: {post.type}</p>
                //   <p>Category: {post.category}</p>
                //   <p>Description: {post.description}</p>
                //   <p>Location: {post.location}</p>
                // </div>

                <div className="box2" key={post._id}>
                  <div className="icon-bar"><i className="fa-brands fa-google"></i>
                    <div className="save-bar">{post.type}<i style={{ marginLeft: '3px' }} className="fa-solid fa-bookmark"></i></div>
                  </div>
                  <h1 className="heading">{post.title}</h1>
                  <span>
                    {post.description}
                  </span>
                  <div className='options'>
                    <span className='option'>{post.location}</span>
                    <span className='option'>{post.contactInfo}</span>
                  </div>
                  <div className="footer">
                    <button className="apply">Apply now</button>
                  </div>
                </div>
              ))
            ) : (
              <p>You have not posted anything yet.</p>
            )}
          </div>
        </>
      ) : (
        <p>No user found!</p>
      )}
    </div>
  );
};
