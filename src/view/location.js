import { backendService } from "../service/backend-service.js";

export class Location {

    constructor() {
        this.currentPosition = null;
        console.log('Location instance created');
    }

    init() {
        console.log('Initializing location...');
        backendService.getCurrentPosition()
            .then(position => {
                this.currentPosition = position;
                this.render();
            })
            .catch(error => {
                console.error('Error initializing location:', error);
            });
    }

    render() {
        console.log(`Current Position: x=${this.currentPosition.x}, y=${this.currentPosition.y}`);
    }
}