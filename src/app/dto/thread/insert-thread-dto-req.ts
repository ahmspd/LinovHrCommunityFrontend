import { GetAllCategoryThreadDetail } from "../category/get-all-category-thread-detail"
import { InsertPollingDetailDtoReq } from "../polling-detail/insert-polling-detail-dto-req"

export class InsertThreadDtoReq { 
	 title?: string 
	 contents?: string 
	 idThreadType?: string 
	 isPremium?: boolean 
	 pollingName?: string 
	 dataPolling?: InsertPollingDetailDtoReq[] 
	 dataCategory?: GetAllCategoryThreadDetail[] 
} 

