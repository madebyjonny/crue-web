export default function Register() {
  return (
    <div>
      <h2>Register</h2>
      <form>
        <label>Email</label>
        <input id="email" name="email" type="email" />
        <label>Password</label>
        <input id="password" name="password" type="password" />
        <label>Confirm Password</label>
        <input
          id="confirm-password"
          name="password_confirmation"
          type="password"
        />
      </form>
    </div>
  );
}
