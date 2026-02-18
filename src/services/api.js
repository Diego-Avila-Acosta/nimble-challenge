import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
    baseURL: `${BASE_URL}/api`,
})

export const candidateService = {
    get: (email) => axiosClient.get(`/candidate/get-by-email?email=${email}`),
    post: (application) => axiosClient.post(`/candidate/apply-to-job`, application)
}

export const jobsService = {
    getAll: () => axiosClient.get(`/jobs/get-list`)
}