import React, { useState } from "react";
import { usePollinationsImage } from "@pollinations/react";
import LogoutButton from "./LogoutButton";

const Dashboard: React.FC = () => {
    const token = localStorage.getItem("githubToken");

    const [type, setType] = useState<string>("steel");
    const [color, setColor] = useState<string>("red");
    const [evolution, setEvolution] = useState<number>(1);
    const [accessory, setAccessory] = useState<string>("glasses");
    const [habitat, setHabitat] = useState<string>("forest");
    const [generate, setGenerate] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imageUrlState, setImageUrlState] = useState<string | null>(null);
    const [shareMenuVisible, setShareMenuVisible] = useState<boolean>(false);

    const description = `A ${type}-type Pokémon with a ${color} theme, at evolution stage ${evolution}, adorned with ${accessory}, and living in a ${habitat}, illustrated in a vibrant and detailed art style.`;

    const rawImageUrl = usePollinationsImage(description, {
        width: 512,
        height: 512,
        seed: Math.floor(Math.random() * 100000),
        model: "flux",
        nologo: false
    });

    const handleGenerate = () => {
        setGenerate(true);
        setIsLoading(true);
        setImageUrlState(null);
        setTimeout(() => {
            setImageUrlState(rawImageUrl);
            setIsLoading(false);
        }, 3000);
    };

    const toggleShareMenu = () => {
        setShareMenuVisible(!shareMenuVisible);
    };

    const closeShareMenu = () => {
        setShareMenuVisible(false);
    };

    if (!token) {
        return (
            <div className="flex justify-center items-center h-screen bg-rose-100">
                <p className="text-lg text-rose-700">No has iniciado sesión.</p>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[url('frontend/img/pixelcut-export.jpeg')] bg-cover bg-center p-4">
            <div className="flex justify-between items-center p-4">
                <h1 className="text-3xl font-bold text-white">PokeAPI</h1>
                <LogoutButton />
            </div>

            <div className="space-y-6 max-w-md mx-auto">
                {/* Inputs */}
                {[
                    { label: "Select a Type:", id: "type-select", value: type, setter: setType, options: ["steel", "water", "bug", "dragon", "electric", "ghost", "fire", "fairy", "ice", "fighting", "normal", "grass", "psychic", "rock", "dark", "ground", "flying"] },
                    { label: "Select a Color:", id: "color-select", value: color, setter: setColor, options: ["red", "blue", "green", "yellow", "pink", "brown", "lavender", "black", "white", "silver", "gold"] },
                    { label: "Select an Evolution Stage:", id: "evolution-select", value: evolution.toString(), setter: (value: string) => setEvolution(Number(value)), options: ["1", "2", "3"] },
                    { label: "Select an Accessory:", id: "accessory-select", value: accessory, setter: setAccessory, options: ["none", "a hat", "glasses", "bow", "scarf", "cape", "necklace", "crown"] },
                    { label: "Pokémon Habitat:", id: "habitat-select", value: habitat, setter: setHabitat, options: ["forest", "mountain", "desert", "ocean"] }
                ].map(({ label, id, value, setter, options }, idx) => (
                    <div key={idx}>
                        <label htmlFor={id} className="block text-sm font-medium text-purple-100">
                            {label}
                        </label>
                        <select
                            id={id}
                            className="mt-1 w-full border-2 border-purple-300 rounded-md shadow-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-800 py-2 px-3 transition-all hover:bg-purple-100"
                            value={value}
                            onChange={(e) => setter(e.target.value)}
                        >
                            {options.map((option, idx) => (
                                <option key={idx} value={option}>
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}

                {/* Botón */}
                <button
                    onClick={handleGenerate}
                    className="w-full py-2 bg-purple-500 text-white font-medium rounded-md hover:bg-purple-800 transition-all shadow-lg"
                >
                    Generate Image
                </button>

                {/* Indicador de carga */}
                {isLoading && (
                    <div className="mt-6 flex justify-center">
                        <img
                            src="/assets/monito.gif"
                            alt="Loading..."
                            className="h-16 w-16"
                        />
                    </div>
                )}

                {/* Imagen generada */}
                {!isLoading && imageUrlState && (
                    <div className="mt-10 text-center">
                        <span className="text-purple-100">Your Pokémon:</span>
                        <span className="text-black"> {description}</span>
                        <span className="text-purple-100">(It will take a few seconds for the image to appear)</span>
                        <br />
                        <img
                            src={imageUrlState}
                            alt="Generated Pokémon"
                            className="mt-6 mx-auto border border-gray-300 rounded-lg shadow-lg"
                        />
                        <br />
                        {/* Enlace para descargar la imagen */}
                        <div className="flex justify-between">
                            <a
                                href={imageUrlState}
                                download="generated-pokemon.png"
                                target="_blank" // Abre el enlace en una nueva pestaña
                                className="inline-block mt-4 py-2 px-4 bg-green-500 text-white font-medium rounded-md hover:bg-green-700 transition-all shadow-lg"
                            >
                                Download Image
                            </a>

                            {/* Popup para compartir */}
                            {shareMenuVisible && (
                                <div
                                    className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
                                    onClick={closeShareMenu}
                                >
                                    <div
                                        className="bg-white rounded-lg p-8 shadow-xl w-96 transition-transform transform scale-95 hover:scale-100"
                                        onClick={(e) => e.stopPropagation()} // Para evitar que el click cierre el popup
                                    >
                                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 tracking-wide">
                                            Share this Pokémon
                                        </h2>
                                        <div className="space-y-4">
                                            <a
                                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(imageUrlState)}&text=${encodeURIComponent("Check out this Pokémon I just created!")}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block px-6 py-3 text-sm text-blue-600 hover:bg-blue-100 hover:text-blue-800 rounded-lg transition-all duration-200 ease-in-out shadow-md transform hover:scale-105"
                                            >
                                                <i className="fab fa-twitter mr-2"></i> Share on Twitter
                                            </a>
                                            <a
                                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrlState)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block px-6 py-3 text-sm text-blue-800 hover:bg-blue-100 hover:text-blue-800 rounded-lg transition-all duration-200 ease-in-out shadow-md transform hover:scale-105"
                                            >
                                                <i className="fab fa-facebook-f mr-2"></i> Share on Facebook
                                            </a>
                                            <a
                                                href={`mailto:?subject=Check out this Pokémon!&body=Look at this Pokémon I created: ${imageUrlState}`}
                                                className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-800 rounded-lg transition-all duration-200 ease-in-out shadow-md transform hover:scale-105"
                                            >
                                                <i className="fas fa-envelope mr-2"></i> Share via Email
                                            </a>
                                            <a
                                                href={`https://www.instagram.com/?url=${encodeURIComponent(imageUrlState)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block px-6 py-3 text-sm text-pink-600 hover:bg-pink-100 hover:text-pink-800 rounded-lg transition-all duration-200 ease-in-out shadow-md transform hover:scale-105"
                                            >
                                                <i className="fab fa-instagram mr-2"></i> Share on Instagram
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            )}

                            {/* Botón para abrir el popup */}
                            <div className="relative mt-4">
                                <button
                                    onClick={toggleShareMenu}
                                    className="py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700 transition-all shadow-lg"
                                >
                                    Share Image
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
