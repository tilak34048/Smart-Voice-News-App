import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles.js";
import wordToNumbers from "words-to-numbers";

const alanKey=process.env.React_App_ALANKEY_API;

const App=()=>{
  const [newsArticles, setNewsArticles]= useState([]);
  const [activeArticle, setActiveArticle]= useState(-1);
  const classes=useStyles();

  useEffect(()=>{
    alanBtn({
      key:alanKey,
      onCommand:({command, articles, number})=>{
        if(command==="newHeadlines"){
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if(command==="highlight")
        {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        }else if(command==="open"){
          const parsedNumber=number.length>2 ? wordToNumbers(number,{fuzzy:true}):number;
          const article=articles[parsedNumber-1];
          if(parsedNumber>20){
            alanBtn().playText("please try that again");
          }else if(article){
            window.open(article.url,"_blank");
            alanBtn().playText("Opening...");
          }
        }
      }
    })
  },[])
  return(
    <div>
    <div className={classes.logoContainer}>
      <img src="https://i2.wp.com/synqqblog.wpcomstaging.com/wp-content/uploads/2020/12/Engaging-Gamers-in-a-New-Way.jpg?w=1592&ssl=1" className={classes.alanLogo} alt="alan logo"></img>
    </div>
    <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </div>
  );
}

export default App;
