import React, { useEffect, useRef, useState } from 'react';

//css
import styled from "styled-components"
import Header from '../../../components/header/header';
import Navbar from '../../../components/navbar/navbar';


// Slick Slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// img
import WritePlus from "../../../img/community/communityDetail/writePlus.png";
import Search from "../../../img/community/communityDetail/search.png";

// date
import DateText from "../../../commonModules/dateText";

const WriteNotice = ({}) => {
    const [uploadImgArr, setUploadImgArr] = useState([]);
    const [tagData, setTagData] = useState([]);
    
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        centeredSlides:false,
    };

    useEffect(() => {
        setTagData(["탄소줄이기", "미세먼지", "환경오염"]);
    }, [])

    // 이미지 파일 업로드
    const onChangeFile = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            let newArr = uploadImgArr;
            newArr.push(reader.result);
            setUploadImgArr([...newArr]);
        };
        reader.readAsDataURL(file);
    }

    // 검색 버튼 클릭 
    const onClickSearch = () => {
        console.log("onClickSearch")
    }

    // 취소 버튼 클릭 
    const onClickCancel = () => {
        console.log("onClickCancel")
    }

    // 올리기 버튼 클릭
    const onClickUpload = () => {
        console.log("onClickUpload")
    }


    return(
        <ContentsWrap>
            <Header />
                {/* 타이틀 */}
                <TitleWrap>
                    <Date>{DateText(new window.Date(), ".")}</Date>
                    <TitleInput type="text" placeholder="제목을 입력해주세요."/>
                </TitleWrap>
                
                {/* 텍스트 */}
                <TextareaWrap>
                    <Textarea placeholder="내용을 입력해주세요."/>
                </TextareaWrap>

                {/* 이미지 업로드 */}
                <SliderWrap>
                    <Slider {...settings}>
                        <SlideElWrap>
                            <SlideEl>
                                <PlusWrap>
                                    <ListPlus type="file" name="file" onChange={e => onChangeFile(e)}/> 
                                </PlusWrap>
                            </SlideEl>
                        </SlideElWrap>
                        
                        {
                            [0, 1, 2, 3, 4, 5].map((item, index) => {
                                return(
                                    <SlideElWrap key={index}>
                                        <SlideEl>
                                            <ListEl uploadImgArr={uploadImgArr[index]}/> 
                                        </SlideEl>
                                    </SlideElWrap>
                                )

                            })
                        }
                    </Slider>
                </SliderWrap>
            
                {/* 검색 */}
                <SearchWrap>
                    <SearchInputWrap>
                        <SearchInput placeholder="연관 주제태그를 입력후 선택하여주세요."/>
                        <SearchImg onClick={() => onClickSearch()} src={Search} alt="검색 아이콘"/>
                    </SearchInputWrap>
                </SearchWrap>
                
                {/* 태그  */}
                <TagWrap>
                    {
                        tagData.map((item, index) => {
                            return(
                                <TagEl key={index}>{item}</TagEl>
                            )
                        })
                    }
                </TagWrap>
                        
                {/* 버튼 */}
                <BtnWrap>
                    <CanelBtn onClick={() => onClickCancel()}>취소</CanelBtn>
                    <UploadBtn onClick={() => onClickUpload()}>올리기</UploadBtn>
                </BtnWrap>
            <Navbar />
        </ContentsWrap>
    )
};

export default WriteNotice;


const ContentsWrap = styled.div`
    margin-top:133px;
    margin-bottom:80px;
    overflow-x: hidden;
`
// 상단 제목
const TitleWrap = styled.div`
    width: calc(100vw - 21px);
    margin: 0 auto;
    padding:17px 0 0;
    border-bottom: 1px solid #E6E6E6;
`
const Date = styled.p`
    padding-left: 9px;
    color:#959595;
    font-size: 12px;
    font-weight: 400;
`
const TitleInput = styled.input`
    margin: 11px 7px 10px 3px;
    padding: 10px 15px;
    border:1px solid #DDDDDD;
    width: calc(100vw * (397/438));
    height: calc(100vw * (44/438));
    border-radius:5px;
    font-size: 15px;
    font-weight: 500;
`

// 텍스트
const TextareaWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0 11px 0;
`
const Textarea = styled.textarea`
    width: calc(100vw*(397/438));
    height: calc(100vw*(363/438));
    padding: 9px 10px;
    border:1px solid #DDDDDD;
    border-radius:5px;
    resize: none;
`

// 이미지
const SliderWrap = styled.div`
    margin: 0 14px 0 17px;
`
const SlideElWrap = styled.div`
    /* padding-right: 10px;
    margin-right: 10px; */
`
const SlideEl = styled.div`
    border-radius: 5px;
    /* padding-right: 10px;
    margin-right: 10px; */
`
const PlusWrap = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 5px;
    background-image: url(${WritePlus});
`
const ListPlus = styled.input`
    opacity: 0;
`

const ListEl = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 5px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    /* padding-right: 10px;
    margin-right: 10px; */
    ${({uploadImgArr})=>{
    return uploadImgArr?
        `
        background-image: url(${uploadImgArr});
        `
        :
        `
        background-color: #F8F7F7;
        `
    }}
    
`

// 검색
const SearchWrap = styled.div`
    margin-top: 29px;
    border-top:13px solid #F8F7F7;
    margin: 21px 17px 0 14px;
`
const SearchInputWrap = styled.div`
    position: relative;
    width: calc(100vw*(387/437));
    height: calc(100vw*(35/437));
`
const SearchInput = styled.input`
    border:1px solid #BFBFBF;
    width: 100%;
    height: 100%;
    border-radius: calc(100vw*(17/437));
    padding: 7px 17px;
    font-size: 13px;
    font-weight: 400;
`
const SearchImg = styled.img`
    position: absolute;
    width: calc(100vw*(28/437));
    height: calc(100vw*(28/437));
    top:50%;
    right: 3px;
    transform: translateY(-50%);
`

//태그
const TagWrap = styled.div`
    margin: 7px 17px 0 14px;
`

const TagEl = styled.span`
    height: calc(100vw*(28/438));
    background-color: #66D8B9;
    color:#fff;
    font-size: 13px;
    font-weight: 400;
    line-height: calc(100vw*(28/438));
    padding: 2px 12px;
    border-radius: calc(100vw*(14/438));
    margin-right: 3px;
`

// 버튼
const BtnWrap = styled.div`
    margin: 25px 0 17px;
    padding:0 17px 0 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > button{
        color:#fff;  
        border:3px solid #F8F7F7;
        border-radius:10px;
        width: calc(100vw*(196/437));
        height: calc(100vw*(66/437));
        font-size: 20px;
        font-weight: 700;
        font-family: "Nanum Gothic";
    } 
`
const CanelBtn = styled.button`
    background-color: #B5B5B5;
`
const UploadBtn = styled.button`
    background-color: #66D8B9;

`