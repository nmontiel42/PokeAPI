import React, { useState } from "react";
import { usePollinationsImage } from "@pollinations/react";

const Dashboard: React.FC = () => {
    const token = localStorage.getItem("githubToken");

    const [type, setType] = useState<string>("steel");
    const [color, setColor] = useState<string>("red");
    const [evolution, setEvolution] = useState<number>(1);
    const [accessory, setAccessory] = useState<string>("glasses");
    const [habitat, setHabitat] = useState<string>("forest");

    const [generate, setGenerate] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false); // Estado para controlar el "loading"

    const description = `A Pokémon of type ${type} with a ${color} theme, whose evolution is ${evolution} with ${accessory}, that lives in the ${habitat} illustrated in a detailed and vibrant art style.`;

    const imageUrl = usePollinationsImage(description, {
        width: 512,
        height: 512,
        seed: Math.floor(Math.random() * 100000),
        model: "flux",
        nologo: false
    });

    const handleGenerate = () => {
        setGenerate(true);
        setIsLoading(true);  // Activar el estado de "loading" cuando se hace clic
    };

    if (!token) {
        return (
            <div className="flex justify-center items-center h-screen bg-rose-100">
                <p className="text-lg text-rose-700">No has iniciado sesión.</p>
            </div>
        );
    }

    return (
        <div className="w-full h-screen bg-[url('frontend/img/pixelcut-export.jpeg')] bg-cover bg-center p-4">
            <div className="flex justify-between items-center p-4">
                <h1 className="text-3xl font-bold text-white">PokeAPI</h1>
                <button
                    onClick={() => {
                        localStorage.removeItem("githubToken");  // Eliminar el token de localStorage
                        window.location.href = "/";  // Redirigir al inicio de sesión
                    }}
                    className="px-2 py-1 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Logout
                </button>
            </div>

            <div className="space-y-6 max-w-md mx-auto">
                {/* Inputs */}
                {[
                    { label: "Select a Type:", id: "type-select", value: type, setter: setType, options: ["steel", "water", "bug", "dragon", "electric", "ghost", "fire", "fairy", "ice", "fighting", "normal", "grass", "psychic", "rock", "dark", "ground", "flying"] },
                    { label: "Select a Color:", id: "color-select", value: color, setter: setColor, options: ["red", "blue", "green", "yellow", "pink", "brown", "lavender", "black", "white", "silver", "gold"] },
                    { label: "Select an Evolution:", id: "evolution-select", value: evolution.toString(), setter: (value: string) => setEvolution(Number(value)), options: ["1", "2", "3"] },
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

                {/* Imagen generada */}
                {generate && (
                    <div className="mt-4">
                        {isLoading ? (
                    <p className="text-center text-purple-100">Loading...</p> // Mensaje de carga
                    ) : (
                    imageUrl && (
                        <img
                        src={imageUrl}
                        alt="Generated Pokémon"
                        className="border border-purple-300 rounded-md w-full shadow-md"
                        />
                    )
                    )}

                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
