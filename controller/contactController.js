
const Contact = require('../model/contactModel')

const getAllContacts = async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts)
};

//post Contact
//route '/'
//access to public
const createContact = async (req, res) => {
    console.log("The request body is:", req.body);
    const { name, phone, email } = req.body;
    if (!name || !phone || !email) {
        res.status(400);
        throw new Error("All Data is necessary to provide!")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
    })
    res.status(201).json(contact)
};

//get Contact id
//route '/'
//access to public
const getContact = async (req, res) => {
    res.status(200).json({ message: `Get This Contacts for ${req.params.id}` })
};

//updateContact
//route '/'
//access to public
const updateContact = async (req, res) => {
    res.status(200).json({ message: `Update this Contacts for ${req.params.id}` })
};

//delete Contact
//route '/'
//access to public
const deleteContact = async (req, res) => {
    res.status(201).json({ message: `Delete that Contacts from ${req.params.id}` })
};

module.exports = {
    createContact,
    getContact,
    getAllContacts,
    updateContact,
    deleteContact
};