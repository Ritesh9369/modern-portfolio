const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      
      <div className="bg-slate-900 border border-cyan-400 rounded-3xl p-10 shadow-2xl text-center max-w-xl w-full">
        
        <h1 className="text-5xl font-bold text-cyan-400 mb-4">
          Tailwind CSS Working 🚀
        </h1>

        <p className="text-gray-300 text-lg mb-6">
          React + Vite + Tailwind CSS v4 Setup Successful
        </p>

        <button className="bg-cyan-400 hover:bg-cyan-300 text-black font-semibold px-6 py-3 rounded-xl transition-all duration-300">
          Modern Portfolio
        </button>

      </div>

    </div>
  );
};

export default Home;