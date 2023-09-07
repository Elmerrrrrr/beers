import {
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  Navbar,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  BeerInfoState,
  setPage,
  setSearchValue,
  setSearchValueType,
} from "../redux/beerSlice";
import { SEARCH_TYPES } from "../constants/constants";

interface BeerHeaderProps {
  search: boolean;
}

const BeerHeader: React.FC<BeerHeaderProps> = ({ search }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const state: BeerInfoState = useSelector(
    (state: RootState) => state.allBeers
  );

  const handleSearch = (event: { target: { value: any } }) => {
    const searchTerm = event.target.value;
    dispatch(setSearchValue(searchTerm));
    dispatch(setPage(1));
  };

  const selectSearchType = (selectedValueInput: string | null) => {
    if (selectedValueInput) {
      dispatch(setSearchValueType(selectedValueInput));
      dispatch(setPage(1));
    }
  };

  let selectedValueName = SEARCH_TYPES.find(
    (type) => type.queryName === state.searchValueType
  )?.name;

  return (
    <Navbar className="bg-body-tertiary mb-5 border shadow">
      <Navbar.Brand className="custom-brand-name mx-3 ">
        <img
          alt=""
          src="/img/beer-mugs.png"
          width="33"
          height="33"
          className="d-inline-block"
        />{" "}
        Beer Info
      </Navbar.Brand>
      {search ? (
        <>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form.Group className="ms-auto">
              <Form className="d-flex">
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  onChange={handleSearch}
                />
                <DropdownButton
                  variant="info"
                  title={selectedValueName}
                  id="input-group-dropdown-1"
                  className="mx-2 text-white"
                  style={{ color: "white" }}
                  onSelect={(selectedValue) => selectSearchType(selectedValue)}
                >
                  <Dropdown.Item eventKey={SEARCH_TYPES[0].queryName}>
                    {SEARCH_TYPES[0].name}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey={SEARCH_TYPES[1].queryName}>
                    {SEARCH_TYPES[1].name}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey={SEARCH_TYPES[2].queryName}>
                    {SEARCH_TYPES[2].name}
                  </Dropdown.Item>
                </DropdownButton>
              </Form>
            </Form.Group>
          </Navbar.Collapse>
        </>
      ) : (
        <></>
      )}
    </Navbar>
  );
};

export default BeerHeader;
