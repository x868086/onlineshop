const pad2 = (n) => { return n < 10 ? '0' + n : n }

const generateTimeReqestNumber = () => {
  const date = new Date()
  return date.getFullYear().toString() +
pad2(date.getMonth() + 1) +
pad2(date.getDate()) +
pad2(date.getHours()) +
pad2(date.getMinutes()) +
pad2(date.getSeconds())
}

const orderId = () => {
  return generateTimeReqestNumber() + (Math.floor(Math.random() * 900) + 100)
}

module.exports = orderId
