
const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF"
}


const url = "https://pokeapi.co/api/v2/pokemon/"

const card = document.getElementById('card')
const btn = document.getElementById('btn')

let getPokeData = () => {
    // Generate a random number between 1 and 150
    let id = Math.floor(Math.random() * 150) + 1;
    // Combine the pokeapi url with pokemon id
    const finalUrl = url + id;
    // Fetch generated URL
    fetch(finalUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        generateCard(data);
      });
  };

  //generate Card 
  let generateCard = (data)=>{
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
    const statAtack = data.stats[0].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;

    // Set ThemeColor based on Pokemon type
    const themeColor = typeColor[data.types[0].type.name];
    console.log(themeColor)

    card.innerHTML = `
            <p class="hp">
                <span>HP</span>
                ${hp}
            </p>
            <img src=${imgSrc} alt="">
            <h2 class="poke-name">
                ${pokeName}
            </h2>

            <div class="types">
                
            </div>
            <div class="status">
                <div>
                    <h3>${statAtack}</h3>
                    <p>Attack</p>
                </div>

                <div>
                    <h3>${statDefense}</h3>
                    <p>Defense</p>
                </div>

                <div>
                    <h3>${statSpeed}</h3>
                    <p>Speed</p>
                </div>
            </div>
    `;
    appendTypes(data.types)
    styleCard(themeColor);
     
  }
{/* <span>type 1</span>
                <span>type 2</span> */}
    let appendTypes = (types)=>{
      types.forEach((item)=>{
        let span = document.createElement('SPAN')
        span.textContent = item.type.name
        document.querySelector('.types').appendChild(span)
         
      
      })
    }

    let styleCard = (color) => {
      card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #FFF 36%)`;
      card.querySelectorAll('.types span').forEach((typeColor)=>{
        typeColor.style.backgroundColor = color;
      })
    }

btn.addEventListener('click', getPokeData)
window.addEventListener('load', getPokeData)