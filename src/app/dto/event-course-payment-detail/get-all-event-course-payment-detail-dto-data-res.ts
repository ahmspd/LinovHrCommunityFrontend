import { GetIdAndPriceDtoDataRes } from "./get-id-and-price-dto-data-res"

export class GetAllEventCoursePaymentDetailDtoDataRes { 
	 id?: string 
	 idEventCourse?: string 
	 eventCourseType?: string 
	 title?: string 
	 dateStart?: string 
	 dateEnd?: string 
	 timeStart?: string 
	 timeEnd?: string 
	 price?: BigInteger
	 location?: string
	 eventPrice?: string
	 idFile?: string
	 createdAt?: string 
	 version?: number 
	 isActive?: boolean 
	 data!: GetIdAndPriceDtoDataRes
} 

