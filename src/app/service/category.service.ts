import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeleteByIdCategoryDtoDataRes } from "../dto/category/delete-by-id-category-dto-data-res";
import { DeleteMultipleCategoryDtoReq } from "../dto/category/delete-multiple-category-dto-req";
import { DeleteMultipleCategoryDtoRes } from "../dto/category/delete-multiple-category-dto-res";
import { GetAllCategoryPageDtoRes } from "../dto/category/get-all-category-page-dto-res";
import { GetByIdCategoryDtoRes } from "../dto/category/get-by-id-category-dto-res";
import { InsertCategoryDtoReq } from "../dto/category/insert-category-dto-req";
import { InsertCategoryDtoRes } from "../dto/category/insert-category-dto-res";
import { UpdateCategoryDtoReq } from "../dto/category/update-category-dto-req";
import { UpdateCategoryDtoRes } from "../dto/category/update-category-dto-res";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient) {
    }

    getAll(startPage : number, maxPage : number): Observable<GetAllCategoryPageDtoRes> {
        return this.http.get<GetAllCategoryPageDtoRes>(`http://localhost:1234/categories/page?start=${startPage}&max=${maxPage}`)
    }

    insert(Category: InsertCategoryDtoReq): Observable<InsertCategoryDtoRes> {
        return this.http.post<InsertCategoryDtoRes>('http://localhost:1234/categories', Category)
    }
 
    update(Category: UpdateCategoryDtoReq): Observable<UpdateCategoryDtoRes> {
        return this.http.put<UpdateCategoryDtoRes>('http://localhost:1234/categories', Category)
    }
    
    getById(id: string): Observable<GetByIdCategoryDtoRes> {
        return this.http.get<GetByIdCategoryDtoRes>(`http://localhost:1234/categories/${id}`)
    }

    deleteById(id: string): Observable<DeleteByIdCategoryDtoDataRes> {
        return this.http.delete<DeleteByIdCategoryDtoDataRes>(`http://localhost:1234/categories/${id}`)
    }

    deleteMultiple(Category: DeleteMultipleCategoryDtoReq): Observable<DeleteMultipleCategoryDtoRes> {
        return this.http.post<DeleteMultipleCategoryDtoRes>('http://localhost:1234/categories/multiple', Category)
    }
}