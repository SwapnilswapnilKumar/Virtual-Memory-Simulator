import React, { useState } from 'react';

import Header from "./component/header";
import Tables from "./component/tables";
import { refStringGen } from "./utils/randomRefStringGen";
import './App.css';
import "font-awesome/css/font-awesome.css";
import List from "./component/list";
import {
 
    firstInFirstOut,
    optimalPageReplacement,
    leastRecentlyUsed,
    mostRecentlyUsed,
    
  
} from "./algorithms";

const App = () => {
    const [referenceInputTextField, setReferenceInputTextField] = useState("0,2,3,1,2,1,4,5,6,2,4,5,3,2,3,8,5,7,2,0,6,4,1,9");
    const [referenceString, setReferenceString] = useState(["0", "2", "3", "1", "2", "1", "4", "5", "6", "2", "4", "5", "3", "2", "3", "8", "5", "7", "2", "0", "6", "4", "1", "9"]);
    const [frameNumber, setFrameNumber] = useState(4);
    const [resetTurns, setResetTurns] = useState(4);
    const [swapToggle, setSwapToggle] = useState(false);
    const [animationToggle, setAnimationToggle] = useState(true);
    
    const [selectedAlgorithm, setSelectedAlgorithm] = useState({ name: "Show All" });

    const handleRefChange = ({ target }) => {
        let { value } = target;
        if (value.match(/^$|^[0-9,]+$/) && !value.match(/,,+,*|[0-9][0-9]+[0-9]*/g)) {
            let tempReferenceString = [...value.split(",")];
            let filteredReferenceString = tempReferenceString.filter((v) => v !== "");
            setReferenceInputTextField(value);
            setReferenceString(filteredReferenceString);
        }
    };

    const handleFrameChange = ({ target }) => {
        if ((target.value <= 7 && target.value >= 3) || target.value === 0)
            setFrameNumber(target.value);
    };

    const handleResetTurnsChange = ({ target }) => {
        if (target.value <= 9 && target.value >= 0)
            setResetTurns(target.value);
    };

    const handleSwapToggle = () => {
        setSwapToggle(!swapToggle);
    };

    const handleRefStringGenClick = () => {
        let tempReferenceStringInput = refStringGen(24, 9);
        let tempReferenceString = [...tempReferenceStringInput.split(",")];
        let filteredReferenceString = tempReferenceString.filter((v) => v !== "");
        setReferenceInputTextField(tempReferenceStringInput);
        setReferenceString(filteredReferenceString);
    };

    const handleAnimationToggle = () => {
        setAnimationToggle(!animationToggle);
    };

   

    const handleListChange = (algorithm) => {
        setSelectedAlgorithm(algorithm);
    };

    const algorithms = [
        { name: "Show All" },
        { name: "First In First Out", f: firstInFirstOut },
        { name: "Optimal Page Replacement", f: optimalPageReplacement },
        { name: "Least Recently Used", f: leastRecentlyUsed },
        { name: "Most Receltly Used", f: mostRecentlyUsed },
        
    ];

    const filteredAlgorithm =
        selectedAlgorithm && selectedAlgorithm.f
            ? algorithms.filter(a => a.name === selectedAlgorithm.name)
            : algorithms.filter(a => a.name !== "Show All");

    return (
        <main className="container">
            <div className="row">
                <div className="col">
                    <Header
                        handleRefChange={handleRefChange}
                        handleFrameChange={handleFrameChange}
                        handleResetTurnsChange={handleResetTurnsChange}
                        handleRefStringGenClick={handleRefStringGenClick}
                        handleSwapToggle={handleSwapToggle}
                        handleAnimationToggle={handleAnimationToggle}
        
                        frameNumber={frameNumber}
                        resetTurns={resetTurns}
                        referenceInputTextField={referenceInputTextField}
                        animationToggle={animationToggle}
                        swapToggle={swapToggle}
                    />
                </div>
                <div className="col-3 mt-2 list-group-outer-padding">
                    <List
                        algorithms={algorithms}
                        handleListChange={handleListChange}
                        selectedAlgorithm={selectedAlgorithm}
                    />
                </div>
            </div>
            <div>
                <Tables
                    frameNumber={frameNumber}
                    resetTurns={resetTurns}
                    referenceString={referenceString}
                    swapToggle={swapToggle}
                    animationToggle={animationToggle}
                    algorithms={filteredAlgorithm}
                />
            </div>
        </main>
    );
};

export default App;
