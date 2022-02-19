import React, { useEffect, Fragment } from 'react';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion'
import { embedMovie, imageResize, embedEpisode } from '../constants/GlobalConstants';
import Top from '../components/PeoplePage/Top';
import TopTV from '../components/TV/PeopleTvPage/Top';
import '../css/Top.scss'
import "../scss/components/CastCrew.scss";
import "../scss/components/Watch.scss";
import { fetchMovie } from '../api/fetchMovie';
import { fetchTv } from '../api/fetchTv';
import { useState } from 'react';
import Footer from '../components/Footer/Footer';
import urlToSlug from './../helpers/urlSlug';
import { Link, useLocation } from 'react-router-dom';
import { handleDate } from '../components/MoviePage/functions';
import Loading from './../components/Loading/Ball-scale-multiple';
import clsx from "clsx";
import NProgress from 'nprogress';
import "../css/nprogress.css";
import { no_poster } from '../assets';

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
	const [opened, setOpened] = useState(undefined);
	const [episode, setEpisode] = useState({
		episode: props.location.query ? props.location.query.episode : 1,
		season: props.location.query ? props.location.query.season : 0,
		indexSeason: props.location.query ? props.location.query.indexSeason : 0,
		indexEpisode: props.location.query ? props.location.query.indexEpisode : 0
	});
	const id = props.match.params.id;
	const title = props.match.params.title;
	const [movie, setMovie] = useState(null);
	const [top, setTop] = useState(null);
	const { pathname } = useLocation();
	const type = pathname.includes('movie') ? "movie" : "tv";

	const data = {
		id, title
	}

	useEffect(() => {
		NProgress.start();
		// window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		NProgress.done();
	}, [episode])

	useEffect(() => {
		NProgress.configure({ showSpinner: false });
		NProgress.configure({ trickleRate: 0.1, trickleSpeed: 100 });
		NProgress.start();
		const func = (id) => type === 'movie' ? fetchMovie(id) : fetchTv(id);
		func(id).then((res) => {
			(type == 'tv' && !props.location.query) && setEpisode({
				...episode,
				season: res.seasons[0].season_number,
				episode: res.seasons[0].episodes[0].episode_number
			})
			setTop({
				title: res.title ?? res.name,
				poster_path: res.poster_path,
				date: res.release_date ?? res.first_air_date
			});
			setMovie(res);
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

	return movie && (
		<>
			{type === 'movie' ? <Top data={data} url={top} /> : <TopTV data={data} url={top} />}
			<div className='main watch'>
				<div className='container background-primary' >
					<div className='row mt-3 mt-lg-0'>
						<div className="col-12 col-lg-9 w-100">
							<div className='w-100 video position-relative'>
								<Loading />
								<iframe id='myIframe' className={clsx('responsive-iframe w-100')} frameBorder="0" src={type == 'movie' ? embedMovie(id) : embedEpisode(id, episode.season, episode.episode)} allowFullScreen></iframe>
							</div>
							<div className='infoWatch mt-3'>
								<h4 className='mt-0 font-weight-bold'><Link to={`/${type}/${id}-${title}`}>{movie.title ?? movie.name}</Link></h4>
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
								{
									type == 'tv' && <h5>{movie.seasons[episode.indexSeason].episodes[episode.indexEpisode].name}</h5>
								}
								<p>{type === 'movie' ? movie.overview : movie.seasons[episode.indexSeason].episodes[episode.indexEpisode].overview}</p>
								<p>{type === 'movie' ? 'Release Date:' : 'Air Date:'} {handleDate(movie.release_date ?? movie.seasons[episode.indexSeason].episodes[episode.indexEpisode].air_date)}</p>
								<StarRating maximum={10} stars={Math.round(type == 'movie' ? movie.vote_average : movie.seasons[episode.indexSeason].episodes[episode.indexEpisode].vote_average)} extraText={` (${type == 'movie' ? movie.vote_count.toLocaleString() : movie.seasons[episode.indexSeason].episodes[episode.indexEpisode].vote_count.toLocaleString()} votes)`} />
							</div>
						</div>
						<div className="col-12 col-lg-3 w-100">
							{
								type === 'movie' ? (
									<>
										<h4 className='font-weight-bold pb-2'>Similar Movies</h4>
										<div className='similars d-flex flex-column pr-2'>
											{
												movie.similar.results.map((item) =>
													<div className='item d-flex' key={item.id}>
														<Link to={`/movie/${item.id + '-' + urlToSlug(item.title)}`}>
															<div className='poster'>
																<img className='img-fluid easeload' width={100} src={item.poster_path} alt="" loading='lazy'
																	onLoad={({ currentTarget }) => {
																		currentTarget.style.opacity = 1;
																		currentTarget.style.transform = currentTarget.src.includes('no_poster') && 'scale(0.5)';
																		currentTarget.style.objectFit = currentTarget.src.includes('no_poster') && 'contain';
																	}}
																/>
															</div>
														</Link>
														<div className='d-flex flex-column'>
															<Link title={item.title} className={clsx('line-clamp-2 font-weight-bold titleSimilar', id == item.id && 'text-orange')} to={`/movie/${item.id + '-' + urlToSlug(item.title)}`}>{item.title}</Link>
															<p className='mb-0'>{handleDate(item.release_date)}</p>
															<StarRating maximum={5} stars={Math.round(item.vote_average / 2)} extraText={` (${item.vote_count.toLocaleString()} votes)`} />
															<Link to={`/movie/${item.id + '-' + urlToSlug(item.title)}/watch`}><button className='p-2 mt-2'>Watch Now</button></Link>
														</div>
													</div>
												)
											}
										</div>
									</>) : (
									<>
										<h4 className='font-weight-bold pb-2' onMouseOver={({ currentTarget }) => currentTarget.style.color = '#7f7f7f'}><Link to={`/tv/${id}-${title}/seasons`}>Seasons</Link></h4>
										<div className='episodes'>
											{movie.seasons.map((item, index) => (
												<Fragment key={item.season_number}>
													<div className="season" onClick={() => (opened === item.season_number ? setOpened(undefined) : setOpened(item.season_number))}>
														<div className="image">
															<div className='h-100' style={{ backgroundColor: "#dbdbdb" }}>
																<img className="w-100 h-100" src={imageResize(item.poster_path, "w92")} alt="" loading='lazy'
																	onError={({ currentTarget }) => {
																		currentTarget.onerror = null; // prevents looping
																		currentTarget.src = no_poster;
																		currentTarget.style.transform = 'scale(0.7)';
																	}}
																	className="easeload"
																	onLoad={({ currentTarget }) => {
																		currentTarget.style.opacity = 1;
																	}}
																/>
															</div>
														</div>
														<div className="info">
															<h1 className={`font-weight-bold ${(opened === item.season_number || index == episode.indexSeason) ? "text-orange" : ""}`}>{item.name}</h1>
															<p className="mb-0">
																<span>{item.episodes.length}</span> Episode{item.episodes.length === 1 ? "" : "s"}
															</p>
															<p className='mb-0'>{handleDate(item.air_date)}</p>
														</div>
													</div>

													<AnimatePresence>
														{opened === item.season_number && (
															<motion.div initial={{ height: 0 }} animate={{ height: "auto", transition: { duration: 0.3 } }} exit={{ height: 0 }} className="drop">
																{item.episodes.map((child, index2) => (
																	<a>
																		<div key={child.episode_number} className="child" onClick={() => setEpisode({ episode: child.episode_number, season: item.season_number, indexSeason: index, indexEpisode: index2 })}>
																			<div className='img'>
																				<img src={imageResize(child.still_path, "w300")} alt="" loading='lazy'
																					onError={({ currentTarget }) => {
																						currentTarget.onerror = null; // prevents looping
																						currentTarget.src = no_poster;
																						currentTarget.style.transform = 'scale(0.5)';
																					}}
																					className="easeload"
																					onLoad={({ currentTarget }) => {
																						currentTarget.style.opacity = 1;
																						currentTarget.style.objectFit = "initial";
																					}}
																				/>
																			</div>
																			<div>
																				<p className={`font-weight-bold mb-0 ${(child.episode_number == episode.episode && index == episode.indexSeason) ? "text-orange" : ""}`}>Episode {child.episode_number}</p>
																				<p className="mb-0">{handleDate(child.air_date)}</p>
																			</div>
																		</div>
																	</a>
																))}
															</motion.div>
														)}
													</AnimatePresence>
												</Fragment>
											))}
										</div>
									</>
								)
							}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Watch;