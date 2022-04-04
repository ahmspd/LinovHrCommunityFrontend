import { GetCategoryDetailByThreadDtoRes } from "../category-detail/get-category-detail-by-thread-dto-res"
import { GetPollingDetailByPollingIdDto } from "../polling-detail/get-polling-detail-by-polling-id-dto"

export class GetThreadPollingDetailDtoDataRes { 
	 id?: string 
	 title?: string 
	 contents?: string 
	 idFile?: string 
	 extendions?: string 
	 contentsFile?: string 
	 threadTypeName?: string 
	 isPremium?: boolean 
	 createdAt?: string 
	 createdBy?: string 
	 fullName?: string 
	 pollingName?: string 
	 idPolling?: string 
	 dataCategoryDetail?: GetCategoryDetailByThreadDtoRes[] 
	 dataPollingDetail?: GetPollingDetailByPollingIdDto[] 
} 

