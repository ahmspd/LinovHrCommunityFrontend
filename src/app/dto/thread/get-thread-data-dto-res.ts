import { GetCategoryDetailByThreadDtoRes } from "../category-detail/get-category-detail-by-thread-dto-res"
import { GetPollingDetailByPollingIdDto } from "../polling-detail/get-polling-detail-by-polling-id-dto"
import { GetThreadDetailDataDtoRes } from "../thread-detail/get-thread-detail-data-dto-res"

export class GetThreadDataDtoRes { 
	 id?: string 
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
	 date? : string
	 like? : number
	 bookmark? : number
	 comment? : number
	 idPolling?: string
	 pollingName? : string
	 isActive? : boolean
	 dataCategoryDetail?: GetCategoryDetailByThreadDtoRes[] 
	 dataThreadComment?: GetThreadDetailDataDtoRes[] 
	 dataThreadPolling? : GetPollingDetailByPollingIdDto[]
} 

