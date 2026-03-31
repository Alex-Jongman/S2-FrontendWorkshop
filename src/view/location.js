import { backendService } from "../service/backend-service.js";

export class Location {

    constructor() {
        this.currentPosition = null;
        this.mapData = null;
    }

    init() {
        console.log('Initializing location...');
        backendService.getCurrentPosition()
            .then(position => {
                this.currentPosition = position;
            })
            .then(() => {
                // currentPosition is now set, we can fetch the map data for that position
                backendService.getMapData(this.currentPosition.y, this.currentPosition.x)
                    .then((mapData) => {
                        // mapData is now available, we can store it in this instance and render the view
                        this.mapData = mapData;
                        this.render();
                    })
                    .catch(error => {
                        console.error('Error fetching map data:', error);
                    });
            })
            .catch(error => {
                console.error('Error initializing location:', error);
            });
    }

    render() {
        console.log(`Rendering location at (${this.currentPosition.x}, ${this.currentPosition.y}) with map data:`, this.mapData);
        console.log(`Mapdata type: ${typeof this.mapData}, keys: ${Object.keys(this.mapData)}`);
        console.log(`Mapdata metadata:`, this.mapData.metadata);

        const imgElement = document.querySelector('#location-image');
        imgElement.setAttribute('src', `./images/${this.mapData.metadata.photo}`);
    }
}