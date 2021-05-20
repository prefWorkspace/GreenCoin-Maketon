import React, { useEffect, useRef, useState } from 'react';

//css
import styled from "styled-components"
import Header from '../../components/header/header';

// img
import list from '../../img/intro/list.png'
import list_2 from '../../img/intro/list_2.png'
import list_3 from '../../img/intro/list_3.png'
import list_4 from '../../img/intro/list_4.png'
import list_5 from '../../img/intro/list_5.png'

import listAct from '../../img/intro/listAct.png'
import list_2Act from '../../img/intro/list_2Act.png'
import list_3Act from '../../img/intro/list_3Act.png'
import list_4Act from '../../img/intro/list_4Act.png'
import list_5Act from '../../img/intro/list_5Act.png'
import serverController from '../server/serverController';


const SelectInterest = ({}) => {

    const [selectedArr, setSelectedArr] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [listData, setListData] = useState([]);


    // const listData = [
    //     {img: list, avtiveImg:listAct, title:"탄소줄이기"},
    //     {img: list_2, avtiveImg:list_2Act, title:"수질오염"},
    //     {img: list_3, avtiveImg:list_3Act, title:"쓰레기 줄이기"},
    //     {img: list_4, avtiveImg:list_4Act, title:"미세먼지"},
    //     {img: list_5, avtiveImg:list_5Act, title:"Sustainable fashion"},
    // ];
    
    useEffect(() => {  serverController.connectFetchController('pollutions',"GET",null,function(res){
        console.log(res);
        setListData(res.data.pollutions);
    },null);  }, [])

    const onClickListEl = (index) => {
        let newArr = selectedArr;
        if(newArr.includes(index)){
            newArr = newArr.filter(item => item !== index);
        }else{
            newArr.push(index);
        }

        if(newArr.length >= 3){
            setIsActive(true);
        }else{
            setIsActive(false);
        }
        setSelectedArr([...newArr]);
    }

    const clickNext = () =>{
        window.ReactNativeWebView.postMessage(JSON.stringify({
            type:"interest",
            data:selectedArr
        }));
    }

    return(
        <ContentsWrap>
            {/* <Header /> */}
            <Desc>3개 이상선택해주세요!</Desc>

            <ListWrap>
                {
                    listData.map((item, index) => {
                        console.log(item);
                        return(
                            <ListEl onClick={() => onClickListEl(item.no)} img={list}></ListEl>
                        )
                    })
                }
            </ListWrap>


            <NextBtn onClick={clickNext} isActive={isActive}>다음</NextBtn>
        </ContentsWrap>
    )
};

export default SelectInterest;

const ContentsWrap = styled.div`
    margin-top:133px;
    margin-bottom:80px;
    overflow-x: hidden;
`

const Desc = styled.p`
    font-size: 15px;
    font-weight: 500;
    margin: 13px 0 40px;
    color:#505050;
    width: 100vw;
    text-align: center;
`


const ListWrap = styled.ul`
`
const ListEl = styled.li`
    width: calc(100vw*(403/438));
    height: calc(100vw*(108/438));
    font-size: calc(100vw*(24/438));
    font-weight: 500;
    color:#fff;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
    line-height: calc(100vw*(108/438));
    margin: 0 auto calc(100vw*(10/438));
    ${({img})=>{
        if(img)
        return (`background-image: url(${img});`)
        else 
        return "";
    }}    
`
const NextBtn = styled.div`
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: calc(100vw*(105/438));
    text-align: center;
    padding-top:20px;
    ${({isActive})=>{
        return isActive?
        `
        background-color: #66D8B9;
        color:#fff;
        `
        :
        `
        background-color: #EAEAEA;
        color:#505050;
        `
    }}  
`