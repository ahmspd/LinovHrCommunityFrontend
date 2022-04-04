import { GetCategoryDetailByThreadDtoRes } from "../category-detail/get-category-detail-by-thread-dto-res"
import { GetThreadDetailDataDtoRes } from "../thread-detail/get-thread-detail-data-dto-res"

export class GetLikeDtoDataRes { 
	 id?: string 
	 idThread?: string 
	 title?: string 
	 contents?: string 
	 idFile?: string 
	 extensions?: string 
	 contentsFile?: string
	 threadTypeName?: string 
	 isPremium?: boolean 
	 createdAt?: string 
	 createdBy?: string 
	 fullName?: string 
	 dataCategoryDetail?: GetCategoryDetailByThreadDtoRes[] 
	 dataThreadComment?: GetThreadDetailDataDtoRes[] 
} 

