const Error = ({ message = "Something went wrong!" }) => {
  return (
    <div>
      <h1>Oops!!</h1>
      <h2>{message}</h2>
    </div>
  );
};
export default Error;
