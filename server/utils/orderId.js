
let pad2 = (n)=> { return n < 10 ? '0' + n : n }

let generateTimeReqestNumber = () => {
let date = new Date();
return date.getFullYear().toString() + 
pad2(date.getMonth() + 1) + 
pad2(date.getDate()) + 
pad2(date.getHours()) + 
pad2(date.getMinutes())+
pad2(date.getSeconds())
}

let getId = () => {
    return generateTimeReqestNumber() + (Math.floor(Math.random() * 900) + 100)
}


module.exports = getId
