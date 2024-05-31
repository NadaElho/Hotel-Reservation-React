import ReactPaginate from 'react-paginate';

const Pagination = ({handlePageClick, pageCount}) => {
    
  return (
    <div>
        <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
    />
    </div>
  )
}

export default Pagination