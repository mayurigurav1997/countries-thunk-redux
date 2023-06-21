import { useState, useEffect } from "react";
import "./filter.css";
import { useDispatch } from "react-redux";
import { reset, setRegion } from "../../../features/countries/countriesSlice";

const Filter = () => {
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"]
  const [filter, setFilter] = useState("")
  const [displayDropDown, setDisplayDropDown] = useState(false)
  const handleDropDown = () => {
    setDisplayDropDown(!displayDropDown)
  }
  const dispatch = useDispatch();

  useEffect(() => {
    if (filter !== "") {
      dispatch(setRegion(filter.toLowerCase()))
    }
    return () => {
      dispatch(reset())
    }
  }, [dispatch, filter])
  return (
    <section className="filter-container">
      <div className="filter" onClick={handleDropDown}>
        <input
          type="text"
          readOnly
          placeholder="Filter by Region"
          value={filter}
          className="filter-input"
        />

        <i className="fa-solid fa-angle-down"></i>
      </div>
      {
        displayDropDown ? (
          <div className="dropdown">
            {regions.map((item, index) => {
              return (
                <div div className="dropdown-item" key={index}
                  onClick={() => {
                    setFilter(item);
                    handleDropDown()
                  }}>{item}</div>
              )
            })}
          </div>
        ) : null
      }
    </section >
  );
};

export default Filter;
