import "./country.css";
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { showAllCountries, searchByRegion } from "../../features/countries/countriesAction";
import { Link } from 'react-router-dom'
import { reset } from "../../features/countries/countriesSlice"

const Country = () => {
  const { countriesData, loading, success, error, region, searchTerm } = useSelector((state) => state.country)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showAllCountries());

    if (region) {
      dispatch(searchByRegion(region))
    }
    if (error) {
      console.log(error);
    }
  }, [dispatch, error, success, region])

  const data = countriesData.filter((item) => item.name.common.toLowerCase().includes(searchTerm))
  return (
    <section className="country-container">
      {loading ? (<h1>Loading</h1>) : (
        data.length > 0 && data.map((item, index) => {
          return (
            <Link
              // onClick={() => dispatch(searchByName(item.cioc.toLowerCase()))}
              className="country-card"
              key={index}
              to={`/${item.cioc}`}
            >
              <img src={item.flags.png} alt={item.flag.alt} className="country-image" />
              <div className="country-content">
                <h3>{item.name.common} </h3>
                <p>
                  Population: <span>{item.population}</span>
                </p>
                <p>
                  Region: <span>{item.region}</span>
                </p>
                <p>
                  Capital: <span>{item.capital}</span>
                </p>
              </div>
            </Link>
          )
        })
      )}

    </section>
  );
};

export default Country;
