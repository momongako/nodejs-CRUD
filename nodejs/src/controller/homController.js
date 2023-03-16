
import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomPage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log('-----------------')
        console.log(data)
        console.log('-----------------')
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCURD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body)
    console.log(message);
    return res.send('post crud form sever')
}
// Object:{
//     key:'',
//     value:''
// }
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log(data)
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        // console.log('-----------------')
        // console.log(userData)
        // console.log('-----------------')
        // return res.send('found a user !')
        return res.render('editCRUD.ejs', {
            user: userData
        })
    }
    else {
        return res.send('user not found')
    }
    // console.log(req.query.id)

}
let putCURD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })

}
let deleteCURD = async (req, res) => {
    let id = req.query.id;

    if (id) {
        await CRUDService.deleteUserById(id)
        return res.send('Delete User succeed')
    }
    else {
        return res.send('user no found')
    }
}
module.exports = {
    getHomPage: getHomPage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCURD: postCURD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCURD: putCURD,
    deleteCURD: deleteCURD
}