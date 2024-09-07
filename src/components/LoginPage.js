const LoginPage = () => {

    

    return (
        <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-3/12">
                <h1 className="text-white text-2xl font-bold mb-6 text-center">Login Page</h1>
                <form className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="p-4 w-full border-2 border-sky-500 rounded-lg bg-gray-900 text-white placeholder-gray-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-4 w-full border-2 border-sky-500 rounded-lg bg-gray-900 text-white placeholder-gray-400"
                    />
                    <button className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
