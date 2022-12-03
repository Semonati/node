const countFailure = () => {
  const counter = localStorage.getItem("failed");
  if (counter) console.log(counter);
  return "Authentication Error: Invalid email or password";
};

module.exports = countFailure;
