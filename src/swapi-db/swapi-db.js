export default class SwapiDB {

  constructor() {
    this.apiLink = 'https://swapi.co/api';
  }

  async getResource(url) {
    const result = await fetch(`${this.apiLink}${url}`);
    if (!result.ok) {
      throw new Error(`No data was found at ${url}, received ${result.status}`);
    }
    return await result.json();
  }

  async getAllPeople() {
    const result = await this.getResource(`/people/`);
    return result.results;
  }

  getPerson(id) {
    return this.getResource(`/people/${id}/`);
  }

  async getAllPlanets() {
    const res = await this.getResource(`/planets/`);
    return result.results;
  }

  getPlanet(id) {
    return this.getResource(`/planets/${id}/`);
  }

  async getAllStarships() {
    const result = await this.getResource(`/starships/`);
    return result.results;
  }

  getStarship(id) {
    return this.getResource(`/starships/${id}/`);
  }




}