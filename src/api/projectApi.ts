import api from "../utils/api";
export const projectApi = {
    getProjects(){
        return api.get("/v1/project-list");
    }
};