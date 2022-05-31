using LearnNetCoreAPIReact02.Service;
using LearnNetCoreAPIReact02.Wrapper;
using System;
using System.Collections.Generic;

namespace LearnNetCoreAPIReact02.Dtos.Pagination
{
    public class PaginationHelper
    {
        public static PagedResponse<List<T>> CreatePagedReponse<T>(List<T> pagedData, PaginationParams validFilter, int totalRecords, IUriService uriService, string route)
        {
            var respose = new PagedResponse<List<T>>(pagedData, validFilter.PageNumber, validFilter.PageSize);
            var totalPages = ((double)totalRecords / (double)validFilter.PageSize);
            int roundedTotalPages = Convert.ToInt32(Math.Ceiling(totalPages));
            respose.NextPage =
                validFilter.PageNumber >= 1 && validFilter.PageNumber < roundedTotalPages
                ? uriService.GetPageUri(new PaginationParams(validFilter.PageNumber + 1, validFilter.PageSize), route)
                : null;
            respose.PreviousPage =
                validFilter.PageNumber - 1 >= 1 && validFilter.PageNumber <= roundedTotalPages
                ? uriService.GetPageUri(new PaginationParams(validFilter.PageNumber - 1, validFilter.PageSize), route)
                : null;
            respose.FirstPage = uriService.GetPageUri(new PaginationParams(1, validFilter.PageSize), route);
            respose.LastPage = uriService.GetPageUri(new PaginationParams(roundedTotalPages, validFilter.PageSize), route);
            respose.TotalPages = roundedTotalPages;
            respose.TotalRecords = totalRecords;
            respose.FirstPageNum = 1;
            respose.LastPageNum = roundedTotalPages;
            respose.NextPageNum = validFilter.PageNumber >= 1 && validFilter.PageNumber < roundedTotalPages ? validFilter.PageNumber + 1 : 0;
            respose.PreviousPageNum = validFilter.PageNumber - 1 >= 1 && validFilter.PageNumber <= roundedTotalPages ? validFilter.PageNumber - 1 : 0;
            return respose;
        }
    }
}
