import React, { useEffect } from "react";
import { useState } from "react"; 
import "../App.css";
import CoinsDisplay from "./CoinsDisplay";
export default function ChessBoard()
{  
    const [chessBoardList,setChessBoardList] = useState([[{'♜':'white'},{'♞':'white'},{'♝':'white'},{'♛':'white'},{'♚':'white'},{'♝':'white'},{'♞':'white'},{'♜':'white'}], [{"♟":"white"},{"♟":"white"},{"♟":"white"},{"♟":"white"},{"♟":"white"},{"♟":"white"},{"♟":"white"},{"♟":'white'}],[null, null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null, null,null,null,null,null,null,null],[{"♟":"black"},{"♟":"black"},{"♟":"black"},{"♟":"black"},{"♟":"black"},{"♟":"black"},{"♟":"black"},{"♟":"black"}],[{'♜':"black"},{'♞':"black"},{'♝':"black"},{'♛':"black"},{'♚':"black"},{'♝':"black"},{'♞':"black"},{'♜':"black"}]]);
    const [whitePlayerFlag ,setWhitePlayerFlag] = useState(true);
    const [blackPlayerFlag ,setBlackPlayerFlag] = useState(false);
    const [positionsList , setPositionsList] = useState([]);
    const [pickPosList,setPickPosList] =useState([null,null])
    const [coinPickFlag ,setCoinPickFlag] = useState(false);
    const [showWhiteCoinsList,setShowWhiteCoinsList] =useState([]);
    const [showBlackCoinsList,setShowBlackCoinsList] = useState([]);

    useEffect(()=>{
      if(pickPosList[0] !== null && pickPosList !== null) 
      {
        if(chessBoardList[pickPosList[0]][pickPosList[1]])
          {
            const coinType = Object.keys(chessBoardList[pickPosList[0]][pickPosList[1]])[0];
            const coinColor = chessBoardList[pickPosList[0]][pickPosList[1]][Object.keys(chessBoardList[pickPosList[0]][pickPosList[1]])[0]];
            console.log(coinType);
            handlePosition(coinType,pickPosList[0],pickPosList[1],coinColor);
          }
      }
      
    },[pickPosList]);

    function checkOpponent(index,boxindex)
    {
      if(chessBoardList[index][boxindex] != null)
      {
      const opponentColor = chessBoardList[index][boxindex][Object.keys(chessBoardList[index][boxindex])[0]];
      console.log("Opponent Color in checkOpponent Function:",opponentColor);
      return opponentColor;
      }
     
    }

    function showPlayer(index,boxindex)
    {
      let coinColor = chessBoardList[index][boxindex][Object.keys(chessBoardList[index][boxindex])[0]];
      if(whitePlayerFlag === true && coinColor === 'white')
        {
          return 'whiteCoinShadow';
        }
      if(whitePlayerFlag === false && coinColor === 'black')
          {
            return 'blackCoinShadow';
          }
      if(coinColor === "white")
      {
        return 'coinsStyleWhite';
      }
      if(coinColor === "black")
        {
          return 'coinsStyleBlack';
        } 
      
     
    }

    function pawnBlackOpponentsCheck(row,column,coinColor,pawnList)
    {
      let opponentColor1 =coinColor;
      let opponentColor2 = coinColor;
      if(row-1 >=0 && column-1>=0)
      {
        opponentColor1 = checkOpponent(row-1,column-1);
      }
      if(row-1>=0 && column+1<=7)
      {
        opponentColor2 = checkOpponent(row-1,column+1);
      }
      if(Boolean(opponentColor1)=== true &&  opponentColor1!=coinColor)
        {
          pawnList.push([row-1,column-1]);
        }
        if(Boolean(opponentColor2)===true && opponentColor2!=coinColor)
        {
          pawnList.push([row-1,column+1]);
        }
    }

    function pawnwhiteOpponentCheck(row,column,coinColor,pawnList)
    {
      let whiteOpponnentColor1 =coinColor;
      let whiteOpponnentColor2 = coinColor;
      if(row<=7 && column>=0)
      {
        whiteOpponnentColor1 = checkOpponent(row+1,column-1);
      }
      if(row<=7 && column<=7)
      {
        whiteOpponnentColor2 = checkOpponent(row+1,column+1);
      }
      
      if( Boolean(whiteOpponnentColor1)=== true && coinColor!=whiteOpponnentColor1)
      {
       pawnList.push([row+1,column-1]);
      }
      if( Boolean(whiteOpponnentColor2) === true && coinColor!=whiteOpponnentColor2)
        {
         pawnList.push([row+1,column+1]);
        }
  
    }

    function pawnHandler(row,column,coinColor)
    {
      if(coinColor === 'black')
        {
          if(row === 6)
          {
          let pawnList = [];
          pawnBlackOpponentsCheck(row,column,coinColor,pawnList);
          if(chessBoardList[row-1][column] === null)
          {
            pawnList.push([row-1,column]);
          }
          if(chessBoardList[row-2][column] === null)
            {
              pawnList.push([row-2,column]);
            }
          console.log("Pawn List: ",pawnList);
          setPositionsList(pawnList);
          } 
          else
          {
            let  pawnList = []; 
            pawnBlackOpponentsCheck(row,column,coinColor,pawnList);
            if(chessBoardList[row-1][column]===null)
            {
              pawnList.push([row-1,column]);
            }
            console.log("Pawn List: ",pawnList);
            setPositionsList(pawnList);
            }
        }
          
        else
        {
          if(row === 1)
            {
            let pawnList = [];
            pawnwhiteOpponentCheck(row,column,coinColor,pawnList);
            if(chessBoardList[row+1][column]=== null)
            {
              pawnList.push([row+1,column]);
            }
            if(chessBoardList[row+2][column]===null)
            {
              pawnList.push([row+2,column]);
            }
            console.log("Pawn List: ",pawnList);
            setPositionsList([...pawnList]);
            } 
            else
            {
              let pawnList = []
              pawnwhiteOpponentCheck(row,column,coinColor,pawnList);
              if(row+1<=7 && chessBoardList[row+1][column]===null)
              {
                pawnList.push([row+1,column]);
              }
              console.log("Pawn List: ",pawnList);
              setPositionsList(pawnList);
            }
        }
    }

    function RookHandler(row ,column,coinColor)
    {
      const presentColumn = column;
      const presentRow = row;
      let rookList = [];
      column = presentColumn+1;
      if(column<=7)
      {
      let opponentColor = checkOpponent(row,column);
      while(column<=7 && (chessBoardList[row][column] === null || coinColor != opponentColor))
      {
        if(Boolean(opponentColor)=== true && coinColor != opponentColor)
        {
          let innerList =[];
          innerList.push(row);
          innerList.push(column);
          rookList.push(innerList);
          column = column+1;
          break;
        }
        else{
        let innerList =[];
        innerList.push(row);
        innerList.push(column);
        rookList.push(innerList);
        column = column+1;
        if(column<=7)
        {
          opponentColor = checkOpponent(row,column);
        }
        }
      }
      }
      
      column = presentColumn;
      row = presentRow+1;
      if(row<=7)
      {
        let opponentColor = checkOpponent(row,column);
        console.log("opponent :",opponentColor);
        while( row<=7 && (chessBoardList[row][column] === null || coinColor != opponentColor))
          {
            // console.log("opponent color in while loop:",opponentColor);
            if(Boolean(opponentColor)=== true && coinColor != opponentColor)
              {
                console.log("opponent color break: ",opponentColor);
                let innerList =[];
                innerList.push(row);
                innerList.push(column);
                rookList.push(innerList);
                console.log("Stop :",row,column);
                break;
              }
            else{
            let innerList =[];
            innerList.push(row);
            innerList.push(column);
            rookList.push(innerList);
            row = row+1;
            if(row<=7)
            {
              opponentColor = checkOpponent(row,column);
            }
            }
            
          }
      }
      
      column = presentColumn;
      row = presentRow -1;
      if(row>=0)
      {
        let opponentColor = checkOpponent(row,column);
        while(row>=0 && (chessBoardList[row][column] === null || coinColor != opponentColor))
          {
            if(Boolean(opponentColor)=== true && coinColor != opponentColor)
              {
                console.log("opponent: ",opponentColor);
                let innerList =[];
                innerList.push(row);
                innerList.push(column);
                rookList.push(innerList);
                console.log("Row and Column:",row,column);
                break;
              }
            else
            {
              let innerList =[];
              innerList.push(row);
              innerList.push(column);
              rookList.push(innerList);
              row = row-1;
              if(row>=0)
              {
                opponentColor = checkOpponent(row,column);
              }
            }
          }
      }
      
      column = presentColumn -1;
      row = presentRow;
      if(column>=0)
      {
        let opponentColor = checkOpponent(row,column);
        while((column>=0 && column<=7 && row>=0 && row<=7) && ( chessBoardList[row][column] === null || (Boolean(opponentColor)===true && coinColor != opponentColor)))
          {
            if(Boolean(opponentColor)=== true && coinColor != opponentColor)
              {
                let innerList =[];
                innerList.push(row);
                innerList.push(column);
                rookList.push(innerList);
                column = column-1;
                break;
              }
            else{
            let innerList =[];
            innerList.push(row);
            innerList.push(column);
            rookList.push(innerList);
            column = column-1;
            if(column>=0)
            {
              opponentColor = checkOpponent(row,column);
            }
            
            }
          }
      }
        setPositionsList([...rookList]);
        console.log("Elephant: ",rookList);
        return rookList;
    }

    function knightHandler(row,column,coinColor)
    {
      const presentColumn = column;
      const presentRow = row;
      let pawnList =[];
      let opponentColor = coinColor;
      if(column+2<=7 && row-1>=0)
      {
        opponentColor = checkOpponent(row-1,column+3);
        if(chessBoardList[row-1][column+2]===null || (coinColor!=opponentColor && Boolean(opponentColor)))
          {
            pawnList.push([row-1,column+2]);
          }
      }
      if(column+2<=7 && row+1<=7)
      {
        opponentColor = checkOpponent(row+1,column+2);
        if(chessBoardList[row+1][column+2]===null || (coinColor!=opponentColor && Boolean(opponentColor)))
        {
          pawnList.push([row+1,column+2])
        }
      }
      if(column-2>=0 && row-1>=0)
      {
        opponentColor = checkOpponent(row-1,column-2);
        if(chessBoardList[row-1][column-2]===null || (coinColor != opponentColor && Boolean(opponentColor)))
        {
          pawnList.push([row-1,column-2]);
        }
      }
      if(column-2>=0 && row+1<=7)
      {
        opponentColor = checkOpponent(row+1,column-2);
        if(chessBoardList[row+1][column-2]===null || (coinColor != opponentColor && Boolean(opponentColor)))
        {
          pawnList.push([row+1,column-2]);
        }
      }
      if(row+2<=7 && column+1<=7)
      {
        opponentColor = checkOpponent(row+2,column+1);
        if(chessBoardList[row+2][column+1]===null || (coinColor != opponentColor && Boolean(opponentColor)))
        {
          pawnList.push([row+2,column+1]);
        }
      }
      if(row+2<=7 && column-1>=0)
      {
        opponentColor = checkOpponent(row+2,column-1);
        if(chessBoardList[row+2][column-1]===null || (coinColor!= opponentColor && Boolean(opponentColor)))
        {
          pawnList.push([row+2,column-1])
        }
      }
      if(row-2>=0 && column-1>=0)
      {
        opponentColor =checkOpponent(row-2,column-1);
        if(chessBoardList[row-2][column-1]===null || (coinColor!= opponentColor && Boolean(opponentColor)))
        {
          pawnList.push([row-2,column-1])
        }
      }
      if(row-2>=0 && column+1<=7)
      {
        opponentColor = checkOpponent(row-2,column+1);
        if(chessBoardList[row-2][column+1]===null || (coinColor!= opponentColor && Boolean(opponentColor)))
          {
            pawnList.push([row-2,column+1])
          }
      }
      console.log("Knight Pos: ",pawnList);
      setPositionsList(pawnList);
      
    }

    function bishopHandler(row,column,coinColor)
    {
      let bishopList = [];
      const presentColumn = column;
      const presentRow = row;
      row = presentRow-1;
      column = presentColumn -1;
      let opponentColor = coinColor;
      if(row>=0 && row<=7 && column>=0 && column<=7)
      {
        opponentColor = checkOpponent(row,column);
        while((row>=0 && column>=0 && chessBoardList[row][column]===null) || (Boolean(opponentColor)===true && coinColor!=opponentColor))
        {
          if(Boolean(opponentColor)=== true && coinColor!=opponentColor)
          {
            bishopList.push([row,column]);
            break;
          }
          else
          {
            bishopList.push([row,column]);
            row =row-1;
            column = column-1;
            if(row>=0 && column>=0)
            {
              opponentColor = checkOpponent(row,column);
            }
            
          }
         
        }
      }
      row = presentRow-1;
      column = presentColumn +1;
      opponentColor = coinColor;
      if(row>=0 && row<=7 && column>=0 && column<=7)
      {
        opponentColor = checkOpponent(row,column);
        while((row>=0 && column<=7 && row<=7 && column>=0 && chessBoardList[row][column]===null) || (Boolean(opponentColor)===true && coinColor!=opponentColor))
        {
          if(Boolean(opponentColor)=== true && coinColor!=opponentColor)
            {
              bishopList.push([row,column]);
              break;
            }
          else{
            bishopList.push([row,column]);
            row =row-1;
            column = column+1;
            console.log("Bishop Column Row Check: ",row,column);
            if(row>=0 && column<=7)
            {
              opponentColor = checkOpponent(row,column);
            }
           
          }
          
        }
      }
      row = presentRow+1;
      column = presentColumn-1;
      opponentColor = coinColor;
      if(row>=0 && row<=7 && column>=0 && column<=7)
      {
        opponentColor = checkOpponent(row,column);
        while((row<=7 && row>=0 && column>=0 && column<=7 && chessBoardList[row][column]===null) || (Boolean(opponentColor)===true && coinColor!=opponentColor))
        {
          if(Boolean(opponentColor)=== true && coinColor!=opponentColor)
            {
              bishopList.push([row,column]);
              break;
            }
          else{
            bishopList.push([row,column]);
            row =row+1;
            column = column-1;
            if(row<=7 && column>=0)
            {
              opponentColor = checkOpponent(row,column);
            }
          }
          
        }
      }
      row = presentRow+1;
      column = presentColumn+1;
      opponentColor = coinColor;
      if(row>=0 && row<=7 && column>=0 && column<=7)
      {
        opponentColor = checkOpponent(row,column);
        while((row<=7 && column>=0 && row>=0 && column<=7 && chessBoardList[row][column]===null) || (Boolean(opponentColor)===true && coinColor!=opponentColor))
        {
         
          if(Boolean(opponentColor)=== true && coinColor!=opponentColor)
            {
              bishopList.push([row,column]);
              break;
            }
          else{
            bishopList.push([row,column]);
            row =row+1;
            column = column+1;
            if(row<=7 && column<=7)
            {
              opponentColor = checkOpponent(row,column);
            }
            console.log("Bishop Row column check:",row,column);
            
          }
          
        }
      }
      console.log("Bishop List: ",bishopList);
      setPositionsList(bishopList);
      return bishopList;

    }

    function queenHandler(row,column,coinColor)
    {
      const bishopList = bishopHandler(row,column,coinColor);
      const rookList = RookHandler(row,column,coinColor);
      const queenList = bishopList.concat(rookList);
      console.log("Queen List: ",queenList);
      setPositionsList(queenList);
    }

    function kingHandler(row,column,coinColor)
    {
        let kingList =[];
        if(row-1>=0 || (row-1>=0 && column+1 <=7) || (row-1>=0 && column-1>=0))
        {
          let opponentColor = checkOpponent(row-1,column);
          if(chessBoardList[row-1][column]===null || (Boolean(opponentColor) === true && opponentColor!=coinColor))
          {
            kingList.push([row-1,column])
          }
          opponentColor = checkOpponent(row-1,column+1);
          if(chessBoardList[row-1][column+1]===null || (Boolean(opponentColor) === true && opponentColor!=coinColor))
          {
            kingList.push([row-1,column+1])
          }
          opponentColor = checkOpponent(row-1,column-1);
          if(chessBoardList[row-1][column-1]===null || (Boolean(opponentColor) === true && opponentColor!=coinColor))
          {
            kingList.push([row-1,column-1])
          }
        }
        if(row+1<=7 || (row+1<=7 && column+1<=7) ||(row+1<=7 && column-1>=0))
        {
          let opponentColor = checkOpponent(row+1,column);
          if(chessBoardList[row+1][column]===null || (Boolean(opponentColor) === true && opponentColor!=coinColor))
          {
            kingList.push([row+1,column+1]);
          }
          opponentColor = checkOpponent(row+1,column+1);
          if(chessBoardList[row+1][column-1]===null || (Boolean(opponentColor) === true && opponentColor!=coinColor))
          {
            kingList.push([row+1,column-1]);
          }
          opponentColor = checkOpponent(row+1,column-1);
          if(chessBoardList[row+1][column]===null || (Boolean(opponentColor) === true && opponentColor!=coinColor))
          {
            kingList.push([row+1,column]);
          }
        }
        if(column+1<=7 || column-1>=0)
        {
          let opponentColor = coinColor;
          if(chessBoardList[row][column-1]===null ||(Boolean(opponentColor)=== true && opponentColor!=coinColor))
          {
            kingList.push([row,column-1]);
          }
          opponentColor = coinColor;
          if(chessBoardList[row][column+1]===null ||(Boolean(opponentColor)=== true && opponentColor!=coinColor))
          {
            kingList.push([row,column+1]);
          }
        }
        setPositionsList(kingList);
    }
    function handlePosition(coinType,row,column,coinColor)
    {
      const presentColumn = column;
      const presentRow = row;
        if(coinType === '♟')
        {
          console.log("Coin Color: ",coinColor);
          pawnHandler(row,column,coinColor);
        }
        else if(coinType === '♜')
        {
          RookHandler(row,column,coinColor);
        }
        else if(coinType === '♞')
        {
          knightHandler(row,column,coinColor);
        }
        else if(coinType === '♝')
        {
          bishopHandler(row,column,coinColor);
        }
        else if(coinType === '♚')
        {
          queenHandler(row,column,coinColor);      
        }
        else if(coinType === '♛')
        {
          kingHandler(row,column,coinColor);  
        }
    }

    function pickCoin(index,boxindex)
    {
      console.log("In Pick Coin");
      console.log("Index : ",index,boxindex);
      setPickPosList([index,boxindex]);
      setCoinPickFlag(true);
    } 

    function changingCoins(index,boxindex)
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
        } 
        else if(tempList[index][boxindex])
        {
          let coinColor = chessBoardList[index][boxindex][Object.keys(chessBoardList[index][boxindex])[0]];
          if(coinColor === 'white')
          {
            setShowWhiteCoinsList([...showWhiteCoinsList,tempList[index][boxindex]])
          }
          if(coinColor === 'black')
            {
              setShowBlackCoinsList([...showBlackCoinsList,tempList[index][boxindex]])
            }
          tempList[index][boxindex] = tempList[pickPosList[0]][pickPosList[1]];
          tempList[pickPosList[0]][pickPosList[1]] = null;
          setWhitePlayerFlag(!whitePlayerFlag);
        }
        setPickPosList([null,null]);
        setCoinPickFlag(!coinPickFlag);
    }

    function placeCoin(index,boxindex)
    {
      console.log("In Place Coin");
      console.log("Pick PocketLsit: ",pickPosList);
      console.log("place pos: ",[index,boxindex]);
      console.log("Coin Pick Flag: ",coinPickFlag);
      console.log("White Player Flag:",whitePlayerFlag);
      if(coinPickFlag === true )
      {
        const coinColor = chessBoardList[pickPosList[0]][pickPosList[1]][Object.keys(chessBoardList[pickPosList[0]][pickPosList[1]])[0]];
        const coinSymbol = Object.keys(chessBoardList[pickPosList[0]][pickPosList[1]])[0]
        if(coinColor === 'white' && whitePlayerFlag === true)
        {
        console.log("Yes True!!!");
        positionsList.map((value,pos)=>{
          if(value[0]===index && value[1]===boxindex)
          {
            console.log("condition Satisfied!!")
            changingCoins(index,boxindex);
            setPositionsList([]);
          }
        })
        
        
        }
        if(coinColor === 'black' && whitePlayerFlag === false)
        { 
          positionsList.map((value,pos)=>{
            if(value[0]===index && value[1]===boxindex)
            {
              console.log("Condition Satisfied!!!");
              changingCoins(index,boxindex);
              setPositionsList([]);
            }
          })
        }
      }
     }

    function handlePickPlace(index,boxindex)
    {
      let coinColor ='';
      if(chessBoardList[index][boxindex] !== null)
      {
         coinColor =  chessBoardList[index][boxindex][Object.keys(chessBoardList[index][boxindex])[0]];
      }
      
      console.log("POs: ",index,boxindex);
      console.log("Pick Pos List in Handle Pick: ",pickPosList);
      if((pickPosList[0] === null && pickPosList[1] === null) || (coinColor === 'white' && whitePlayerFlag === true) || (coinColor === 'black' && whitePlayerFlag === false))
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
          {/* <div className="coinsAndBoardFlex"> */}
        <CoinsDisplay list={showWhiteCoinsList} />
        <div className="chessBoardStyle">
            {
                chessBoardList.map((value,index)=>{ 
                   return (<div><div key={index} className="rowStyle">
                        {
                            value.map((box,boxindex)=>{
                              return <div className={((index%2===0 && boxindex%2===0)||(index%2!==0 && boxindex%2!==0) ? 'creamBoxStyle':'greenBoxStyle')} onClick={()=>{ handlePickPlace(index,boxindex)
                              }} key={boxindex}>
                               {chessBoardList[index][boxindex] ? <p className={showPlayer(index,boxindex)} onClick={()=> null}>
                                {Object.keys(chessBoardList[index][boxindex])[0]}</p> : <p>{chessBoardList[index][boxindex]}</p>}
                                {
                                  positionsList.map((value,pos)=>{
                                    if(value[0]===index && value[1]===boxindex)
                                    {
                                      let coinColor = checkOpponent(pickPosList[0],pickPosList[1]);
                                      if ((whitePlayerFlag === true && coinColor === 'white') || (whitePlayerFlag === false && coinColor==='black'))
                                      {
                                        return <div className="moveStyle"></div>
                                      }
                                    }
                                  })
                                }
                              </div>

                            })
                        }
                    </div>
                    </div>)
                })
            }
        </div>
        <CoinsDisplay list={showBlackCoinsList} />
        </div>
        {/* </div> */}
        </center>)
}