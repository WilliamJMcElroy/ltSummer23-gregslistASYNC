import { Pop } from "../utils/Pop.js"
import { housesService } from "../services/HousesService.js"
import { AppState } from "../AppState.js"
import { setHTML } from "../utils/Writer.js"
import { House } from "../models/House.js"
import { getFormData } from "../utils/FormHandler.js"

function _drawHouses() {
    console.log('drawing cars')
    let template = ''
    AppState.houses.forEach(house => template += house.HouseTemplate)
    setHTML('houses', template)
}

function _drawEditForm() {
    console.log('drawing houses')
    let template = ''
    AppState.houses.forEach(house => template += house.HouseTemplate)
}

export class HousesController {




    constructor() {
        console.log('checking HousesController Functionality')
        this.getHouses()
        AppState.on('houses', _drawHouses)
        AppState.on('account', _drawHouses)
        AppState.on('activeHouse', _drawEditForm)
    }
    async getHouses() {
        try {
            await housesService.getHouses()
        } catch (error) {
            Pop.error(error.message)
        }
    }

    async createHouse() {
        try {
            window.event.preventDefault()
            const form = window.event.target
            const formData = getFormData(form)
            await housesService.createHouse(formData)
            console.log('create')
            // @ts-ignore
            form.reset()
            // @ts-ignore
            bootstrap.Collapse.getOrCreateInstance('#houseFormCollapse').hide()

        } catch (error) {
            Pop.error(error.message)
        }
    }

    drawCreateForm() {
        setHTML('houseFormCollapse', House.CreateHouseForm())
    }

    setActive(houseId) {
        console.log('edit house', houseId)
        housesService.setActive(houseId)
    }

    async editHouse(houseId) {
        try {
            window.event.preventDefault()
            const form = window.event.target
            const formData = getFormData(form)
            housesService.editHouse(formData, houseId)
            console.log('editing car')
            // @ts-ignore
            form.reset()
            // @ts-ignore
            bootstrap.Collapse.getOrCreateInstance('#houseFormCollapse').hide()
        } catch (error) {
            Pop.error(error.message)
        }
    }
    async deleteHouse(carId) {
        try {
            console.log('delete', carId)
            if (await Pop.confirm('Are you sure you want to remove this car?')) {
                housesService.deleteHouse(carId)
            }

        } catch (error) {
            Pop.error(error.message)
        }
    }

}



