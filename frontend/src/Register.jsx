import { useState } from "react";

function Register({ onBack, onRegistered }) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [status, setStatus] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(event) {
		event.preventDefault();
		setStatus("");
		setIsSubmitting(true);

		try {
			const response = await fetch("http://localhost:5000/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, password }),
			});
			const data = await response.json();

			if (!response.ok || data.success === false) {
				throw new Error(data.message || "Registration failed");
			}

			onRegistered();
		} catch (error) {
			setStatus(error.message || "Unable to connect to the backend");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<section className="login-panel">
			<div className="login-heading">
				<p className="eyebrow">NEW ACCOUNT</p>
				<h1>Create account</h1>
				<p>Register to manage your restaurant account.</p>
			</div>
			<form className="login-form" onSubmit={handleSubmit}>
				<label>
					Name
					<input className="login-input" type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter name" required />
				</label>
				<label>
					Email
					<input className="login-input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter email" required />
				</label>
				<label>
					Password
					<input className="login-input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" required minLength={6} />
				</label>
				<button className="primary-button" type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Registering..." : "Register"}
				</button>
				{status && <p className="login-status" role="status">{status}</p>}
			</form>
			<button className="back-button" type="button" onClick={onBack}>Back to login</button>
		</section>
	);
}

export default Register;

