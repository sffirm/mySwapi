export default class SwapiDB {

  constructor() {
    this.apiLink = 'https://swapi.co/api';
  }

  getIdLink(link) {
    const idRegExp = /\/([0-9]*)\/$/;
    return link.match(idRegExp)[1];
  }

  getShortData(data, category) {
    const dataName = {};
    if (data.title) {
      dataName.title = data.title;
    }
    if (data.name) {
      dataName.name = data.name;
    }
    return {
      url: data.url,
      id: this.getIdLink(data.url),
      category,
      ...dataName
    }
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
          resolve(fetch(url));
        } catch (error) {
          reject(error);
        }
      });
    };

    return Promise.all(urls.map(url => request(url)
      .then(data => {
        return data.json();
      })
      .catch(data => {
        throw new Error(`No data was found at ${url}, received ${data.status}`);
      })
    ))
  }

  async getAllPeople() {
    const result = await this.getResource(`/people/`);

    const request = (item) => {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.transformPerson(item));
        } catch (error) {
          reject(error);
        }
      });
    };

    const results = await Promise.all(result.results.map(item => request(item)
      .then(data => {
        return data;
      })
      .catch(data => {
        throw new Error(`${data.status}`);
      })
    ))

    return await results;
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
    let films = await this.fetchUrls(person.films);
    let starships = await this.fetchUrls(person.starships);
    let species = await this.fetchUrls(person.species);
    let vehicles = await this.fetchUrls(person.vehicles);
    const homeWorld = await this.fetchUrls([person.homeworld]);
    films = films.map((item) => {
      return this.getShortData(item, 'films');
    });
    starships = starships.map((item) => {
      return this.getShortData(item, 'starships');
    });
    species = species.map((item) => {
      return this.getShortData(item, 'species');
    });
    vehicles = vehicles.map((item) => {
      return this.getShortData(item, 'vehicles');
    });
    return {
      name: person.name,
      id: this.getIdLink(person.url),
      details: [{
          value: person.name,
          title: 'Name'
        },
        {
          value: person.birth_year,
          title: 'Birth Year'
        },
        {
          value: person.gender,
          title: 'Gender'
        },
        {
          value: person.height,
          title: 'Height'
        },
        {
          value: person.mass,
          title: 'Weight'
        },
        {
          value: person.eye_color,
          title: 'Eye Color'
        },
        {
          value: person.hair_color,
          title: 'Hair Color'
        },
        {
          value: person.skin_color,
          title: 'Skin Color'
        },
        {
          value: homeWorld,
          title: 'Home World'
        },
        {
          value: films,
          title: 'Films'
        },
        {
          value: vehicles,
          title: 'Vehicles'
        },
        {
          value: starships,
          title: 'Starships'
        },
        {
          value: species,
          title: 'Species'
        },
      ]
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