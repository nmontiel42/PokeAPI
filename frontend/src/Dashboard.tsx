import React, { useState } from "react";
import { usePollinationsImage } from "@pollinations/react";

const Dashboard: React.FC = () => {
    const token = localStorage.getItem("githubToken");

    const [type, setType] = useState<string>("agua");
    const [color, setColor] = useState<string>("amarillo");
    const [evolution, setEvolution] = useState<number>(1);
    const [accessory, setAccessory] = useState<string>("glasses");
    const [habitat, setHabitat] = useState<string>("forest");

    const [generate, setGenerate] = useState<boolean>(false);

    const description = `A Pokémon of type ${type} with a ${color} theme, whos evolution is ${evolution} with a ${accessory}, that lives in the ${habitat} illustrated in a detailed and vibrant art style.`;

    const imageUrl = usePollinationsImage(description, {
        width: 512,
        height: 512,
        seed: Math.floor(Math.random() * 100000), // Generar un valor aleatorio
        model: "flux",
        nologo: false
    });

    const handleGenerate = () => {
        setGenerate(true);
    };

    if (!token) {
        return <p>No has iniciado sesion.</p>
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Bienvenido a Poke Api 2.0</h1>

            <div style={{ marginTop: "20px" }}>
                <h1 className="text-2xl text-red-400">Poke API</h1>

                {/* Selección del tipo */}
                <div className="mb-4">
                    <label htmlFor="type-select" className="block text-sm font-medium text-gray-700">
                        Selecciona un Tipo
                    </label>
                    <select
                        id="type-select"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="water">Agua</option>
                        <option value="fire">Fuego</option>
                        <option value="grass">Planta</option>
                        <option value="electric">Eléctrico</option>
                    </select>
                </div>

                {/* Selección del color */}
                <div className="mb-4">
                    <label htmlFor="color-select" className="block text-sm font-medium text-gray-700">
                        Selecciona un Color
                    </label>
                    <select
                        id="color-select"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    >
                        <option value="yellow">Amarillo</option>
                        <option value="red">Rojo</option>
                        <option value="green">Verde</option>
                        <option value="blue">Azul</option>
                        <option value="pink">Rosa</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="evolution-select" className="block text-sm font-medium text-gray-700">
                        Selecciona su evolucion
                    </label>
                    <select
                        id="evolution-select"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={evolution}
                        onChange={(e) => setEvolution(Number(e.target.value))}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="accessory-select" className="block text-sm font-medium text-gray-700">
                        Selecciona un accesorio
                    </label>
                    <select
                        id="accessory-select"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={accessory}
                        onChange={(e) => setAccessory(e.target.value)}
                    >
                        <option value="glasses">Gafas</option>
                        <option value="bow">Lazo</option>
                        <option value="Scarf">Bufanda</option>
                        <option value="Cape">Capa</option>
                        <option value="Necklace">Collar</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="habitat-select" className="block text-sm font-medium text-gray-700">
                        Hábitat del Pokémon
                    </label>
                    <select
                        id="habitat-select"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={habitat}
                        onChange={(e) => setHabitat(e.target.value)}
                    >
                        <option value="forest">Bosque</option>
                        <option value="mountain">Montaña</option>
                        <option value="desert">Desierto</option>
                        <option value="ocean">Océano</option>
                    </select>
                </div>




                {/* Botón para generar la imagen */}
                <button
                    onClick={handleGenerate}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Generar Imagen
                </button>

                {/* Mostrar la imagen generada */}
                {generate ? (
                    imageUrl ? (
                        <div className="mt-4">
                            <h2 className="text-lg font-medium">Imagen Generada:</h2>
                            <img
                                src={imageUrl}
                                alt="Generated Pokémon"
                                className="mt-4 border border-gray-300 rounded-md"
                            />
                        </div>
                    ) : (
                        <p>Generando imagen...</p>
                    )
                ) : null}
            </div>
        </div>
    );
};

export default Dashboard;
