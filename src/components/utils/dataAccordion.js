import DownloadFolder from "../../assets/downloable/pokeApiModels.zip";

export const dataAccordion = [
  {
    question: "Where can I find the 3D models?",
    answer: (
      <>
        <h3>
          I download the 3D models from this web{" "}
          <span>
            <a
              href="https://www.models-resource.com/3ds/pokemonxy"
              target="_blank"
            >
              page
            </a>
          </span>{" "}
          but I modified the UVS and some geometry for better performance in
          ThreeJs. You can download the modified models clicking the button 🤓
        </h3>
        <a href={DownloadFolder} className="download-button" download>
          Download
        </a>
      </>
    ),
    isLast: false,
    link: "https://www.models-resource.com/3ds/pokemonxy",
  },
  {
    question: "Where can I find the pokemon trap soundtrack?",
    answer: (
      <>
        <h3>
          <span>
            <a
              href="https://www.youtube.com/watch?v=9_lNyVSbHls&list=LL&index=81"
              target="_blank"
            >
              Here
            </a>
          </span>{" "}
          is the link to download the pokemon trap song. Thanks to the creator
          🔥🔥
        </h3>
      </>
    ),
    isLast: false,
    link: "https://www.youtube.com/watch?v=9_lNyVSbHls&list=LL&index=81",
  },
  {
    question: "Where can I find the source code of the project?",
    answer: (
      <>
        <h3>
          All the project will be upload in this Github{" "}
          <span>
            <a href="https://github.com/devSalaz/pokedexAPI" target="_blank">
              repository
            </a>
          </span>{" "}
          🤯. The assets like song, textures and models will be included in the
          repository.
        </h3>
      </>
    ),
    isLast: false,
    link: "",
  },
  {
    question: "Which API did you use for the pokedex?",
    answer: (
      <>
        <h3>
          I used the{" "}
          <span>
            <a href="https://pokeapi.co/" target="_blank">
              PokeAPI.
            </a>
          </span>{" "}
          There are a lof of Pokemon APIS 🧪 for free use in the internet
        </h3>
      </>
    ),
    isLast: true,
    link: "https://pokeapi.co/",
  },
];
