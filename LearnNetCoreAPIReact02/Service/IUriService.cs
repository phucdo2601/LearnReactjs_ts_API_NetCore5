using LearnNetCoreAPIReact02.Dtos.Pagination;
using System;

namespace LearnNetCoreAPIReact02.Service
{
    public interface IUriService
    {
        public Uri GetPageUri(PaginationParams filter, string route);
    }
}
