// src/App.js
import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [songFile, setSongFile] = useState(null);
  const [artFile, setArtFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  // NEW: A status object for clearer feedback
  const [status, setStatus] = useState({ message: '', isError: false });

  const handleSongFileChange = (event) => setSongFile(event.target.files[0]);
  const handleArtFileChange = (event) => setArtFile(event.target.files[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!songFile || !artFile || !title || !artist) {
      alert('Please fill in all fields and select both files.');
      return;
    }

    setUploading(true);
    setStatus({ message: 'Uploading song and artwork...', isError: false });

    // --- Upload Song File ---
    const songFileName = `songs/${Date.now()}-${songFile.name}`;
    const { error: songUploadError } = await supabase.storage.from('songs').upload(songFileName, songFile);
    if (songUploadError) {
      setStatus({ message: 'Error uploading song file: ' + songUploadError.message, isError: true });
      setUploading(false);
      return;
    }
    const { data: songUrlData } = supabase.storage.from('songs').getPublicUrl(songFileName);
    const songPublicURL = songUrlData.publicUrl;
    
    // --- Upload Album Art File ---
    const artFileName = `album-art/${Date.now()}-${artFile.name}`;
    const { error: artUploadError } = await supabase.storage.from('songs').upload(artFileName, artFile);
    if (artUploadError) {
      setStatus({ message: 'Error uploading album art: ' + artUploadError.message, isError: true });
      setUploading(false);
      return;
    }
    const { data: artUrlData } = supabase.storage.from('songs').getPublicUrl(artFileName);
    const artPublicURL = artUrlData.publicUrl;

    // --- Insert Metadata into Database ---
    const { error: insertError } = await supabase.from('songs').insert([{ 
      title, artist, song_url: songPublicURL, album_art_url: artPublicURL 
    }]);
    if (insertError) {
      setStatus({ message: 'Error saving song details: ' + insertError.message, isError: true });
      setUploading(false);
      return;
    }

    setStatus({ message: 'Song uploaded successfully!', isError: false });
    setTitle('');
    setArtist('');
    setSongFile(null);
    setArtFile(null);
    event.target.reset();
    setUploading(false);
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1>Music Uploader</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label>Artist</label>
            <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} required />
          </div>
          <div>
            <label>Song File (MP3)</label>
            <input type="file" accept="audio/mpeg" onChange={handleSongFileChange} required />
          </div>
          <div>
            <label>Album Art (JPG/PNG)</label>
            <input type="file" accept="image/jpeg, image/png" onChange={handleArtFileChange} required />
          </div>
          <button type="submit" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload Song'}
          </button>
        </form>
        {status.message && (
          <p className={`message ${status.isError ? 'error' : 'success'}`}>
            {status.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;