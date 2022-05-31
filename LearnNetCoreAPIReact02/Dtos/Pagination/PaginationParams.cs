namespace LearnNetCoreAPIReact02.Dtos.Pagination
{
    public class PaginationParams
    {
        private const int _maxItemsPerpPage = 50;
        private int itemsPerPage;

        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public PaginationParams()
        {
            this.PageNumber = 1;
            this.PageSize = _maxItemsPerpPage;
        }
        public PaginationParams(int pageNumber, int pageSize)
        {
            this.PageNumber = pageNumber < 1 ? 1 : pageNumber;
            this.PageSize = pageSize > _maxItemsPerpPage ? _maxItemsPerpPage : pageSize;
        }
    }
}
