import { useEffect, useState } from "react";
import { projectApi } from "../api/projectApi";
import type { Project } from "../types";
export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        projectApi.getProjects()
            .then((res) => {
                setProjects(res.data.data);
            })
            .catch((error) => {
                console.error("Project loading error:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    return {
        projects,
        loading
    };
};