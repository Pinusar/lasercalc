import {get} from "@/repository/apiClient";

export async function getAllSectors() {
    return get('sectors')
}