const borrowModel = require(`../models/index`).borrow

const Op = require(`sequelize`).Op

exports.getAllBorrow = async (request, response) => {
   
    let borrows = await borrowModel.findAll()
    return response.json({
        success: true, 
        data: borrows,
        message: `All Borrow data have been loaded`
    })
}


exports.findBorrow = async (request, response) => {
    
    let keyword = request.body.keyword

    
    let borrows = await BorrowModel.findAll({
        where: {
            [Op.or]: [
                { id: { [Op.substring]: keyword } },
                { memberID: { [Op.substring]: keyword } },
                { adminID: { [Op.substring]: keyword } },
                { date_of_borrow: { [Op.substring]: keyword } },
                { date_of_return: { [Op.substring]: keyword } },
                { status: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true, 
        data: borrows,
        message: `All Borrow data have been loaded`
    })
} 


exports.addBorrow = (request, response) => {

    let newBorrow = {
        memberID: request.body.memberID, 
        adminID: request.body.adminID,
        date_of_borrow: request.body.date_of_borrow,
        date_of_return: request.body.date_of_return,
        status: request.body.status
}


borrowModel.create(newBorrow)
    .then(result => {

 return response.json({
    success: true,
    data: result,
    message: `New Borrow data has been inserted`
})
})
.catch(error => {

    return response.json({
        success: false, 
        message: error.message
})
})
}

exports.updateBorrow = (request, response) => {

let dataBorrow = {
    memberID: request.body.memberID, 
    adminID: request.body.adminID,
    date_of_borrow: request.body.date_of_borrow,
    date_of_return: request.body.date_of_return,
    status: request.body.status
}

 
    let idBorrow = request.params.id


    borrowModel.update(dataBorrow, { where: { id: idBorrow } })
        .then(result => {

    return response.json({
    success: true,
    message: `Data Borrow has been updated`
})
})
.catch(error => {

return response.json({
    success: false, 
    message: error.message
})
})
}


exports.deleteBorrow = (request, response) => {

let idBorrow = request.params.id

 borrowModel.destroy({ where: { id: idBorrow } })
.then(result => {
     
    return response.json({
    success: true,
    message: `Data Borrow has been updated`
    })
    })
    .catch(error => {
    
    return response.json({
    success: false,
    message: error.message
})
})
}