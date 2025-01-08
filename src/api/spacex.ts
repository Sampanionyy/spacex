import axios from 'axios';

const API_URL = 'https://api.spacexdata.com/v5/launches';

export interface Launch {
    id: string;
    name: string;
    date_utc: string;
    success: boolean;
    details: string | null;
    links: {
        article: string | null;
        youtube_id: string | null;
        patch: {
        small: string | null;
        large: string | null;
        };
    };
    rocket: string;
    payloads: string[];
}

// Récupère le prochain lancement
export const fetchNextLaunch = async (): Promise<Launch> => {
    const response = await axios.get<Launch>(`${API_URL}/next`);
    return response.data;
};

// Récupère les lancements précédents
export const fetchPastLaunches = async (): Promise<Launch[]> => {
    const response = await axios.get<Launch[]>(`${API_URL}/past`);
    return response.data;
};
