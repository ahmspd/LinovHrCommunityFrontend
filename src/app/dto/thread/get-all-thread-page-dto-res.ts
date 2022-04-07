import { GetThreadDataDtoRes } from "./get-thread-data-dto-res"

export class GetAllThreadPageDtoRes {
    total? : number
    data? : GetThreadDataDtoRes[]
}