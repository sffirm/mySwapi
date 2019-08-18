
export default class SwapiDB {

  constructor() {
    this.apiLink = 'https://swapi.co/api';
    this.getIdLink = this.getIdLink.bind(this);
    this.getShortData = this.getShortData.bind(this);
    this.getResource = this.getResource.bind(this);
    this.fetchUrls = this.fetchUrls.bind(this);
    this.getAllPeople = this.getAllPeople.bind(this);
    this.getPerson = this.getPerson.bind(this);
    this.getAllPlanets = this.getAllPlanets.bind(this);
    this.getPlanet = this.getPlanet.bind(this);
    this.getAllStarships = this.getAllStarships.bind(this);
    this.getStarship = this.getStarship.bind(this);
    this.getVehicles = this.getVehicles.bind(this);
    this.getSpecies = this.getSpecies.bind(this);
    this.getFilms = this.getFilms.bind(this);
    this.transformPerson = this.transformPerson.bind(this);
    this.transformAllPersons = this.transformAllPersons.bind(this);
    this.transformPlanet = this.transformPlanet.bind(this);
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
    const resultPeople = await this.getResource(`/people/`);
    const result = resultPeople.results.map((item) => {
      return this.transformAllPersons(item);
    })

    return await result;
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

  transformAllPersons(person) {
    return {
      name: person.name,
      gender: person.gender,
      id: this.getIdLink(person.url),
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