import React from "react";
import { FaGithub } from "react-icons/fa";

const Login: React.FC = () => {
  const handleGithubLogin = () => {
    console.log(import.meta.env);
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;

    console.log("Client ID:", clientId);
    console.log("Redirect URI:", redirectUri);

    if (!clientId || !redirectUri) {
      console.error("GitHub client ID or redirect URI is missing!");
      return;
    }

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user`;
    window.location.href = githubAuthUrl;
  };

  return (
    <div className="bg-[url('../img/pixelcut-export.jpeg')] bg-cover bg-center min-h-screen flex flex-col md:flex-row relative overflow-hidden">
      <div className="w-full md:w-1/2 p-6 md:p-12 flex items-center justify-center relative z-10">
        <div className="text-center md:text-left text-white max-w-md">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-8">
            <div className="relative">
              {/* Imagen del favicon de Pokémon */}
              <img
                src="../img/pokemon.png"
                alt="Pokémon Favicon"
                className="w-20 h-20 md:w-30 md:h-30 animate-pulse"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight text-center md:text-left">
              PokeAPI
            </h1>
          </div>
          <h5 className="text-center text-4xl md:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">
              Design Your Dream Pokemon
          </h5>
          <p className="text-purple-100 text-lg leading-relaxed text-center">
            Create unique Pokémon with custom types, colors, and more!
          </p>

        </div>
      </div>

      {/* Sign Up Section */}
      <div className="w-full md:w-1/2 p-6 md:p-12 flex items-center justify-center relative z-10">
        <div className="w-full max-w-md bg-black/30 backdrop-blur-2xl rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Get Started</h2>
            <p className="text-purple-200">One click away from creating Pokémon</p>
          </div>

          <button
            onClick={handleGithubLogin}
            className="group w-full flex items-center justify-center gap-3 bg-white text-purple-900 py-4 px-6 rounded-xl hover:bg-purple-50 active:scale-[0.98] transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl"
          >
            <FaGithub className="w-6 h-6 transition-transform duration-200" />
            <span>Login with GitHub</span>
          </button>

          <div className="mt-10 space-y-4">
            <p className="text-center text-sm text-purple-200">
              By signing up, you agree to our{" "}
              <a href="#" className="text-white hover:underline decoration-2 underline-offset-2 transition-colors">
                Terms of Service
              </a>{" "}
              &{" "}
              <a href="#" className="text-white hover:underline decoration-2 underline-offset-2 transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
