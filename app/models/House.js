
import { AppState } from "../AppState.js"
export class House {
    constructor(data) {
        this.id = data.id
        this.bedrooms = data.bedrooms
        this.bathrooms = data.bathrooms
        this.levels = data.levels
        this.imgUrl = data.imgUrl
        this.year = data.year
        this.price = data.price
        this.description = data.description
        this.creatorId = data.creatorId
        this.creator = data.creator
    }

    get HouseTemplate() {
        return `<div class="col-md-10 elevation-5 rounded my-2">
            <div class="row">
            <div class="col-md-4 p-0">
                <img class="img-fluid"
                src=${this.imgUrl}
                alt="${this.bedrooms} ${this.bathrooms}">
            </div>
            <div class="col-md-8">
                <h1 class="text-center">${this.bedrooms} ${this.bathrooms} ${this.levels} ${this.year}</h1>
                <div class="d-flex justify-content-around">
                <span>Price: $${this.price}</span>
                <span>Engine Type: ${this.price}</span>
                </div>
                <p>${this.description}</p>
                <div class="d-flex align-items-center">
                
                <span>Listed By ${this.creator}</span>
                </div>
                <div class="my-3 d-flex justify-content-between">
                // this.ComputeEditButton
                // this.ComputeDeleteButton
                </div>
            </div>
            </div>
        </div>`

    }

    static CreateHouseForm() {
        return ` lets do this later  `
    }

    get EditHouseForm() {
        return ` lets do this thing later okay `
    }


    get ComputeEditButton() {
        if (AppState.account == null || AppState.account.id != this.creatorId) return ''

        return `<button class="btn btn-primary" onclick="app.HousesController.setActive('${this.id}')">Edit House ✏️</button>`
    }

    get ComputeDeleteButton() {
        if (AppState.account == null || AppState.account.id != this.creatorId)
            return ''
        return `<button class="btn btn-danger" onclick="app.HousesController.deleteHouse('${this.id}')" >Delete House 🚨</button>`
    }
}