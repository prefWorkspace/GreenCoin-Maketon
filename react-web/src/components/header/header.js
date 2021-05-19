
import React from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"

// img
import Logo from '../../img/logo/logo@3x.png'
import Profile from '../../img/profile/profileImg@3x.png'
import Arrow from '../../img/icon/arrow@3x.png'


const Header = (props) => {
    // 사용 x ....
    
    return(
        <HeaderWrap>
            <Top>
                <Link to='/'>
                    <LogoImg src={Logo} alt="로고 이미지"/>
                </Link>
                <ProfileImg src={Profile} alt="프로필 이미지"/>
            </Top>

            <Bottom>
                <City>
                    <CityText>서울 특별시</CityText>
                    <ArrowImg src={Arrow} alt="방향 아이콘"/>
                </City>


            </Bottom>
        </HeaderWrap>
    )
};

export default Header;

const HeaderWrap = styled.div`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:133px;
    z-index:999;
`
const Top = styled.div`
    width:100%;
    height:80px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding: 18px 26px;
`
const LogoImg = styled.img`
    width:123px;
    height:40px;
`

const ProfileImg = styled.img`
    width:40px;
    height:40px;
`

const Bottom = styled.div`
    width:100%;
    height:53px;
    display:flex;
    align-items:center;
    background-color:#F8F7F7;
`

const City = styled.div`
    display:flex;
    align-items:center;
`

const CityText = styled.p`
    font-size:15px;
    color:#505050;
    margin: 0 26px;
    font-size:400;
`
const ArrowImg = styled.img`
    width:3.8px;
    height:7px;
`
