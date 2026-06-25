import { useState } from "react";
import { User, Mail, ShieldCheck, Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Pakai Context
import "../App.css";

function Profile() {
    const navigate = useNavigate();
    const { user, updateUser } = useAuth(); // Ambil dari Context
    
    // State buat handle perubahan username
    const [username, setUsername] = useState(user?.username || "");

    const handleUpdate = async () => {
        try {
            updateUser({ username: username }); // Update via Context
            alert("Username berhasil diganti!");
        } catch (error) {
            alert("Gagal update profil");
        }
    };

    // Ambil huruf pertama buat Avatar
    const initial = user?.username?.charAt(0).toUpperCase() || "U";

    return (
        <div className="profile-wrapper">

            <div className="profile-card">
                <div className="profile-header">
                    {/* Ganti foto pake Lingkaran Huruf Depan */}
                    <div className="avatar-initial">
                        {initial}
                    </div>
                    <h2>User Profile</h2>
                    <div className="role-badge">
                        <ShieldCheck size={14} /> {user?.role || "Member"}
                    </div>
                </div>

                <div className="profile-body">
                    <div className="info-group">
                        <label><User size={16} /> Username</label>
                        <input 
                            type="text"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="admin-input" 
                        />
                    </div>

                    <div className="info-group">
                        <label><Mail size={16} /> Email Address</label>
                        <input 
                            type="text" 
                            value={user?.email || ""} 
                            disabled 
                            className="admin-input disabled-input" 
                        />
                        <small>*Email tidak dapat diubah</small>
                    </div>
                </div>

                <button onClick={handleUpdate} className="btn-save-profile">
                    <Save size={18} /> Update Username
                </button>
            </div>
        </div>
    );
}

export default Profile;