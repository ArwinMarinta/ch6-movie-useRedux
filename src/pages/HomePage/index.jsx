import { useEffect, useState } from "react";
// import { axiosInstance } from "../../lib/axios";
import HomeSkeleton from "./skeleton";
import CarauselSection from "./section/CarauselSection";
import CardMovie from "../../components/CardMovie";
import Navbar from "../../components/Navbar";
// import { useSearch } from "../../contexts/SearchContext";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovie } from "../../redux/actions/movieActions";

const HomePage = () => {
  const dispatch = useDispatch();
  const [carauselMovieList, setCarauselMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { popular } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(getPopularMovie(setCarauselMovieList, setIsLoading));
  }, [dispatch, setCarauselMovieList, setIsLoading]);

  return (
    <>
      <Navbar />
      <div className=" bg-slate-950 text-white">
        {isLoading ? (
          <HomeSkeleton />
        ) : (
          <>
            <CarauselSection carauselMovieList={carauselMovieList} />
            <section className="container  py-10">
              <h1 className="pb-4 text-2xl font-bold">Popular Movies</h1>
              <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
                {popular.map((movie) => (
                  <CardMovie key={movie.id} movie={movie} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
