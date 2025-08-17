const Contact = () => {
  return (
    <div className="min-h-screen mt-10 flex items-center justify-center bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-lg sm:max-w-xl md:max-w-3xl bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-gray-800">
          Contact Us
        </h1>
        <p className="text-gray-600 mb-6 sm:text-lg">
          Please submit your query in the message box below.
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-5 sm:space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-1 sm:mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 text-black sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-1 sm:mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="6"
              placeholder="Type your message here..."
              className="w-full text-black p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 sm:py-4 rounded-2xl shadow-md transition transform hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
