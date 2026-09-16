import { useEffect, useState } from "react";

function Profile({ onLogout }) {
	const [profile, setProfile] = useState(null);
	const [error, setError] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			setError("Please log in to view your profile.");
			return;
		}

		fetch("http://localhost:5000/api/auth/me", {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then(async (response) => {
				const data = await response.json();
				if (!response.ok || data.success === false) {
					throw new Error(data.message || "Unable to load profile");
				}
				setProfile(data.data || data.user || data);
			})
			.catch((requestError) => setError(requestError.message));
	}, []);

	function handleLogout() {
		localStorage.removeItem("token");
		onLogout();
	}

	if (error) {
		return <p className="state-message error-message">{error}</p>;
	}

	if (!profile) {
		return <p className="state-message">Loading profile...</p>;
	}

	return (
		<section className="profile-panel">
			<div className="profile-heading">
				<p className="eyebrow">ACCOUNT</p>
				<h1>Profile</h1>
				<p>Your account details from the restaurant service.</p>
			</div>
			<div className="profile-details">
				<div>
					<span>Name</span>
					<strong>{profile.name || profile.username || "Not provided"}</strong>
				</div>
				<div>
					<span>Email</span>
					<strong>{profile.email || "Not provided"}</strong>
				</div>
			</div>
			<button className="logout-button" type="button" onClick={handleLogout}>
				Logout
			</button>
		</section>
	);
}

export default Profile;
