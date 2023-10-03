const memberModel = require(`../models/index`).member

const Op = require(`sequelize`).Op

exports.getAllMember = async (request, response) => {
   
    let members = await memberModel.findAll()
    return response.json({
        success: true, 
        data: members,
        message: `All Members have been loaded`
    })
}


exports.findMember = async (request, response) => {
    
    let keyword = request.body.keyword

    
    let members = await memberModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: keyword } },
                { gender: { [Op.substring]: keyword } },
                { address: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true, 
        data: members,
        message: `All Members have been loaded`
    })
} 


exports.addMember = (request, response) => {

    let newMember = {
        name: request.body.name, 
        address: request.body.address, 
        gender: request.body.gender, 
        contact: request.body.contact
}


memberModel.create(newMember)
    .then(result => {

 return response.json({
    success: true,
    data: result,
    message: `New member has been inserted`
})
})
.catch(error => {

    return response.json({
        success: false, 
        message: error.message
})
})
}

exports.updateMember = (request, response) => {

let dataMember = {
    name: request.body.name,
    address: request.body.address,
    gender: request.body.gender, contact: request.body.contact
}

 
    let idMember = request.params.id


    memberModel.update(dataMember, { where: { id: idMember } })
        .then(result => {

    return response.json({
    success: true,
    message: `Data member has been updated`
})
})
.catch(error => {

return response.json({
    success: false, 
    message: error.message
})
})
}


exports.deleteMember = (request, response) => {

let idMember = request.params.id

 memberModel.destroy({ where: { id: idMember } })
.then(result => {
     
    return response.json({
    success: true,
    message: `Data member has been updated`
    })
    })
    .catch(error => {
    
    return response.json({
    success: false,
    message: error.message
})
})
}