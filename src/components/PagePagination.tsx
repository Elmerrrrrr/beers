import Pagination from "react-bootstrap/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { BeerInfoState, setPage } from "../redux/beerSlice";
import { MAX_PER_PAGE, TOTAL_AMOUNT_BEERS } from "../constants/constants";
import "../scss/styles.scss";

const PagePagination: React.FC = (): JSX.Element => {
  const state: BeerInfoState = useSelector(
    (state: RootState) => state.allBeers
  );
  const dispatch = useDispatch<AppDispatch>();

  const amountOfPages = Math.ceil(TOTAL_AMOUNT_BEERS / MAX_PER_PAGE);
  let items: any[] = [];
  for (let number = 1; number <= amountOfPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === state.page}
        onClick={() => goToPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const goToPage = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
  };

  const goToPrevPage = () => {
    const prevPage = state.page - 1;
    if (prevPage > 0) {
      dispatch(setPage(prevPage));
      return;
    }
  };

  const goToNextPage = () => {
    const nextPage = state.page + 1;
    if (nextPage <= amountOfPages) {
      dispatch(setPage(nextPage));
      return;
    }
  };

  const amountToShow = 7;
  let startIndex = state.page - 1;
  if (startIndex > 0 && startIndex <= 4) {
    startIndex = 0;
  }
  if (startIndex > 0 && startIndex > 4) {
    startIndex = state.page - 4;
  }
  if (startIndex >= amountOfPages - amountToShow) {
    startIndex = amountOfPages - amountToShow;
  }
  const endIndex = startIndex + amountToShow;

  return (
    <Pagination
      className="d-flex justify-content-center mb-5"
      bsPrefix="custom-pagination"
    >
      <Pagination.First onClick={() => goToPage(1)} />
      <Pagination.Prev onClick={() => goToPrevPage()} />
      {items
        .filter((_item, index) => index >= startIndex && index < endIndex)
        .map((item) => item)}
      <Pagination.Next onClick={() => goToNextPage()} />
      <Pagination.Last onClick={() => goToPage(amountOfPages)} />
    </Pagination>
  );
};

export default PagePagination;
