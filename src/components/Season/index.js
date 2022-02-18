import React, { useEffect, useState } from 'react';
import Loader from '../Loading/Loader';
import { fetchTv } from '../../api/fetchTv';
import '../../scss/components/Season.scss';
import "../../css/Top.scss";
import Top from '../TV/PeopleTvPage/Top';
import Episodes from './Episodes';
import Footer from '../Footer/Footer';
import '../../css/_icon.scss';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

const Index = ({ props }) => {
  const { id } = props.match.params;
  const navigate = useHistory();
  const { title } = props.match.params;
  const [seasonnumber, setSeasonNumber] = useState(props.match.params.seasonnumber);
  const [seasonindex, setSeasonIndex] = useState(null);
  const [dt, setDt] = useState(null);
  const [seasons, setSeasons] = useState(null);
  const data = {
    id: id,
    title: title,
    seasonnumber: seasonnumber
  }
  const url = {
    poster_path: dt ? dt.poster_path : '',
    date: dt ? dt.air_date : '',
    title: dt ? dt.name : ''
  }

  const nextSeasonNumber = () => {
    setSeasonNumber(Number(seasonnumber) + 1);
    setSeasonIndex(seasons.findIndex(item => item.season_number == seasonnumber + 1));
    navigate.push(`/tv/${id}-${title}/season/${seasonnumber + 1}`);
  }
  const prevSeasonNumber = () => {
    setSeasonNumber(Number(seasonnumber) - 1);
    setSeasonIndex(seasons.findIndex(item => item.season_number == seasonnumber - 1))
    navigate.push(`/tv/${id}-${title}/season/${seasonnumber - 1}`);
  }


  useEffect(() => {
    if (!seasons) {
      fetchTv(id).then(res => {
        setSeasons(res.seasons);
        setSeasonIndex(res.seasons.findIndex(item => item.season_number == seasonnumber))
        setDt(res.seasons.find(item => item.season_number == seasonnumber));
      });
    }
  }, [])

  useEffect(() => {
    seasons && setDt(seasons.find(item => item.season_number == seasonnumber))
  }, [seasonnumber])

  return dt ? (
    <>
      <Top data={data} url={url} />
      <div id='nav'>
        <div className='container'>
          <div className={clsx('Prev', seasonindex == 0 && 'invisible')} onClick={() => prevSeasonNumber()}>
            <span title='Previous Season' className={clsx('arrow-thin-left arrow-left')}></span>
            <span>{seasonindex != 0 ? seasons[seasonnumber - 1].name : ""}</span>
          </div>
          <div className={clsx('Next', seasonindex >= seasons.length - 1 && "invisible")} onClick={() => nextSeasonNumber()}>
            <span>{seasonindex < seasons.length - 1 ? seasons[seasonindex + 1].name : ""}</span>
            <span title='Next Season' className={clsx('arrow-thin-right arrow-right')}></span>
          </div>
        </div>
      </div>
      <div className='main' id='season'>
        <div className="container">
          <Episodes data={dt} />
        </div>
      </div>
      <Footer></Footer>
    </>
  ) : <Loader />;
};

export default Index;