import React, { useEffect, useRef, useState } from 'react';

//css
import styled from "styled-components"
import Header from '../../components/header/header';

// img
import Gradient from "../../img/intro/gradient.png";

import serverController from '../server/serverController';

const SelectArea = (props) => {
    
    const [isClick, setIsClick] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [listData, setListData] = useState([]);


    useEffect(() => {  serverController.connectFetchController('locations',"GET",null,function(res){
        setListData(res.data.locations);
    },null);  }, [])

    // 리스트 클릭 
    const onClickList = (index) =>{
        setCurrentIndex(index);
        if(currentIndex == index){
            setIsClick(false);
            setCurrentIndex(null);
        }else{
            setIsClick(true);
        }
    }

    // 시작 버튼 클릭
    const onClickStart = (item) =>{
        reactNativeSelectArea("tab");
    }
    // 로그인 버튼 클릭
    const onClickLogin = (item) =>{
        reactNativeSelectArea("tab");
    }

    const reactNativeSelectArea = (navi) =>{
        window.ReactNativeWebView.postMessage(JSON.stringify({ type:"area", data:currentIndex ,navi :navi}));
    }

    return(
        <ContentsWrap>
            {/* <Header /> */}
            {/* 리스트 */}
            <ListWrap>
            {
                listData.map((item, index) => {
                    return(
                        <ListEl
                        onClick={() => onClickList(item.no)}
                        className={index==currentIndex&&"selected"}
                        style={{marginTop:`${index==0?"22px":0}`}}
                        key={index}
                        >
                        {item.fullname}
                        </ListEl>
                    )
                })
            }
            </ListWrap>
            {/* 그라데이션 */}
            <GradientImg src={Gradient} alt="그라데이션 이미지"/>
            {/* 버튼 */}
            <BtnWrap>
                <StartBtn isClick={isClick} onClick={() => onClickStart()}>그린 코인 시작하기!</StartBtn>
                <LoginBtn isClick={isClick} onClick={() => onClickLogin()}>그린 코인 로그인</LoginBtn>
            </BtnWrap>
        </ContentsWrap>
    )
};

export default SelectArea;

const ContentsWrap = styled.div`
    margin-top:133px;
    margin-bottom:80px;
    overflow-x: hidden;
`
// 리스트
const ListWrap = styled.ul`
    width:100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &>.selected{
        background-color: #66D8B9;
        color:#fff;
    }
`
const ListEl = styled.li`
    width: 100%;
    padding: 22px 0;
    text-align: center;
    font-size: 15px;
    font-weight: 500;
`

// 그라데이션
const GradientImg = styled.img`
    width: 100vw;
    height: calc(100vw*(341/438));
    position: fixed;
    bottom: 0;
    left: 0;
    pointer-events: none;
`

// 버튼
const BtnWrap = styled.div`
    position: fixed;
    bottom: calc(100vw*(30/428));
    margin: 0 13px;
    & > button{
        font-size: calc(100vw*(20/428));
        font-weight: 700;
        font-family: "Nanum Gothic";
        width: calc(100vw*(403/428));
        height: calc(100vw*(66/428));
        border-radius: 10px;
    }
`
const StartBtn = styled.button`
    border: 3px solid #F8F7F7;
    color:#FFFFFF;
    margin-bottom: 5px;
    
    ${({isClick})=>{
    return isClick?
    `
    background-color: #66D8B9;
    `
    :
    `
    background-color: #BFBFBF;
    `
    }}
`
const LoginBtn = styled.button`
    background-color: #FFFFFF;
    ${({isClick})=>{
    return isClick?
    `
    border: 3px solid #66D8B9;
    color:#66D8B9;
    `
    :
    `
    border: 3px solid #BFBFBF;
    color:#BFBFBF;
    `
    }}
`