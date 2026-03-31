class BackendService {

    constructor() {
        this.backendUrl = 'http://localhost:3000';
    }

    getCurrentPosition() {
        return fetch(`${this.backendUrl}/current_position`)
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching current position:', error);
                throw error;
            });
    }
}

const backendService = new BackendService();

export { backendService };