
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
    this.getAllVehicles = this.getAllVehicles.bind(this);
    this.getVehicle = this.getVehicle.bind(this);
    this.getAllSpecies = this.getAllSpecies.bind(this);
    this.getSpecies = this.getSpecies.bind(this);
    this.getAllFilms = this.getAllFilms.bind(this);
    this.getFilm = this.getFilm.bind(this);
    this.transformPerson = this.transformPerson.bind(this);
    this.transformAllPersons = this.transformAllPersons.bind(this);
    this.transformPlanet = this.transformPlanet.bind(this);
    this.transformAllPlanets = this.transformAllPlanets.bind(this);
    this.transformStarship = this.transformStarship.bind(this);
    this.transformAllStarships = this.transformAllStarships.bind(this);
    this.transformVehicle = this.transformVehicle.bind(this);
    this.transformAllVehicles = this.transformAllVehicles.bind(this);
    this.transformSpecies = this.transformSpecies.bind(this);
    this.transformAllSpecies = this.transformAllSpecies.bind(this);
    this.transformFilm = this.transformFilm.bind(this);
    this.transformAllFilms = this.transformAllFilms.bind(this);
    this.getAllBasic = this.getAllBasic.bind(this);
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

  async getAllBasic(methodName, rout, url) {
    let resultItem;
    if (url) {
      resultItem = await this.fetchUrls([url]);
      resultItem = resultItem[0];
    } else {
      resultItem = await this.getResource(rout);
    }
    let data = resultItem.results.map((item) => {
      return this[methodName](item);
    })
    return {
      data,
      next: resultItem.next,
      prev: resultItem.previous,
    };
  }

  async getAllPeople(url) {
    return await this.getAllBasic('transformAllPersons', '/people/', url);
  }

  async getPerson(id) {
    const person = await this.getResource(`/people/${id}/`);
    return this.transformPerson(person);
  }

  async getAllPlanets(url) {
    return await this.getAllBasic('transformAllPlanets', '/planets/', url);
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return this.transformPlanet(planet);
  }

  async getAllStarships(url) {
    return await this.getAllBasic('transformAllStarships', '/starships/', url);
  }

  async getStarship(id) {
    const starship = await this.getResource(`/starships/${id}/`);
    return this.transformStarship(starship);
  }

  async getAllVehicles(url) {
    return await this.getAllBasic('transformAllVehicles', '/vehicles/', url);
  }

  async getVehicle(id) {
    const vehicle = await this.getResource(`/vehicles/${id}/`);
    return this.transformVehicle(vehicle);
  }

  async getAllSpecies(url) {
    return await this.getAllBasic('transformAllSpecies', '/species/', url);
  }

  async getSpecies(id) {
    const species = await this.getResource(`/species/${id}/`);
    return this.transformSpecies(species);
  }

  async getAllFilms(url) {
    return await this.getAllBasic('transformAllFilms', '/films/', url);
  }

  async getFilm(id) {
    const film = await this.getResource(`/films/${id}/`);
    return this.transformFilm(film);
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
      type: 'people'
    }
  }

  async transformPlanet(planet) {
    let residents = await this.fetchUrls(planet.residents);
    let films = await this.fetchUrls(planet.films);
    residents = residents.map((item) => {
      return this.getShortData(item, 'people');
    });
    films = residents.map((item) => {
      return this.getShortData(item, 'films');
    });
    return {
      name: planet.name,
      id: this.getIdLink(planet.url),
      details: [{
          value: planet.name,
          title: 'Name'
        },{
          value: planet.climate,
          title: 'Climate'
        },{
          value: planet.diameter,
          title: 'Diameter'
        },{
          value: films,
          title: 'Films'
        },{
          value: planet.gravity,
          title: 'Gravity'
        },{
          value: planet.orbital_period,
          title: 'Orbital period'
        },{
          value: planet.population,
          title: 'Population'
        },{
          value: residents,
          title: 'Residents'
        },{
          value: planet.rotation_period,
          title: 'Rotation Period'
        },{
          value: planet.surface_water,
          title: 'Surface Water'
        },{
          value: planet.terrain,
          title: 'Terrain'
        }
      ]
    }
  }

  transformAllPlanets(planet) {
    return {
      name: planet.name,
      climate: planet.climate,
      id: this.getIdLink(planet.url),
      type: 'planets'
    }
  }

  async transformStarship(starship) {
    let films = await this.fetchUrls(starship.films);
    let pilots = await this.fetchUrls(starship.pilots);
    films = films.map((item) => {
      return this.getShortData(item, 'films');
    });
    pilots = pilots.map((item) => {
      return this.getShortData(item, 'peoples');
    });
    return {
      name: starship.name,
      id: this.getIdLink(starship.url),
      details: [{
          value: starship.name,
          title: 'Name',
        },{
          value: starship.MGLT,
          title: 'MGLT',
        },{
          value: starship.cargo_capacity,
          title: 'Cargo Capacity',
        },{
          value: starship.consumables,
          title: 'Consumables',
        },{
          value: starship.cost_in_credits,
          title: 'Cost In Credits',
        },{
          value: starship.crew,
          title: 'Crew',
        },{
          value: starship.hyperdrive_rating,
          title: 'Hyperdrive Rating',
        },{
          value: starship.manufacturer,
          title: 'Manufacturer',
        },{
          value: starship.max_atmosphering_speed,
          title: 'Max Atmosphering Speed',
        },{
          value: starship.model,
          title: 'Model',
        },{
          value: starship.passengers,
          title: 'Passengers',
        },{
          value: films,
          title: 'Films',
        },{
          value: pilots,
          title: 'Pilots',
        },{
          value: starship.starship_class,
          title: 'Starship Class',
        }
      ]
    }
  }

  transformAllStarships(starship) {
    return {
      name: starship.name,
      length: starship.length,
      id: this.getIdLink(starship.url),
      type: 'starships'
    }
  }

  async transformVehicle(vehicle) {
    let films = await this.fetchUrls(vehicle.films);
    let pilots = await this.fetchUrls(vehicle.pilots);
    films = films.map((item) => {
      return this.getShortData(item, 'films');
    });
    pilots = pilots.map((item) => {
      return this.getShortData(item, 'people');
    });
    return {
      name: vehicle.name,
      id: this.getIdLink(vehicle.url),
      details: [{
          value: vehicle.name,
          title: 'Name',
        },{
          value: vehicle.cargo_capacity,
          title: 'Cargo Capacity',
        },{
          value: vehicle.consumables,
          title: 'Consumables',
        },{
          value: vehicle.cost_in_credits,
          title: 'Cost in Credits',
        },{
          value: vehicle.crew,
          title: 'Crew',
        },{
          value: vehicle.length,
          title: 'Length',
        },{
          value: vehicle.manufacturer,
          title: 'Manufacturer',
        },{
          value: vehicle.max_atmosphering_speed,
          title: 'Max Atmosphering Speed',
        },{
          value: vehicle.model,
          title: 'Model',
        },{
          value: vehicle.passengers,
          title: 'Passengers',
        },{
          value: pilots,
          title: 'Pilots',
        },{
          value: films,
          title: 'Films',
        },{
          value: vehicle.vehicle_class,
          title: 'Vehicle Class',
        }
      ]
    }
  }

  transformAllVehicles(vehicle) {
    return {
      name: vehicle.name,
      length: vehicle.length,
      id: this.getIdLink(vehicle.url),
      type: 'vehicles'
    }
  }

  async transformSpecies(species) {
    let films = await this.fetchUrls(species.films);
    let people = await this.fetchUrls(species.people);
    people = people.map((item) => {
      return this.getShortData(item, 'people');
    });
    films = films.map((item) => {
      return this.getShortData(item, 'films');
    });
    const homeworld = await this.fetchUrls([species.homeworld]);
    return {
      name: species.name,
      id: this.getIdLink(species.url),
      details: [{
          value: species.name,
          title: 'Name',
        },{
          value: species.average_height,
          title: 'Average Height',
        },{
          value: species.average_lifespan,
          title: 'Average Lifespan',
        },{
          value: species.classification,
          title: 'Classification',
        },{
          value: species.designation,
          title: 'Designation',
        },{
          value: species.eye_colors,
          title: 'Eye Colors',
        },{
          value: species.skin_colors,
          title: 'Skin Colors',
        },{
          value: species.hair_colors,
          title: 'Hair Colors',
        },{
          value: homeworld,
          title: 'Homeworld',
        },{
          value: species.language,
          title: 'Language',
        },{
          value: people,
          title: 'People',
        },{
          value: films,
          title: 'Films',
        }
      ]
    }
  }

  transformAllSpecies(species) {
    return {
      name: species.name,
      skinColor: species.skin_colors,
      id: this.getIdLink(species.url),
      type: 'species'
    }
  }

  async transformFilm(film) {
    let characters = await this.fetchUrls(film.characters);
    let starships = await this.fetchUrls(film.starships);
    let species = await this.fetchUrls(film.species);
    let vehicles = await this.fetchUrls(film.vehicles);
    let planets = await this.fetchUrls(film.planets);
    characters = characters.map((item) => {
      return this.getShortData(item, 'people');
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
    planets = planets.map((item) => {
      return this.getShortData(item, 'planets');
    });
    return {
      name: film.title,
      id: this.getIdLink(film.url),
      details: [{
          value: film.title,
          title: 'Title'
        },{
          value: film.director,
          title: 'Director'
        },{
          value: film.producer,
          title: 'Producer'
        },{
          value: film.release_date,
          title: 'Release Date'
        },{
          value: characters,
          title: 'Characters'
        },{
          value: planets,
          title: 'Planets'
        },{
          value: species,
          title: 'Species'
        },{
          value: starships,
          title: 'Starships'
        },{
          value: vehicles,
          title: 'Vehicles'
        }
      ]
    }
  }

  transformAllFilms(film) {
    return {
      name: film.title,
      releaseDate: film.release_date,
      id: this.getIdLink(film.url),
      type: 'films'
    }
  }



}