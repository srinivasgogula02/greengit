
import React, { useState } from 'react';
import { Users, Building, MapPin, Link as LinkIcon } from 'lucide-react';

export const ProfileHeader = () => {
    const [name, setName] = useState("Your Name");
    const [username, setUsername] = useState("username");
    const [bio, setBio] = useState("Software Engineer | Open Source Enthusiast | Building cool things");

    return (
        <div className="profile-header">
            <div className="avatar-container">
                <div className="avatar">
                    {/* Placeholder Avatar */}
                    <img
                        src={`https://github.com/${username}.png`}
                        onError={(e) => (e.currentTarget.src = "https://github.com/github.png")}
                        alt="Avatar"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
            </div>

            <div className="profile-info">
                <input
                    className="input-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="input-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <textarea
                    className="input-bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={2}
                />

                <button className="follow-btn">Follow</button>

                <div className="profile-stats-row">
                    <div className="stat-item"><Users size={16} /> <span><b>1.2k</b> followers</span></div>
                    <div className="stat-item"><span><b>200</b> following</span></div>
                </div>

                <div className="profile-stats-row">
                    <div className="stat-item"><Building size={16} /> <span>Company Inc</span></div>
                    <div className="stat-item"><MapPin size={16} /> <span>San Francisco</span></div>
                    <div className="stat-item"><LinkIcon size={16} /> <span>blog.dev</span></div>
                </div>
            </div>
        </div>
    );
};
