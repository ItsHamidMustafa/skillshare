import { useState } from "react";

export const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = JSON.parse(localStorage.getItem('token'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      setError('');
      setSuccess('');
      const response = await fetch("/api/posts/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          type,
          category,
          location,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Something went wrong');
        return;
      }
      setSuccess('Yay, your post was created successfully!');
      setTitle('');
      setDescription('');
      setCategory('');
      setLocation('');
    } catch (error) {
      console.error("Error:", error);
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="profile-container">
      <form onSubmit={handleSubmit}>
        <h2>Create Post</h2>
        <div className="input-box">
          <input
            id="post-title"
            type="text"
            onChange={(e) => { setTitle(e.target.value) }}
            value={title}
            placeholder="Enter post title"
            required
          />
        </div>
        <textarea
          rows={10}
          className="input-box"
          id="post-description"
          type="textarea"
          onChange={(e) => { setDescription(e.target.value) }}
          value={description}
          required
          placeholder="Describe it here"
        >
        </textarea>
        <div className="input-box">
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Books">Books</option>
            <option value="Food">Food</option>
            <option value="Rides">Rides</option>
            <option value="Events">Events</option>
            <option value="Jobs">Jobs</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="input-box">
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="Offer">Offer</option>
            <option value="Need Help">Need Help</option>
            <option value="Promote">Promote</option>
            <option value="Donate">Donate</option>
          </select>
        </div>
        <div className="input-box">
          <input
            id="post-location"
            type="text"
            onChange={(e) => { setLocation(e.target.value) }}
            value={location}
            placeholder="Enter your location"
            required
          />
        </div>

        <button disabled={isLoading} className={`primary-styled-button ${isLoading && 'loading-anim'}`}>Create Post &nbsp;&rarr;</button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </form>
    </div>
  );
};
