import { api } from "./AxiosService.js"
import { House } from "../models/House.js"
import { AppState } from "../AppState.js"
class HousesService {

    async getHouses() {
        const response = await api.get('api/houses')
        const mappedHouses = response.data.map(dataObj => new House(dataObj))
        AppState.houses = mappedHouses
    }

    async createHouse(formData) {
        const res = await api.post('api/cars', formData)
        console.log(res.data, 'CREATING HOUSE')
        const newHouse = new House(res.data)
        AppState.houses.push(newHouse)
        AppState.emit('houses')
    }

    setActive(houseId) {
        let house = AppState.houses.find(house => house.id == houseId)
        AppState.activeHouse = house
        console.log(AppState.activeCar)
    }

    async editHouse(formData, houseId) {

    }

    async deleteHouse(houseId) {
        const res = await api.delete(`api/cars/${houseId}`)
        console.log(res.data, 'DELETING HOUSE')
        const filteredArray = AppState.houses.filter(house => house.id != houseId)
        AppState.houses = filteredArray
    }

}

export const housesService = new HousesService()