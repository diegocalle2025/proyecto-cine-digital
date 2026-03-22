const Productora = require('../models/Productora');
const { request, response } = require('express');

const getProductoras = async (req = request, res = response) => {

    try {

        const productoras = await Productora.find();

        res.status(200).json(productoras);

    } catch (error) {

        console.error("Error al obtener productoras:", error);
        res.status(500).json({ msg: "Error al obtener productoras" });

    }

};


const createProductora = async (req = request, res = response) => {

    try {

        const { nombre } = req.body;

        const productoraDB = await Productora.findOne({ nombre });

        if (productoraDB) {

            return res.status(400).json({
                msg: `La productora ${nombre} ya existe`
            });

        }

        const productora = new Productora(req.body);

        await productora.save();

        res.status(201).json(productora);

    } catch (error) {

        console.error("Error al crear productora:", error);
        res.status(500).json({ msg: "Error al crear productora" });

    }

};



const updateProductora = async (req, res) => {

 try {

  const { id } = req.params;

  const productoraActualizada = await Productora.findByIdAndUpdate(
   id,
   req.body,
   { new: true }
  );

  res.json(productoraActualizada);

 } catch (error) {

  console.log(error);

  res.status(500).json({
   msg: "Error al actualizar productora"
  });

 }

};


const deleteProductora = async (req, res) => {

 try {

  const { id } = req.params;

  await Productora.findByIdAndDelete(id);

  res.json({
   msg: "Productora eliminada correctamente"
  });

 } catch (error) {

  console.log(error);

  res.status(500).json({
   msg: "Error al eliminar productora"
  });

 }

};


module.exports = {
  getProductoras,
  createProductora,
  updateProductora,
  deleteProductora
};