import React, { useEffect, useState } from "react";

const Pokemon = () => {
  const [searchSystem, setSearchSystem] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorData, setErrorData] = useState(false);

  const API = "https://pokeapi.co/api/v2/pokemon?limit=100"; // ye limit ki value hu apne hisab se rakh sakte hai jitni iski value hogi utna hi data hamaare pass aayega

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      // console.log(data)

      const detailedPokemonData = data.results.map(async (curElem) => {
        // console.log(curElem.url)
        const res = await fetch(curElem.url); // this one line to call all the APIs(url of images)
        const data = await res.json();
        return data;
      });
      // console.log(detailedPokemonData)

      const detailedResponse = await Promise.all(detailedPokemonData);
      console.log(detailedResponse);
      setPokemon(detailedResponse);
      setLoading(true);
    } catch (err) {
      console.log("Error : ", err);
      setLoading(false);
      setErrorData(true);
    }
  };
  useEffect(() => {
    fetchPokemon();
  }, []);

  //? Search Functionality
  const searchContainer = pokemon.filter((curElem) => {
    return curElem.name.toLowerCase().includes(searchSystem.toLowerCase())
  })

  if (errorData) {
    return (
      <>
        <h1 className="text-2xl font-medium">
          Bhai dusri jagah dekh le yaha to error aa gayi 😂🥷🥷♾️♾️♾️
        </h1>
      </>
    );
  }

  if (!loading) {
    return (
      <>
        <h1 className="text-4xl font-bold">Loading</h1>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen pt-8 bg-[#eef2fe]">
      <header className="flex flex-col items-center justify-start ">
        <h1 className="text-3xl font-bold">Left Catch Pokémon</h1>
        <div>
          <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchSystem}
          onChange={(e) => setSearchSystem(e.target.value)}
          className="w-[20vw] h-8 border-1 mt-3 px-3 border-black"
        />
        </div>
      </header>
      <div className="main w-[85%] mt-5 min-h-[80vh] grid place-items-center grid-cols-3 gap-9 px-5 py-3">
        {/* {pokemon.map((curPokemon) => { */}
        {searchContainer.map((curPokemon) => { // ab ye automatic hi searching karta rhega jaise jaise hum input field me kuch bhi value daalenge
          return (
            <div
              key={curPokemon.id}
              className="cards w-[23vw] bg-white h-[55vh]"
            >
              <div className="w-[100%] h-[35%] py-3 flex items-center justify-center">
                <img
                  src={curPokemon.sprites.other.dream_world.front_default}
                  className="w-full h-full"
                  alt=""
                />
              </div>
              <p className="text-center mt-4 text-[1.4rem] font-medium ">
                {curPokemon.name.charAt(0).toUpperCase() +
                  curPokemon.name.slice(1)}{" "}
                {/* slice ek character ko miss kar dega */}
              </p>

              <div className="flex items-center justify-center mt-4 text-[1.1rem] font-medium">
                <p className="text-center w-[15vw] rounded-lg px-2.5 py-2 bg-green-400">
                  {curPokemon.types
                    .map((curType) =>
                      curType.type.name
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")
                    )
                    .join(", ")}
                </p>{" "}
                {/*types ek array hai agar us array me kisi index per 2 name hue to dono ko read karne ke liye yaha per bhi map method laga diya */}
              </div>

              <div className="mt-3 grid grid-cols-3 place-items-center">
                <p className="text-[0.81rem] font-normal">
                  Height : {curPokemon.height}
                </p>
                <p className="text-[0.81rem] font-normal">
                  Weight : {curPokemon.weight}
                </p>
                <p className="text-[0.81rem] font-normal">
                  Speed : {curPokemon.stats[5].base_stat}
                </p>
              </div>

              <div className="grid place-items-center grid-cols-3">
                <div className="flex items-center justify-center flex-col mt-3">
                  <p>{curPokemon.base_experience}</p>
                  <span>Experience</span>
                </div>
                <div className="flex items-center justify-center flex-col mt-3">
                  <p>{curPokemon.stats[1].base_stat}</p>
                  <span>Attack</span>
                </div>
                <div className="flex items-center justify-center flex-col mt-3">
                  <p>
                    {curPokemon.abilities
                      .map((abilityInfo) => abilityInfo.ability.name)
                      .slice(0, 1)
                      .join(", ")}
                  </p>{/* yaha per mujhe ek hi data chahiye isliye slice kiya hai otherwise iss array ke har element me 1 se jyada elements hai */}
                  <span>Abilities</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pokemon;
