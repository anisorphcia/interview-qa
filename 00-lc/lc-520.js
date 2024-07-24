var detectCapitalUse = function (word) {
    if(word.length < 2){
        return true
    }
    let continueBig = false
    let continueSmall = false
    for (let i = 0; i < word.length; ++i) {
        let asciiVal = word[i].charCodeAt(0)
        if(asciiVal >= '65' && asciiVal < '97'){
            continueBig = true
            if(continueSmall){
                return false
            }
            continueSmall = false
            continue
        } else if(asciiVal >= '97'){
            // 小写
            continueSmall = true
            if(i > 1 && continueBig){
                return false
            }
            continueBig = false
        }
    }
    return continueBig || continueSmall
};

