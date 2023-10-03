const bookModel = require(`../models/index`).book

const Op = require(`sequelize`).Op

const path = require('path')

const fs = require('fs')

exports.getAllBook = async (request, response) => {

    let books = await bookModel.findAll()
    return response.json({
        success: true,
        data: books,
        message: `All Book have been loaded`
    })
}


exports.findBook = async (request, response) => {

    let keyword = request.body.keyword


    let books = await BookModel.findAll({
        where: {
            [Op.or]: [
                { id: { [Op.substring]: keyword } },
                { isbn: { [Op.substring]: keyword } },
                { title: { [Op.substring]: keyword } },
                { author: { [Op.substring]: keyword } },
                { publisher: { [Op.substring]: keyword } },
                { category: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: books,
        message: `All Book have been loaded`
    })
}

const upload = require(`./upload-cover`).single(`cover`)

exports.addBook = (request, response) => {

    upload(request, response, async error => {

        if (error) {
            return response.json({ message: error })
        }

        if (!request.file) {
            return response.json({
                message: `Nothing to Upload`
            })
        }

        let newBook = {
            isbn: request.body.isbn,
            title: request.body.title,
            author: request.body.author,
            publisher: request.body.publisher,
            category: request.body.category,
            stock: request.body.stock,
            cover: request.file.filename
        }


        bookModel.create(newBook)
            .then(result => {

                return response.json({
                    success: true,
                    data: result,
                    message: `New Book has been inserted`
                })
            })
            .catch(error => {

                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
}

exports.updateBook = async (request, response) => {

    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }

        let id = request.params.id

        let dataBook = {
            isbn: request.body.isbn,
            title: request.body.title,
            author: request.body.author,
            publisher: request.body.publisher,
            category: request.body.category,
            stock: request.body.stock,
            cover: request.file.filename
        }

        if (request.file) {
            const selectedBook = await
                bookModel.findOne({
                    where: { id: id }
                })

            const oldCoverBook = selectedBook.cover

            const pathCover = path.join(dirname, `../cover`,
                oldCoverBook)

            if (fs.existsSync(pathCover)) {
                fs.unlink(pathCover, error =>
                    console.log(error))
            }

            book.cover = request.file.filename
        }



        bookModel.update(dataBook, { where: { id: idBook } })
            .then(result => {

                return response.json({
                    success: true,
                    message: `Data Book has been updated`
                })
            })
            .catch(error => {

                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
}


exports.deleteBook = async (request, response) => {

    const idBook = request.params.id

    const book = await bookModel.findOne({ where: { id: idBook } })
    const oldCoverBook = book.cover

    const pathCover = path.join(__dirname, `../cover`, oldCoverBook)

    if (fs.existsSync(pathCover)) {
        fs.unlink(pathCover, error => console.log(error))
    }

    bookModel.destroy({ where: { id: idBook } })
        .then(result => {

            return response.json({
                success: true,
                message: `Data Book has been updated`
            })
        })
        .catch(error => {

            return response.json({
                success: false,
                message: error.message
            })
        })
}

