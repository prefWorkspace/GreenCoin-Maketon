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
import ShareIcon from "../../../img/contents/share@3x.png"
import ListImg from "../../../img/community/communityDetail/listImg@3x.png"
import ListImg_2 from "../../../img/community/communityDetail/listImg_2@3x.png"
import ListImg_3 from "../../../img/community/communityDetail/listImg_3@3x.png"
import ListImg_4 from "../../../img/community/communityDetail/listImg_4@3x.png"
import ListImg_5 from "../../../img/community/communityDetail/listImg_5@3x.png"
import ListImg_6 from "../../../img/community/communityDetail/listImg_6@3x.png"
import ListImg_7 from "../../../img/community/communityDetail/listImg_7@3x.png"

const ViewNotice = (props) => {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        centeredSlides:false,
      };

    const [contentData, setContentData] = useState({}) 
    const [imgArr, setImgArr] = useState([]);
    const [currentImg, setCurrentImg] = useState(ListImg);
    const [isModal, setIsModal] = useState(false);

    //  클릭한 아이디를 가져와 텍스트/이미지를 넣는다.
    useEffect(() => {
        setContentData({
            date:"2020.00.00",
            title:"탄소줄이고 다이어트도 같이했어요!",
            text:
            "우리들이 사용하는 전기, 도시가스 등의생산과정에서 많은 온실가스가 발생하고 있어요. 이는 환경오염으로 인한 기후변화의 원인이 되는데요. 지구에게도 우리에게도 아주 큰 위협이 되고있답니다! 건강하고 행복한 지구를 위한 건강하고 행복한 지구를 위한 전국민 온실가스 감축 실천프로그램!! “탄소포인트제” 함께 시작해볼까요?? [출처] 이산화탄소 줄이기, 우리집부터 시작해요! “탄소포인트제”|작성자 홍천군",
            img:[]
        })

        setImgArr([ListImg_2, ListImg_3, ListImg_4, ListImg_5, ListImg_6, ListImg_7, ListImg]);
    }, [])

    // 클릭한 이미지 크게 보이게 
    const onClickListImg = (index) => {
        setCurrentImg(imgArr[index])
    }

    return(
        <ContentsWrap>
            <Header />

            {/* 제목 */}
            <TilteWrap>
                {/* <Date>2020.00.00</Date>
                <Title>탄소줄이고 다이어트도 같이했어요!</Title> */}
                <Date>{contentData.date}</Date>
                <Title>{contentData.title}</Title>
                <Share src={ShareIcon} alt="공유 아이콘"/>
            </TilteWrap>
            {/* 본문 */}
            {/*  -- 디자인에서 줄바꿈이 많아서 br 태그를 많이 사용했는데 줄간격 조절인지?? */}
            <TextContents>
                <Text>
                    우리들이 사용하는 전기, 도시가스 등의 <br /><br />
                    생산과정에서 많은 온실가스가 발생하고 있어요. <br /><br />
                    이는 환경오염으로 인한 기후변화의 원인이 되는데요. <br /><br />
                    지구에게도 우리에게도 아주 큰 위협이 되고있답니다! <br /><br />

                    ​ <br /><br />
                    건강하고 행복한 지구를 위한 <br /><br />
                    전국민 온실가스 감축 실천프로그램!! <br /><br />
                    “탄소포인트제” <br /><br />
                    함께 시작해볼까요?? <br /><br />
                    [출처] 이산화탄소 줄이기, 우리집부터 시작해요! “탄소포인트제”|작성자 홍천<br />
                    군
                </Text>
            </TextContents>
            {/* 이미지 */}
            <ImgContents>
                <MainImg src={currentImg} alt="게시글 이미지" onClick={() => setIsModal(true)}/>
                <ImgSlideWrap>
                    <Slider {...settings}>
                        {
                            imgArr.map((item, index) => {
                                return(
                                    <SlideElWrap>
                                        <SlideEl onClick={() => onClickListImg(index)}>
                                            <ListImgEl src={item} alt="게시글 이미지"/> 
                                        </SlideEl>
                                    </SlideElWrap>
                                )
                            })
                        }
                    </Slider>
                </ImgSlideWrap>
            </ImgContents>

            {/* 모달 이지 */}
            {
                isModal?
                <ImgModalWrap onClick={() => setIsModal(false)}>
                    <ModalImg src={currentImg} alt="게시글 이미지"/>
                </ImgModalWrap>
                :
                null
            }
                        
            <Navbar />
        </ContentsWrap>
    )
};

export default ViewNotice;


const ContentsWrap = styled.div`
    margin-top:133px;
    margin-bottom:80px;
    overflow-x: hidden;
`

// ----- 제목
const TilteWrap = styled.div`
    margin:0 10px;
    width:calc(100vw - 20px);
    border-bottom:1px solid #E6E6E6;
    position: relative;
    padding: 13px 0 13px 10px; 
`
const Date = styled.p`
    color: #959595;
    font-size:12px;
    font-weight:400;
    margin-bottom:8px; 
`
const Title = styled.p`
    font-weight:400;
    font-size:12px;
`
const Share = styled.img`
    width:18px;
    height:18px;
    position:absolute;
    top:13px;
    right:21px;
`

// ----- 본문 텍스트 영역
const TextContents = styled.div`
    margin:20px 31px 0 20px;
`

const Text = styled.p`
    font-size:12px;
    line-height:17px;
    font-weight:400;
    color:#505050;
`

// ----- 본문 이미지 영역
const ImgContents = styled.div`
    margin:47px 17px 96px 14px;
    height:290px;
`
const MainImg = styled.img`
    /* width: 397px; */
    width: calc(100vw * (397/438));
    height: 217px;
    margin-bottom: 12px;
    border-radius: 5px;
`
const ImgSlideWrap = styled.div`
    width: 100%;
`
const SlideElWrap = styled.div`
`
const SlideEl = styled.div`
    border-radius: 5px;
`
const ListImgEl = styled.img`
    width: 60px;
    height: 60px;
    padding-right: 5px;
    border-radius: 5px;
`

// 클릭 모달 이미지

const ImgModalWrap = styled.div`
    position: fixed;
    top:0;
    left:0;
    z-index: 3;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
`
const ModalImg = styled.img`
    width: calc(100vw * (397/438));
    height: calc(100vw * (430/438));
`