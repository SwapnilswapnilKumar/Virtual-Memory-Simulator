import {floor} from "lodash";

// FIFO algo
export function firstInFirstOut(referenceString, frameNumber) {
    let pageInMem = [];
    let pageFaults = [];
    let pageInMemArray = [];
    let pageNotInMem = [];
    let pageNotInMemArray = [];
    let referenceMapArray = [];
    for (let i = 0; i < referenceString.length; i++) {
            if (pageInMem.includes(referenceString[i])) {
                pageFaults.push('');
            } else {

                pageFaults.push('F');

                if (pageInMem.length < frameNumber) {
                    pageInMem.unshift(referenceString[i]);
                } else {
                    if (pageNotInMem.length >= frameNumber) {
                        pageNotInMem.pop();
                    }
                    pageNotInMem.unshift(pageInMem.pop());

                    pageInMem.unshift(referenceString[i]);
                }
            }
        pageInMemArray.push([...pageInMem]);
        pageNotInMemArray.push([...pageNotInMem]);
    }
    return {pageInMemArray, pageFaults, pageNotInMemArray, referenceMapArray};
}

// LRU->

export function leastRecentlyUsed(referenceString, frameNumber){
    let pageInMem = [];
    let pageFaults = [];
    let pageInMemArray = [];
    let pageNotInMem = [];
    let pageNotInMemArray = [];
    let referenceMapArray = [];
    for (let i = 0; i < referenceString.length ; i++)
    {
        if (pageInMem.includes(referenceString[i])){
            pageFaults.push('');
            pageInMem.splice(pageInMem.indexOf(referenceString[i]),1);
            pageInMem.unshift(referenceString[i]);
        }
        else{
            pageFaults.push('F');
            if (pageInMem.length < frameNumber){
                pageInMem.unshift(referenceString[i]);
            }
            else{
                if (pageNotInMem.length >= frameNumber) {
                    pageNotInMem.pop();
                }
                pageNotInMem.unshift(pageInMem.pop());
                pageInMem.unshift(referenceString[i]);
            }
        }
        pageInMemArray.push([...pageInMem]);
        pageNotInMemArray.push([...pageNotInMem]);
    }
    return {pageInMemArray, pageFaults, pageNotInMemArray, referenceMapArray};
}





// OPR-:>
export function optimalPageReplacement(referenceString, frameNumber) {
    let pageInMem = [];
    let pageFaults = [];
    let pageInMemArray = [];
    let pageNotInMem = [];
    let pageNotInMemArray = [];
    let referenceMapArray = [];

    for (let i = 0; i < referenceString.length; i++) {
        let currentPage = referenceString[i];

        if (pageInMem.includes(currentPage)) {
            pageFaults.push('');
        } else {
            pageFaults.push('F');
            if (pageInMem.length < frameNumber) {
                pageInMem.push(currentPage);
            } else {
                let farthestIndex = -1;
                let pageToReplace = pageInMem[0];

                for (let p of pageInMem) {
                    let nextUse = referenceString.indexOf(p, i + 1);
                    if (nextUse === -1) {
                        pageToReplace = p;
                        break;
                    } else if (nextUse > farthestIndex) {
                        farthestIndex = nextUse;
                        pageToReplace = p;
                    }
                }

                let removedPageIndex = pageInMem.indexOf(pageToReplace);
                let removedPage = pageInMem[removedPageIndex];

                pageInMem[removedPageIndex] = currentPage;

                if (pageNotInMem.length >= frameNumber) {
                    pageNotInMem.pop();
                }
                pageNotInMem.unshift(removedPage);
            }
        }

        pageInMemArray.push([...pageInMem]);
        pageNotInMemArray.push([...pageNotInMem]);
    }

    return { pageInMemArray, pageFaults, pageNotInMemArray, referenceMapArray };
}


// MRU ;->
export function mostRecentlyUsed(referenceString, frameNumber) {
    let pageInMem = [];
    let pageFaults = [];
    let pageInMemArray = [];
    let pageNotInMem = [];
    let pageNotInMemArray = [];
    let referenceMapArray = [];

    for (let i = 0; i < referenceString.length; i++) {
        let currentPage = referenceString[i];

        if (pageInMem.includes(currentPage)) {
            pageFaults.push('');
            pageInMem.splice(pageInMem.indexOf(currentPage), 1);
            pageInMem.unshift(currentPage);
        } else {
            pageFaults.push('F');
            if (pageInMem.length < frameNumber) {
                pageInMem.unshift(currentPage);
            } else {
                let removedPage = pageInMem.shift();
                pageInMem.unshift(currentPage);

                if (pageNotInMem.length >= frameNumber) {
                    pageNotInMem.pop();
                }
                pageNotInMem.unshift(removedPage);
            }
        }

        pageInMemArray.push([...pageInMem]);
        pageNotInMemArray.push([...pageNotInMem]);
        referenceMapArray.push([...referenceString]);
    }

    return { pageInMemArray, pageFaults, pageNotInMemArray, referenceMapArray };
}


