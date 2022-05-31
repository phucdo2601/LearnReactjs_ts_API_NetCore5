using System;

namespace LearnNetCoreAPIReact02.Wrapper
{
    public class PagedResponse<T> : Response<T>
    {
        public int PageNumber { get; set; } 
        public int PageSize { get; set; }
        public Uri FirstPage { get; set; }
        public Uri LastPage { get; set; }
        public int TotalPages { get; set; }
        public int TotalRecords { get; set; }
        public Uri NextPage { get; set; }
        public Uri PreviousPage { get; set; }
        public int FirstPageNum { get; set; }   
        public int LastPageNum { get; set; }
        public int NextPageNum { get; set; }    
        public int PreviousPageNum { get; set; }    

        public PagedResponse(T data, int pageNumber, int pageSize)
        {
            this.PageNumber = pageNumber;
            this.PageSize = pageSize;
            this.Data = data;
            this.Message = null;
            this.Succeeded = true;
            this.Errors = null;
        }

        public PagedResponse(T data, int pageNumber, int pageSize, int totalRecords)
        {
            this.PageNumber = pageNumber;
            this.PageSize = pageSize;
            this.Data = data;
            this.TotalPages = totalRecords;
            this.Message = null;
            this.Succeeded = true;
            this.Errors = null;
        }

    }
}
