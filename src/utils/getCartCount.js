const getGoodsCount = async (axios,handler) => {
    const {data:{result}} = await axios.get('/users/cartList')
    let count = 0
    result.forEach((item) => {
        if (item.checked) {
            count += parseInt(item.productNum)
        }
    })
    handler(count)
    localStorage.setItem("userGoodsCount", count);

}

export default getGoodsCount