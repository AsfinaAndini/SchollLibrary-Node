const adminModel = require(`../models/index`).admin

const Op = require(`sequelize`).Op

exports.getAllAdmin = async (request, response) => {
   
    let admins = await adminModel.findAll()
    return response.json({
        success: true, 
        data: admins,
        message: `All Admins have been loaded`
    })
}


exports.findAdmin = async (request, response) => {
    
    let keyword = request.body.keyword

    
    let admins = await AdminModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: keyword } },
                { username: { [Op.substring]: keyword } },
                { address: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true, 
        data: admins,
        message: `All Admins have been loaded`
    })
} 


exports.addAdmin = (request, response) => {

    let newAdmin = {
        name: request.body.name, 
        address: request.body.address, 
        contact: request.body.contact,
        username: request.body.username,
        password: request.body.password
}


adminModel.create(newAdmin)
    .then(result => {

 return response.json({
    success: true,
    data: result,
    message: `New Admin has been inserted`
})
})
.catch(error => {

    return response.json({
        success: false, 
        message: error.message
})
})
}

exports.updateAdmin = (request, response) => {

let dataAdmin = {
        name: request.body.name, 
        address: request.body.address, 
        contact: request.body.contact,
        username: request.body.username,
        password: request.body.password
}

 
    let idAdmin = request.params.id


    adminModel.update(dataAdmin, { where: { id: idAdmin } })
        .then(result => {

    return response.json({
    success: true,
    message: `Data Admin has been updated`
})
})
.catch(error => {

return response.json({
    success: false, 
    message: error.message
})
})
}


exports.deleteAdmin = (request, response) => {

let idAdmin = request.params.id

 adminModel.destroy({ where: { id: idAdmin } })
.then(result => {
     
    return response.json({
    success: true,
    message: `Data Admin has been updated`
    })
    })
    .catch(error => {
    
    return response.json({
    success: false,
    message: error.message
})
})
}