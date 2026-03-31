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
        // Debugging info
        console.log(`Rendering location at (${this.currentPosition.x}, ${this.currentPosition.y}) with map data:`, this.mapData);
        console.log(`Mapdata type: ${typeof this.mapData}, keys: ${Object.keys(this.mapData)}`);
        console.log(`Mapdata metadata:`, this.mapData.metadata);

        // Update the Title
        const titleElement = document.querySelector('.location-title');
        titleElement.textContent = `${this.mapData.metadata.name} (${this.currentPosition.x}, ${this.currentPosition.y})`;

        // Update the Image
        const imgElement = document.querySelector('#location-image');
        imgElement.setAttribute('src', `./images/${this.mapData.metadata.photo}`);
        imgElement.setAttribute('alt', `Location at (${this.currentPosition.x}, ${this.currentPosition.y})`);

        // Enable/Disable Navigation Buttons
        const northWestButton = document.querySelector('#north-west');
        const northButton = document.querySelector('#north');
        const northEastButton = document.querySelector('#north-east');
        const westButton = document.querySelector('#west');
        const eastButton = document.querySelector('#east');
        const southWestButton = document.querySelector('#south-west');
        const southButton = document.querySelector('#south');
        const southEastButton = document.querySelector('#south-east');

        northWestButton.disabled = !this.mapData.deelmatrix[0][0];
        northButton.disabled = !this.mapData.deelmatrix[0][1];
        northEastButton.disabled = !this.mapData.deelmatrix[0][2];
        westButton.disabled = !this.mapData.deelmatrix[1][0];
        eastButton.disabled = !this.mapData.deelmatrix[1][2];
        southWestButton.disabled = !this.mapData.deelmatrix[2][0];
        southButton.disabled = !this.mapData.deelmatrix[2][1];
        southEastButton.disabled = !this.mapData.deelmatrix[2][2];
    }
}