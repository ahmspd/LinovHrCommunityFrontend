import { Byte } from "@angular/compiler/src/util"
import { GetCategoryDetailByEventCourseDtoRes } from "../category-detail/get-category-detail-by-event-course-dto-res"

export class GetAllEventCourseDtoDataRes { 
	 id?: string 
	 contents?: string 
	 title?: string 
	 type?: string 
	 eventCourseLocation?: string 
	 price?: BigInteger 
	 dateStart?: string 
	 dateEnd?: string 
	 timeStart?: string 
	 timeEnd?: string 
	 idFile?: string 
	 fileExtensions?: string 
	 fileContents?: Byte[] 
	 dataCategoryDetail?: GetCategoryDetailByEventCourseDtoRes[] 
	 createdBy?: string 
	 fullName?: string 
	 createdAt?: string 
	 version?: number 
	 isActive?: boolean 
	 isJoin?: boolean
} 

