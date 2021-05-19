
// react
import React, { useEffect, useState } from 'react';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';


//css
import styled from "styled-components"

// contents
import Header from '../../components/header/header';
import Navbar from '../../components/navbar/navbar';


//img
import Campaign from '.././../img/community/campaign@3x.png'
import Write from '.././../img/community/write@3x.png'

SwiperCore.use([Navigation]);
const Community = (props) => {
    // 페이지 작업 중단......
    
    return(
        <ContentsWrap>
            <Header />
            {/* 이미지 슬라이더부분 작동x */}
            <SwipeWrap>
                <Swiper
                    spaceBetween={5}
                    slidesPerView={1}
                    loop={false}
                    autoplay={false}
                    navigation={{ clickable: true }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                  >
                    <SwiperSlide>
                        <CampaignImg src={Campaign} alt="img"/>
                    </SwiperSlide>
                  </Swiper>
            </SwipeWrap>

            <WriteWrap>
                <WriteImg src={Write} alt="img"/>
                <WtiteTextWrap>
                    <WriteDesc>환경을지키기 위한 당신의 생각을<br />마음껏 적어주세요!</WriteDesc>
                    <WriteBtn>글쓰기</WriteBtn>
                </WtiteTextWrap>
            </WriteWrap>


            <Navbar crtIndex={2}/>
        </ContentsWrap>
    )
};

export default Community;

const ContentsWrap = styled.div`
    margin-top:133px;
    margin-bottom:80px;
`
const SwipeWrap = styled.div`
    width:100%;
    background-color:#454545;
    height: calc(100vw * (181/438));
`
const CampaignImg = styled.img`
    width:100%;
    height: 100%;
`
const WriteWrap = styled.div`
    border:1px solid #EDEDED;
    border-radius:calc(100vw * (10/438));
    margin: calc(100vw * (30/438)) calc(100vw * (15/438)) 0 ;
    display:flex;
    padding:0 calc(100vw * (30/438));
`
const WriteImg = styled.img`
    margin: calc(100vw * (5/438)) calc(100vw * (30/438)) calc(100vw * (5/438)) 0;
    width: calc(100vw * (155/438));
`
const WtiteTextWrap = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
`
const WriteDesc = styled.p`
    font-size:calc(100vw * (10/438));
    text-align:center;
    margin-bottom:calc(100vw * (10/438));
`
const WriteBtn = styled.button`
    background-color:#66D8B9;
    width:calc(100vw * (85/438));
    height:calc(100vw * (30/438));
    font-size:calc(100vw * (10/438));
    color:#fff;
    border-radius:calc(100vw * (15/438));
`