import React, { useEffect, useRef, useState } from 'react';

//css
import styled from "styled-components"

// contents
import Header from '../../components/header/header';
import Navbar from '../../components/navbar/navbar';

// modules
import InsertComma from '../../commonModules/insertComma';

// img
import Share from '../../img/contents/share@3x.png';
import SkewRec from '../../img/contents/skewRec@3x.png';
import Arrow from '../../img/icon/arrow@3x.png';
import Pig from '../../img/contents/pig@3x.png';
import Bubble from '../../img/contents/bubble@3x.png';
import serverController from '../../pages/server/serverController';

function getDateType(date){
    function checkZero(checkString){
      return checkString.toString().length == 1 ?  "0" + checkString : checkString;
    }
    var temp = `${checkZero(date.getFullYear())}-${checkZero(date.getMonth() + 1)}-${checkZero(date.getDate())}`;
    return temp;
  }

const Contents = (props) => {

    const [currentStep, setCurrentStep] = useState(0);
    const [currentKg, setCurrentKg] = useState(0);
    const [currentDataArr, setCurrentDataArr] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [historyData, setHistoryData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [bubbleLeft, setBubbleLeft] = useState(17);
    const [bubbleText, setBubbleText] = useState(null);
    const [curDate,setCurDate] = useState(new Date());
    const [steps,setSteps] = useState([{},{},{},{},{},{},{}]);

    const barRef = useRef();
    const listRef = useRef();


    useEffect(() => {


        setCurrentDataArr([
        {title: "칼로리", content:1000, name:"kcals"},
        {title: "줄인 탄소", content:1000, name:"tansos"},
        {title: "거리", content:1000, name:"distancs"},
        ]);
        // setGraphData([150, 114, 69, 82, 119, 40, 146]);
        // setBubbleText(150)
        // setHistoryData([
        //     {date:"2020.00.00", price:150, desc:"적립", current:550},
        //     {date:"2020.00.00", price:150, desc:"적립", current:400},
        //     {date:"2020.00.00", price:-5000, desc:"지역화폐 교환", current:250},
        //     {date:"2020.00.00", price:250, desc:"적립", current:5250},
        // ])
        // setTimeout(() => {
        //     setBubbleLeft(barRef.current.children[0].offsetLeft)
        // }, 50)
    }, [])

    const onClickBar = (e, index, item) =>{
        setBubbleLeft(e.target.offsetLeft);
        setActiveIndex(index)
        setBubbleText(item);
    }


    const moveToMyCoin = ()=>{
        window.ReactNativeWebView.postMessage(JSON.stringify({
            type:"myCoin",
        }));
    }

    const updateCalendar = () =>{

   
        let cur = new Date(curDate.getTime());
        cur.setDate(cur.getDate() - cur.getDay())
        
        let lastDate = new Date(curDate.getTime());
        lastDate.setDate(lastDate.getDate() + (7 -  lastDate.getDay()))

        console.log(getDateType(cur) + " +============== " + getDateType(lastDate));
        serverController.connectFetchController(`users/${listRef.current.getAttribute("no")}/points/history?token=${listRef.current.getAttribute("token")}&order=ASC&action_date_ge=${getDateType(cur)}&action_date_le=${getDateType(lastDate)}`,"GET",null,
        function(res){
          if(res.success != 1)
            return;
    
            let dateArray = [];
            let point_history = res.data.point_history;
            for(var i =0;i<7;i++){
              dateArray.push(point_history.length > i ? point_history[i].point : 0);
            }
           setGraphData(dateArray);
        }
        );
     
        
        serverController.connectFetchController(`users/${listRef.current.getAttribute("no")}/steps?token=${listRef.current.getAttribute("token")}&order=ASC&date_ge=${getDateType(cur)}&date_le=${getDateType(lastDate)}`,"GET",null,
        function(res){
          if(res.success != 1)
            return;

            
            let dateArray = [];
            let stepsArray = res.data.steps;
            for(var i =0;i<7;i++){
                dateArray.push(stepsArray.length > i ? stepsArray[i] : {kcal:0,meter:0,step:0});
              }
            setSteps(dateArray);

           // console.log(res.data.steps);
        }
        );
    }

    useEffect(() => {
        setBubbleText(null);
        setActiveIndex(-1);
        updateCalendar();
    }, [curDate])

    const onClickRight = () =>{
        let cur = new Date(curDate.getTime());
        cur.setDate(1);
        cur.setMonth(cur.getMonth() + 1);
        if(cur.getFullYear() == new Date().getFullYear() && cur.getMonth() == new Date().getMonth()){
            setCurDate(new Date());
        }
        else
            setCurDate(cur);
    }

    const onClickLeft = () =>{
        let cur = new Date(curDate.getTime());
        cur.setDate(1);
        cur.setMonth(cur.getMonth() - 1);
        if(cur.getFullYear() == new Date().getFullYear() && cur.getMonth() == new Date().getMonth()){
            setCurDate(new Date());
        }
        else
            setCurDate(cur);
    }

    const getPointHistoryList = () => {
        serverController.connectFetchController(`users/${listRef.current.getAttribute("no")}/points/history?token=${listRef.current.getAttribute("token")}`,"GET",null,
        function(res){
          if(res.success != 1)
            return;
          setHistoryData(res.data.point_history);
        }
        );
        updateCalendar();
    }


    return(
        <ContentsWrap>
            {/* <Header /> */}
            <div ref={listRef} name="historyListTag" token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJubyI6IjciLCJ1c2VybmFtZSI6Imp1bmdtaW4iLCJsb2NhdGlvbl9ubyI6IjE3IiwibG9jYXRpb25fbmFtZSI6IuygnOyjvCIsImxvY2F0aW9uX2Z1bGxuYW1lIjoi7KCc7KO87Yq567OE7J6Q7LmY64-EIiwiaWF0IjoxNjIyNDYxNjk2fQ.klHmyW6Eyh_7Ztt9Whk6ciL1L60gK3ibkyoq8hwqB9w" no="7" onClick={getPointHistoryList}></div>
            {/* 만보기 */}
            <StepWrap>
                <ShareImg src={Share} alt="공유하기 아이콘"/>
                <StepTop>
                    <StepText name="steps">{currentStep} steps</StepText>
                    <KgText name="kgs">{currentKg} kg</KgText>
                    <SkewRecImg src={SkewRec} alt="직사각형"/>
                </StepTop>

                <StepBottom>
                    {
                        currentDataArr.map((item, index) => {
                            return(
                                <StepBottomEl key={index}>
                                    <StepBottomTitle>{item.title}</StepBottomTitle>
                                    <StepBottomContent name={item.name}>{InsertComma(item.content)}</StepBottomContent>
                                </StepBottomEl>
                            )
                        })
                    }
                </StepBottom>
            </StepWrap>
                
            {/* 그래프 */}
            <GraphWrap>
                <DateWrap>
                    <LeftArrow src={Arrow} alt="방향 아이콘" onClick={() => onClickLeft()}/>
                    <DateText>{curDate.getMonth() + 1}월</DateText>
                    <RightArrow src={Arrow} alt="방향 아이콘" onClick={() => onClickRight()}/>
                </DateWrap>

                <GraphCanvas>   
                    <BubbleText style={{display:(bubbleText == null ? "none" : "block"), left:`${bubbleLeft - 27}px`}}>{bubbleText}코인</BubbleText> 
                    <GraphBarGroup ref={barRef}>
                        {
                            graphData.map((item, index) => {
                                if(index == 0){}
                                return(
                                    <GraphBar key={index} onClick={(e) => onClickBar(e, index, item)} style={{height:`${item}px`, backgroundColor:`${activeIndex == index?"#6EEAC8":"#E8E8E8"}`}}></GraphBar>
                                )
                            })
                        }
                        <GraphLine style={{bottom:"0px"}}/>
                        <GraphLine style={{bottom:"38px"}}/>
                        <GraphLine style={{bottom:"77px"}}/>
                        <GraphLine style={{bottom:"116px"}}/>
                    </GraphBarGroup>
                </GraphCanvas>
                <GraphText>
                    <span>월</span>
                    <span>화</span>
                    <span>수</span>
                    <span>목</span>
                    <span>금</span>
                    <BlueText>토</BlueText>
                    <RedText>일</RedText>
                </GraphText>
            </GraphWrap>
            
            {/* 그래프 텍스트 */}
            <GraphData>
                <GraphDataTop>
                    <SelectDate>{curDate.getFullYear()}년 {curDate.getMonth() + 1}월 {curDate.getDate() + (7 - activeIndex)}일</SelectDate>
                    <DateCoin>150 그린코인 적립됨</DateCoin>
                </GraphDataTop>
                <GraphDataBottom>
                    <GraphDataText><GreenText>{activeIndex == -1 ? "0" : (steps[activeIndex].kcal / 100).toFixed(3)}kg</GreenText> 의 탄소 감소</GraphDataText>
                    <GraphDataText><GreenText>{activeIndex == -1 ? "0" : steps[activeIndex].meter}km</GreenText> 걷고</GraphDataText>
                    <GraphDataText><GreenText>{activeIndex == -1 ? "0" : steps[activeIndex].kcal}kcal</GreenText> 소비 하였습니다.</GraphDataText>
                </GraphDataBottom>
            </GraphData>
            
            {/* 내역 */}
            <CoinHistory>
                <HistoryTop>
                    <PigImg src={Pig} alt="돼지 아이콘"/>
                    <HistoryTitle>나의 그린코인 적립 및 지역 화폐 전환 내역</HistoryTitle>
                    <MoreBtn onClick={ () => moveToMyCoin()}>더보기 +</MoreBtn>
                </HistoryTop>

                <HistoryTable>
                    <TableTitleWrap>
                        <TableTitle>날짜</TableTitle>
                        <TableTitle>금액</TableTitle>
                        <TableTitle>사용</TableTitle>
                        <TableTitle>보유 코인 잔액</TableTitle>
                    </TableTitleWrap>
                    {
                        historyData.map((item, index) => {
                            let color = "#00C386";
                            if(item.desc == "지역화폐 교환"){
                                color="#D68C01";
                            }
                            return(
                                <TableContentWrap key={index}>
                                    <TableContent style={{color:"#959595"}}>{item.action_date}</TableContent>
                                    <TableContent>{InsertComma(item.point)}코인</TableContent>
                                    <TableContent style={{fontWeight:500, color:color}}>{item.action}</TableContent>
                                    <TableContent>{InsertComma(item.point)}코인</TableContent>
                                </TableContentWrap>
                            )
                        })
                    }
                
                </HistoryTable>
            </CoinHistory>

            {/* 교환 버튼 */}
            <ChangeBtn onClick={moveToMyCoin}>
                지역화폐로 교환하기
            </ChangeBtn>
            {/* <Navbar crtIndex={1}/> */}
        </ContentsWrap>
    )
};

export default Contents;

const ContentsWrap = styled.div`
    padding:15px;
`
const StepWrap = styled.div`
    /* width:397px; */
    /* height: 324px; */
    border:1px solid #EDEDED;
    border-radius: 10px;
    position:relative;
    margin-bottom:34px;
`
const ShareImg = styled.img`
    position:absolute;
    top:20px;
    right:20px;
    width:21px;
    height: 21px;
`

// -- StepTop
const StepTop = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    height: 172px;
`
const StepText = styled.p`
    font-size: 22px;
    color:#505050;
    font-size:500;
`
const KgText = styled.p`
    font-size: 38px;
    color:#00C386;
    z-index:1;
    font-size:500;
`
const SkewRecImg = styled.img`
    width:208px;
    height: 10px;
    margin-top:-5px;
    z-index:0;
`

// -- StepTop
const StepBottom = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
`

const StepBottomEl = styled.div`
    width:33%;
    height: 118px;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    text-align:center;
    border-left:1px solid #D9D9D9;
    margin-bottom:13px;
    &:first-child {
        border-left:0px;
    }
`
const StepBottomTitle = styled.div`
    font-size:13px;
    color:#7B7B7B;
    margin-bottom:13px;
    font-size:500;
`
const StepBottomContent = styled.div`
    font-size:20px;
    color:#505050;
    font-size:500;
`

// Graph
const GraphWrap = styled.div`
    width:100%;
    height: 285px;
    position:relative;
    margin-bottom:38px;
    padding:0 22px;
`
const DateWrap = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    margin-bottom:83px;
`
const DateText = styled.p`
    font-size:20px;
    color:#505050;
    font-weight:500;
    margin:0 32px;
`
const RightArrow = styled.img`
    width:6px;
    height: 10px;
`
const LeftArrow = styled.img`
    width:6px;
    height: 10px;
    transform: rotate(180deg);
`

const GraphCanvas = styled.div`
    width:100%;
    height: 155px;
    border-bottom:1px solid #D9D9D9;
    position:relative;
`
const BubbleText = styled.div`
    width:67px;
    height:38px;
    background-image:url(${Bubble});
    text-align:center;
    padding-top:6px;
    font-size:12px;
    position:absolute;
    top:-45px;
    color:#fff;
`

const GraphLine = styled.div`
    width:100%;
    height: 1px;
    border-bottom:1px solid #F5F5F5;
    position:absolute;
    z-index:0;
`

const GraphBarGroup = styled.div`
    width:100%;
    display:flex;
    justify-content:space-around;
    transform:rotate(180deg) rotateY(180deg);
`
const GraphBar = styled.div`
    width:14px;
    background-color:#E8E8E8;
    z-index:1;
`


const GraphText = styled.p`
    width:100%;
    font-size:15px;
    font-weight:500;
    color:#7B7B7B;
    display:flex;
    justify-content:space-around;
    margin:11px 0 30px;
`
const BlueText = styled.span`
    color:#0033BF;
`
const RedText = styled.span`
    color:#C60000;
`


const GraphData = styled.div`
    width:100%;
    border:1px solid #EDEDED;
    border-radius:10px;
    margin-bottom:30px;
`
const GraphDataTop = styled.div`
    margin:13px 27px 0;
    display:flex;
    align-items:center;
    justify-content:space-between;
`
const SelectDate = styled.p`
    font-size:12px;
    font-weight:400;
`
const DateCoin = styled.p`
    font-size:11px;
    width:125px;
    height:26px;
    background-color:#00C386;
    color:#fff;
    border-radius:13px;
    text-align:center;
    line-height:26px;
    font-weight:500;
`
const GraphDataBottom = styled.div`
    margin: 12px 27px 27px;
`
const GraphDataText = styled.p`
    font-size:14px;
    font-weight:700;
    color:#505050;
    margin-top:17px;
`
const GreenText = styled.span`
    color:#66D8B9;
`

// History
const CoinHistory = styled.div`
    width:100%;
    margin-bottom:39px;
`

const HistoryTop = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    margin-bottom:17px;
`
const PigImg = styled.img`
    width:22px;
    height:22px;
    margin-right:11px;
`
const HistoryTitle = styled.p`
    font-size:calc(100vw*(15/428));
    color:#505050;
    font-weight:700;
    margin-right:calc(100vw*(50/428));
`
const MoreBtn = styled.div`
    font-size:11px;
    color:#505050;
    font-weight:400;
`
const HistoryTable = styled.div`
`

const TableTitleWrap = styled.div`
    height:36px;
    background-color:#F8F7F7;
    display:flex;
    align-items:center;
`
const TableTitle = styled.span`
    width:25%;
    text-align:center;
    font-size:12px;
    font-weight:400;
    color:#505050;
`
const TableContentWrap = styled.div`
    height:36px;
    display:flex;
    align-items:center;
    border-bottom:1px solid #E6E6E6;
`
const TableContent = styled.span`
    width:25%;
    text-align:center;
    font-weight:400;
    font-size:12px;
    color:#505050;
`

const ChangeBtn = styled.button`
    width:100%;
    height:66px;
    background-color:#66D8B9;
    border:3px solid #F8F7F7;
    color:#FFF;
    font-size:20px;
    font-weight:700;
    border-radius:10px;
    margin-bottom: calc(100vw*(101/438));
`
