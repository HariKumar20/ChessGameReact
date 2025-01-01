import React from "react";
import "../App.css";

export default function CoinsDisplay(props)
{
    return(
        <>
        <div className="coinsDisplayDiv">
            <div className="coinsFlex">
            {
                props.list.map((value,index)=>{
                    return(
                        <p className={value[Object.keys(value)[0]]==='white' ? 'coinsStyleWhite' : 'coinsStyleBlack'}>{Object.keys(value)}</p>
                    )
                })
            }
            </div>
        </div>
        </>
    )
}