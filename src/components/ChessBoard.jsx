import React, { useEffect } from "react";
import { useState } from "react"; 
import "../App.css";
export default function ChessBoard()
{  
    const [chessBoardList,setChessBoardList] = useState([[{'♜':'white'},{'♞':'white'},{'♝':'white'},{'♚':'white'},{'♛':'white'},{'♝':'white'},{'♞':'white'},{'♜':'white'}], [{"♟":"white"},{"♟":"white"},{"♟":"white"},{"♟":"white"},{"♟":"white"},{"♟":"white"},{"♟":"white"},{"♟":'white'}],[null, null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null, null,null,null,null,null,null,null],[{"♟":"black"},{"♟":"black"},{"♟":"black"},{"♟":"black"},{"♟":"black"},{"♟":"black"},{"♟":"black"},{"♟":"black"}],[{'♜':"black"},{'♞':"black"},{'♝':"black"},{'♚':"black"},{'♛':"black"},{'♝':"black"},{'♞':"black"},{'♜':"black"}]]);
    const [whitePlayerFlag ,setWhitePlayerFlag] = useState(true);
    const [blackPlayerFlag ,setBlackPlayerFlag] = useState(false);
    const [positionsList , setPositionsList] = useState([]);
    const [pickPosList,setPickPosList] =useState([null,null])
    const [coinPickFlag ,setCoinPickFlag] = useState(false);
    

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

    function pawnHandler(row,column,coinColor)
    {
      if(coinColor === 'black')
        {
          if(row === 6)
          {
          let pawnList = [];
          let indicesList =[]
          indicesList.push(row-1);
          indicesList.push(column);
          pawnList.push(indicesList);
          indicesList =[]
          indicesList.push(row-2);
          indicesList.push(column);
          pawnList.push(indicesList);
          console.log(pawnList);
          setPositionsList(pawnList);
          } 
          else
          {
            let  pawnList = [];
            let indicesList =[];
            indicesList.push(row-1);
            indicesList.push(column);
            pawnList.push(indicesList);
            console.log(pawnList);
            setPositionsList(pawnList);
          }
          
        }
        else
        {
          if(row === 1)
            {
            let pawnList = []
            let indicesList =[]
            indicesList.push(row+1);
            indicesList.push(column);
            pawnList.push(indicesList);
            indicesList =[]
            indicesList.push(row+2);
            indicesList.push(column);
            pawnList.push(indicesList);
            console.log(pawnList);
            setPositionsList([...pawnList]);
            } 
            else
            {
              let pawnList = []
              let indicesList =[]
              indicesList.push(row+1);
              indicesList.push(column);
              pawnList.push(indicesList);
              setPositionsList([...pawnList]);
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
        opponentColor = checkOpponent(row,column);
        if(opponentColor=== true && coinColor != opponentColor)
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
            opponentColor = checkOpponent(row,column);
            // console.log("opponent color in while loop:",opponentColor);
            if(opponentColor === true && coinColor != opponentColor)
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
            opponentColor = checkOpponent(row,column);
            if(opponentColor === true && coinColor != opponentColor)
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
            }
          }
      }
      
      column = presentColumn -1;
      row = presentRow;
      if(column>=0)
      {
        let opponentColor = checkOpponent(row,column);
        while(column>=0 && (chessBoardList[row][column] === null || coinColor != opponentColor))
          {
            opponentColor = checkOpponent(row,column);
            if(opponentColor === true && coinColor != opponentColor)
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
            }
          }
      }
        setPositionsList([...rookList]);
        console.log("Elephant: ",rookList);
    }

    function knightHandler(row,column)
    {
      const presentColumn = column;
      const presentRow = row;
      while(column<=7 && row<=7 && chessBoardList[row][column]===null)
      {

      }
    }

    function bishopHandler(row,column)
    {

    }

    function queenHandler(row,column)
    {

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
          knightHandler(row,column,coinColor);  
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
        changingCoins(index,boxindex);
        
        }
        if(coinColor === 'black' && whitePlayerFlag === false)
        { 
          changingCoins(index,boxindex);

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