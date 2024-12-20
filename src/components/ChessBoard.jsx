import React from "react";
import { useState } from "react"; 
import "../App.css";
export default function ChessBoard()
{  
    const [chessBoardList,setChessBoardList] = useState([[{'♜':'white'},{'♞':'white'},{'♝':'white'},{'♚':'white'},{'♛':'white'},{'♝':'white'},{'♞':'white'},{'♜':'white'}], [{"♟":"white"},{"♟":"white"},{"♟":"white"},{"♟":"white"},{"♟":"white"},{"♟":"white"},{"♟":"white"},{"♟":'white'}],[null, null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null, null,null,null,null,null,null,null],[{"♟":"black"},{"♟":"black"},{"♟":"black"},{"♟":"black"},{"♟":"black"},{"♟":"black"},{"♟":"black"},{"♟":"black"}],[{'♜':"black"},{'♞':"black"},{'♝':"black"},{'♚':"black"},{'♛':"black"},{'♝':"black"},{'♞':"black"},{'♜':"black"}]]);
    const [whitePlayerFlag ,setWhitePlayerFlag] = useState(false);
    const [blackPlayerFlag ,setBlackPlayerFlag] = useState(false);
    var pickPosList = [null,null]; 
    var coinPickFlag = false;

    function pickCoin(index,boxindex)
    {
      console.log("In Pick Coin")
      pickPosList[0] = index;
      pickPosList[1] = boxindex;
      coinPickFlag = true;
      console.log("Pick PocketLsit: ",pickPosList);
    } 

    // function changingCoins(index,boxindex)
    // {
    //   let tempList = [...chessBoardList];
    //     if (tempList[index][boxindex] === null)
    //     {
    //     let tempVar = tempList[index][boxindex];
    //     tempList[index][boxindex] = tempList[pickPosList[0]][pickPosList[1]];
    //     tempList[pickPosList[0]][pickPosList[1]] = tempVar;
    //     setChessBoardList(tempList);
    //     console.log(tempList); 
    //     setWhitePlayerFlag(!whitePlayerFlag); 
    //     coinPickFlag = false;
    //     } 
    //     if(tempList[index][boxindex])
    //     {
    //       tempList[index][boxindex] = tempList[pickPosList[0]][pickPosList[1]];
    //       tempList[pickPosList[0]][pickPosList[1]] = null;
    //       setWhitePlayerFlag(!whitePlayerFlag);
    //     }
    // }

    function placeCoin(index,boxindex)
    {
      console.log("In Place Coin");
      console.log("Pick PocketLsit: ",pickPosList);
      if(coinPickFlag === true )
      {
        const coinColor = chessBoardList[pickPosList[0]][pickPosList[1]][Object.keys(chessBoardList[pickPosList[0]][pickPosList[1]])[0]];
        const coinSymbol = Object.keys(chessBoardList[pickPosList[0]][pickPosList[1]])[0]
        if(coinColor === 'white' && whitePlayerFlag === true)
        {
        console.log("Yes True!!!");
        let tempList = [...chessBoardList];
        if (tempList[index][boxindex] === null)
        {
          console.log("Its null");
          let tempVar = tempList[index][boxindex];
          tempList[index][boxindex] = tempList[pickPosList[0]][pickPosList[1]];
          tempList[pickPosList[0]][pickPosList[1]] = tempVar;
          setChessBoardList(tempList);
          console.log(tempList); 
          setWhitePlayerFlag(!whitePlayerFlag); 
          coinPickFlag = false;
        } 
        else if(tempList[index][boxindex])
        {
          tempList[index][boxindex] = tempList[pickPosList[0]][pickPosList[1]];
          tempList[pickPosList[0]][pickPosList[1]] = null;
          setChessBoardList(tempList);
          setWhitePlayerFlag(!whitePlayerFlag); 
          coinPickFlag = false;
        }
        
        }
        if(coinColor === 'black' && whitePlayerFlag === false)
        { 

        let tempList = [...chessBoardList];
        if (tempList[index][boxindex] === null)
        {
        let tempVar = tempList[index][boxindex];
        tempList[index][boxindex] = tempList[pickPosList[0]][pickPosList[1]];
        tempList[pickPosList[0]][pickPosList[1]] = tempVar;
        setChessBoardList(tempList);
        console.log(tempList); 
        setWhitePlayerFlag(!whitePlayerFlag); 
        coinPickFlag = false;
        } 
        else if(tempList[index][boxindex])
        {
          console.log("jkjksadk")
          tempList[index][boxindex] = tempList[pickPosList[0]][pickPosList[1]];
          tempList[pickPosList[0]][pickPosList[1]] = null;
          setWhitePlayerFlag(!whitePlayerFlag);
          setChessBoardList(tempList);
          coinPickFlag =false;
        }
          // let tempList = [...chessBoardList];
          // let tempVar = tempList[index][boxindex];
          // tempList[index][boxindex] = tempList[pickPosList[0]][pickPosList[1]];
          // tempList[pickPosList[0]][pickPosList[1]] = tempVar;
          // setChessBoardList(tempList);
          // console.log(tempList); 
          // setWhitePlayerFlag(true);
        }
      }
     }

    function handlePickPlace(index,boxindex)
    {
      if(pickPosList[0] === null && pickPosList[1] === null)
      {
        if(chessBoardList[index][boxindex])
          {
            pickCoin(index,boxindex);
          }
      }
      else{
        if(chessBoardList[index][boxindex] === null )
          {
            placeCoin(index,boxindex);
          } 
        else{
          const pickCoinColor = chessBoardList[pickPosList[0]][pickPosList[1]][Object.keys(chessBoardList[pickPosList[0]][pickPosList[1]])[0]];
          const placeCoinColor = chessBoardList[index][boxindex][Object.keys(chessBoardList[index][boxindex])[0]]; 
        if (chessBoardList[index][boxindex] && pickCoinColor !== placeCoinColor)
        {
          placeCoin(index,boxindex);
        }
        }
      }
    }

    return(
      <center>
        <div className='App'>
        <div className="chessBoardStyle">
            {
                chessBoardList.map((value,index)=>{ 
                   return (<div><div key={index} className="rowStyle">
                        {
                            value.map((box,boxindex)=>{
                             if( index%2 === 0 && boxindex%2 ===0 ){
                              return <div className='creamBoxStyle' onClick={()=>{ handlePickPlace(index,boxindex)
                              }} key={boxindex}>
                               {chessBoardList[index][boxindex] ? <p className={chessBoardList[index][boxindex][Object.keys(chessBoardList[index][boxindex])[0]] === "white" ? 'coinsStyleWhite':'coinsStyleBlack'} onClick={()=> null}>
                                {Object.keys(chessBoardList[index][boxindex])[0]}</p> : <p>{chessBoardList[index][boxindex]}</p>}
                              </div> 
                             } 

                            //  ########

                              if(index%2 === 0 && boxindex%2 !== 0 ) {return <div className='greenBoxStyle' onClick={()=>{handlePickPlace(index,boxindex)
                              }}>{chessBoardList[index][boxindex] ? <p className={chessBoardList[index][boxindex][Object.keys(chessBoardList[index][boxindex])[0]] === 'white' ? 'coinsStyleWhite':'coinsStyleBlack'} onClick={()=> null} >
                                {Object.keys(chessBoardList[index][boxindex])[0]}</p> : <p onClick={()=> null}>{chessBoardList[index][boxindex]}</p>}</div> }

                              if(index%2 !== 0 && boxindex%2 === 0) {return <div className='greenBoxStyle' onClick={()=>{handlePickPlace(index,boxindex)
                              }}>
                                {chessBoardList[index][boxindex] ? <p className={chessBoardList[index][boxindex][Object.keys(chessBoardList[index][boxindex])[0]] === 'white' ? 'coinsStyleWhite':'coinsStyleBlack'} onClick={()=> null}>
                                  {Object.keys(chessBoardList[index][boxindex])[0]}</p> : <p onClick={()=> null}>{chessBoardList[index][boxindex]}</p>}
                              </div> }

                              if(index%2 !== 0 && boxindex%2 !== 0 ) {return <div className='creamBoxStyle' onClick={()=>{handlePickPlace(index,boxindex)
                              }}>
                                {chessBoardList[index][boxindex] ? <p className={chessBoardList[index][boxindex][Object.keys(chessBoardList[index][boxindex])[0]] === 'white' ? 'coinsStyleWhite':'coinsStyleBlack'} onClick={()=> null}>
                                  {Object.keys(chessBoardList[index][boxindex])[0]}</p> : <p onClick={()=> null}>{chessBoardList[index][boxindex]}</p>}
                              </div> }

                            })
                        }
                    </div>
                    </div>)
                })
            }
        </div>
        </div>
        </center>)
}