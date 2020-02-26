import { HttpService } from './HttpService'

class MovieService extends HttpService {
    getAll() {
        return this.axios.get('/movies')
    }
}

export const movieService = new MovieService()