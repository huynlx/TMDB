import React, { useEffect } from 'react';
import { embedMovie } from '../constants/GlobalConstants';
import Top from '../components/PeoplePage/Top';
import '../css/Top.scss'
import "../scss/components/CastCrew.scss";
import "../scss/components/Watch.scss";
import { fetchMovie } from '../api/fetchMovie';
import { useState } from 'react';
import Footer from '../components/Footer/Footer';
import urlToSlug from './../helpers/urlSlug';
import { Link, useLocation } from 'react-router-dom';
import { handleDate } from '../components/MoviePage/functions';
import Loading from './../components/Loading/Ball-scale-multiple';
import clsx from "clsx";
import NProgress from 'nprogress';
import "../css/nprogress.css";

const StarRating = ({ stars = 0, maximum, extraText = "" }) => {
    return (
        <div>
            {new Array(maximum).fill("").map((_, index) => (
                <span key={index} className={`${index < stars ? "text-warning" : "text-muted"}`}>
                    &#9733;
                </span>
            ))}
            <span>{extraText}</span>
        </div>
    );
};

const Watch = (props) => {
    const id = props.match.params.id;
    const [first, setFirst] = useState(true);
    const title = props.match.params.title;
    const [movie, setMovie] = useState(null);
    const [top, setTop] = useState(null);
    const { pathname } = useLocation();
    const type = pathname.includes('movie') ? "movie" : "tv";

    const data = {
        id, title
    }

    useEffect(() => {
        NProgress.configure({ showSpinner: false });
        NProgress.configure({ trickleRate: 0.1, trickleSpeed: 100 });
        !first && NProgress.start();
        fetchMovie(id).then((res) => {
            setTop({
                title: res.title,
                poster_path: res.poster_path,
                date: res.release_date
            });
            setMovie(res);
            setFirst(false);
            NProgress.done();
        });
    }, [id])

    const linkStyle = () => {
        const root = document.documentElement;
        // console.log(root.style.getPropertyValue("--theme")); //root.style.getPropertyValue("--theme") đéo work
        if (document.getElementsByTagName("HTML")[0].getAttribute("data-theme") === "light") {
            root.style.setProperty("--bgGenre", "black");
            root.style.setProperty("--colorGenre", "white");
        } else {
            root.style.setProperty("--bgGenre", "white");
            root.style.setProperty("--colorGenre", "black");
        }
    }

    console.log(movie);
    return movie && (
        <>
            <Top data={data} url={top} />
            <div className='main'>
                <div id='watch'>
                    <div className='container background-primary' >
                        <div className='row row mt-3 mt-lg-0'>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-9">
                                <div className='w-100 video position-relative'>
                                    {
                                        <Loading />
                                    }
                                    {
                                        <iframe id='myIframe' className={clsx('holds-the-iframe responsive-iframe')} frameBorder="0" src={embedMovie(id)} allowFullScreen></iframe>
                                    }
                                </div>
                                <div className='infoWatch mt-3'>
                                    <h3 className=' font-weight-bold'>{movie.title}</h3>
                                    <ul>
                                        {
                                            movie.genres.map(genre => <Link to={{
                                                pathname: `/genre/${genre.id}-${urlToSlug(genre.name)}/${type}`,
                                                query: {
                                                    name: genre.name,
                                                }
                                            }} className='mr-2 genre' style={linkStyle()}>{genre.name}</Link>)
                                        }
                                    </ul>
                                    <p>{movie.overview}</p>
                                    <p>Release Date: {handleDate(movie.release_date)}</p>
                                    <StarRating maximum={10} stars={Math.round(movie.vote_average)} extraText={` (${movie.vote_count.toLocaleString()} votes)`} />
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-3">
                                <h4 className='font-weight-bold pb-2'>Similar Movies</h4>
                                <div className='similars d-flex flex-column'>

                                    {
                                        movie.similar.results.map((item) =>
                                            <div className='item d-flex' key={item.id}>
                                                <Link to={`/movie/${item.id + '-' + urlToSlug(item.title)}`}>
                                                    <img className='img-fluid' width={100} src={item.poster_path} alt="" />
                                                </Link>
                                                <div className='d-flex flex-column'>
                                                    <Link className='font-weight-bold' to={`/movie/${item.id + '-' + urlToSlug(item.title)}`}>{item.title}</Link>
                                                    <Link to={`/movie/${item.id + '-' + urlToSlug(item.title)}/watch`}><button className='p-2'>Watch Now</button></Link>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Watch;