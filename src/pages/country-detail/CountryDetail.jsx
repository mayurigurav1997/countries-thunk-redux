import "./country-detail.css";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { searchByCode } from '../../features/countries/countriesAction'
import { reset } from '../../features/countries/countriesSlice'

const CountryDetail = () => {
  const { loading, success, error, countrySearch } = useSelector((state) => state.country)
  const dispatch = useDispatch()
  const { code } = useParams()
  console.log(code, "code")
  useEffect(() => {
    if (code) {
      dispatch(searchByCode(code.toLowerCase()))
    }
    else {
      console.log(error)
    }
    return () => {
      dispatch(reset())
    }
  }, [dispatch, code, error])
  return (
    <section className="country-detail-container">
      <Link className="back-button" to="/">
        <i className="fa-solid fa-arrow-left"></i> Back
      </Link>

      <div className="country-detail-content">
        {countrySearch.length > 0 ?
          <>
            <img src={countrySearch[0].flags.png} alt={countrySearch[0].flags.alt} className="country-detail-image" />

            <div className="country-detail-right">
              <h1>{countrySearch[0].name.common}</h1>
              <div className="details">
                <div className="detail-left">
                  <p>
                    Offcial Name: <span>{countrySearch[0].name.official}</span>
                  </p>
                  <p>
                    Population: <span>{countrySearch[0].population}</span>
                  </p>
                  <p>
                    Region: <span>{countrySearch[0].region}</span>
                  </p>

                  <p>
                    Sub Region: <span>{countrySearch[0].subregion}</span>
                  </p>
                  <p>
                    Capital: <span>{countrySearch[0].capital}</span>
                  </p>
                </div>

                <div className="detail-right">
                  <p>
                    Top Level Domain: <span>{countrySearch[0].tld[0]}</span>
                  </p>
                  <p>
                    Currencies:
                    <span>{Object.values(countrySearch[0].currencies).map(item => { return item.name }).join(",")}</span>
                  </p>

                  <p>
                    Languages:
                    <span>{Object.values(countrySearch[0].languages).map(item => item).join(",")}</span>
                  </p>
                </div>
              </div>

              <div className="border">
                <p>Border Countries:</p>
                {countrySearch[0].borders ?
                  (
                    countrySearch[0].borders.map((item, index) => {
                      return (
                        <Link className="border-name" to={`/${item}`} key={index}>
                          <p>{item}</p>
                        </Link>
                      )
                    })
                  ) : <span>No Borders</span>}
              </div>
            </div>
          </> : <div> No Details Found</div>}

      </div>
    </section>
  );
};

export default CountryDetail;
