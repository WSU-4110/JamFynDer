import React from "react";
import "./TutorialPage.css"

const TutorialPage = () => {
    return(
        <div className="TutorialPage">
            <div className="row">
                <div className="column">
                    <h1>Don't know where to start?</h1>
                    <p>Watch the tutorial</p>
                    
                </div>
                <div className="column">
                <iframe width="420" height="345" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>   
                </div>
            </div>
            

            
        </div>
    )
}

export default TutorialPage;