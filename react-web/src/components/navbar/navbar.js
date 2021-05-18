import React from 'react';

//css
import styled from "styled-components"


// img
import Home from '../../img/navIcon/home@3x.png';
import Contents from '../../img/navIcon/contents@3x.png';
import Community from '../../img/navIcon/community@3x.png';
import Mypages from '../../img/navIcon/mypage@3x.png';

const Navbar = (props) => {


    const tabData = [
        {title:"홈", img: Home, select:false},
        {title:"컨텐츠", img: Contents, select:true},
        {title:"커뮤니티", img: Community, select:false},
        {title:"마이페이지", img: Mypages, select:false},
    ]

    const onClickTab= (index) => {
        console.log(index);
    }

    return (
        <NavWrap>
            {
                tabData.map((item, index) => {
                    return(
                        <TabEl key={index} onClick={() => onClickTab(index)}>
                            <TabImg src={item.img} alt="탭아이콘"/>
                            <TabTitle className={item.select?"selected":null}>{item.title}</TabTitle>
                        </TabEl>
                    )
                })
            }
        </NavWrap>
    )
};

export default Navbar;

const NavWrap = styled.div`
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    height:80px;
    background-color:#F7F7F7;
    display:flex;
    align-items:center;
    justify-content:space-around;
    z-index:999;
`
const TabEl = styled.div`
    text-align:center;
    width:25%;
    & > .selected{
        color:#00C386;
    }
`
const TabImg = styled.img`
    width:35px;
    height:35px;
`
const TabTitle = styled.p`
    color:#7B7B7B;
    font-size:10px;
`
