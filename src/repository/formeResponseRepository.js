import {get, post} from "@/repository/apiClient";

export async function latestForUser(user) {
    return get('responses/' + user)
}
export async function insert(formResponse) {
    return post('responses', formResponse)
}