import { useState } from "react";

function Login({ onBack, onLoginSuccess, onRegister }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [loginMethod, setLoginMethod] = useState("phone");
	const [status, setStatus] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(event) {
		event.preventDefault();
		setStatus("");
		setIsSubmitting(true);

		try {
			const response = await fetch(  "http://localhost:5000/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();

			if (!response.ok || data.success === false) {
				throw new Error(data.message || "Login failed");
			}

			const token = data.token || data.accessToken || data.data?.token;
			if (token) {
				localStorage.setItem("token", token);
			}

			setStatus(data.message || "Login successful");
			onLoginSuccess();
		} catch (error) {
			setStatus(error.message || "Unable to connect to the backend");
		} finally {
			setIsSubmitting(false);
		}
	}

	function handlePhoneLogin(event) {
		event.preventDefault();
		setStatus(phone ? "Phone OTP login will be available when the backend OTP endpoint is connected." : "Enter your mobile number first");
	}

	function handleGoogleLogin() {
		setStatus("Google login will be available when Google OAuth is connected.");
	}

	return (
		<section className="login-modal">
			<button className="login-close" type="button" onClick={onBack} aria-label="Close login">×</button>
			<div className="login-heading">
				<h1>Login</h1>
			</div>
			<p className="login-subtitle">Sign in to continue to your restaurant account.</p>
			<form className={`login-form ${loginMethod === "phone" ? "phone-login-form" : ""}`} onSubmit={loginMethod === "phone" ? handlePhoneLogin : handleSubmit}>
				{loginMethod === "phone" ? (
					<label className="phone-field">
						<span className="country-code">IN +91</span>
						<input
							className="phone-input"
							type="tel"
							value={phone}
							onChange={(event) => setPhone(event.target.value)}
							placeholder="Phone"
							required
						/>
					</label>
				) : (
					<>
				<label>
					Email
					<input
						className="login-input"
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						placeholder="Enter email"
						required
					/>
				</label>
				<label>
					Password
					<input
						className="login-input"
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						placeholder="Enter password"
						required
					/>
				</label>
					</>
				)}
				{loginMethod === "phone" ? (
					<button className="otp-button" type="submit">Send One Time Password</button>
				) : (
				<button className="primary-button" type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Logging in..." : "Login"}
				</button>
				)}
				{status && <p className="login-status" role="status">{status}</p>}
			</form>
			<div className="login-divider"><span>or</span></div>
			<button className="secondary-login-button" type="button" onClick={() => { setStatus(""); setLoginMethod(loginMethod === "phone" ? "email" : "phone"); }}>
				{loginMethod === "phone" ? "Continue with Email" : "Use Mobile Number"}
			</button>
			<button className="google-button" type="button" onClick={handleGoogleLogin}>
				<span className="google-mark">G</span> Sign in with Google
			</button>
			<button className="register-button" type="button" onClick={onRegister}>
				Create account
			</button>
		</section>
	);
}

export default Login;