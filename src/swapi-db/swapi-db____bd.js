export default class SwapiDB {

  constructor() {
    this.apiLink = 'https://swapi.co/api';
  }

  getIdLink(link) {
    const idRegExp = /\/([0-9]*)\/$/;
    return link.match(idRegExp)[1];
  }

  async getResource(url) {
    const result = await fetch(`${this.apiLink}${url}`);
    if (!result.ok) {
      throw new Error(`No data was found at ${url}, received ${result.status}`);
    }
    return await result.json();
  }

  async fetchUrls(urls) {
    const request = (url, data = []) => {
      return new Promise((resolve, reject) => {
        try {
          resolve( fetch(url) );
        } catch (error) {
          reject(error);
        }
      });
    };

    return Promise.all(urls.map(url => request(url)
        .then( data => {
            return data.json();
          }	
        )
        .catch (data => {
          throw new Error(`No data was found at ${url}, received ${data.status}`);
        })
      )
    ) 
  }

  async getAllPeople() {
    const result = await this.getResource(`/people/`);
    return result.results;
  }

  async getPerson(id) {
    const person = await this.getResource(`/people/${id}/`);
    return this.transformPerson(person);
  }

  async getAllPlanets() {
    const result = await this.getResource(`/planets/`);
    return result.results;
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return this.transformPlanet(planet);
  }

  async getAllStarships() {
    const result = await this.getResource(`/starships/`);
    return result.results;
  }

  getStarship(id) {
    return this.getResource(`/starships/${id}/`);
  }

  getVehicles(id) {
    return this.getResource(`/vehicles/${id}/`);
  }

  getSpecies(id) {
    return this.getResource(`/species/${id}/`);
  }

  getFilms(id) {
    return this.getResource(`/films/${id}/`);
  }

  
  async transformPerson(person) {
    const films = await this.fetchUrls(person.films);
    console.log(films);
    return {
      name: person.name,
      birthYear: person.birth_year,
      gender: person.gender,
      height: person.height,
      weight: person.mass,
      eyeColor: person.eye_color,
      hairColor: person.hair_color,
      skinColor: person.skin_color,
    }
  }

  transformPlanet(planet) {
    return {
      name: planet.name,
      climate: planet.climate,
      diameter: planet.diameter,
      films: planet.films,
      gravity: planet.gravity,
      orbitalPeriod: planet.orbital_period,
      rotationPeriod: planet.rotation_period,
      population: planet.population,
      residents: planet.residents,
      surfaceWater: planet.surface_water,
      terrain: planet.terrain,
    }
  }



}