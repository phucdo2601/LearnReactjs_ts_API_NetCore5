using System;

namespace LearnNetCoreAPIReact02.Dtos.Pagination
{
    public class PaginationMetaData
    {
        public PaginationMetaData(int totalCount, int currentPage, int itemsPerPage)
        {
            TotalCount = totalCount;
            CurrentPage = currentPage;
            TotalPages = (int) Math.Ceiling(totalCount / (double)itemsPerPage);
        }

        public int CurrentPage { get; private set; }    
        public int TotalCount { get; private set; }
        public int TotalPages { get; private set; }
        public bool HasPrevious => CurrentPage > 1;
        public bool HasNext => CurrentPage < TotalCount; 
    }
}
