import { useState, useEffect } from "react";

export default function RickAndMorty() {
    const [name, setName] = useState("");
    const [char, setChar] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                setChar(data.results[0]);
                setError(null); // Limpa o erro se a busca tiver sucesso
            } else {
                setChar(null);
                setError("Personagem não encontrado");
            }
        } catch (error) {
            console.log("Erro", error);
            setError("Erro ao buscar personagem");
        }
    };

    const handleSearch = () => {
        if (name !== "") {
            fetchData();
        } else {
            setError("Digite o nome do personagem para buscar.");
        }
    };

    const handleInputChange = (event) => {
        setName(event.target.value);
    };

    return (
        <div id="box">
            <nav id="banner"><h1> Characters Of RickAndMorty </h1> </nav>
        <div>
            <div id="busca">
            <input  type="text" value={name} name="name" onChange={handleInputChange} placeholder="Digite o personagem..."/>
            <button onClick={handleSearch}>Buscar</button>
            </div>
            {char && (
                <div className="Rick">
                    <p id="name">{char.name}</p>
                    <img src={char.image} alt={char.name} />
                </div>
            )}
        </div>
        </div>
    );
}
