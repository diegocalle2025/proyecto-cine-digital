const Director = require('../models/Director');
const { request, response } = require('express');

const getDirectores = async (req = request, res = response) => {

    try {

        const directores = await Director.find();

        res.status(200).json(directores);

    } catch (error) {

        console.error("Error al obtener directores:", error);
        res.status(500).json({ msg: "Error al obtener directores" });

    }

};


const createDirector = async (req = request, res = response) => {

    try {

        const { nombres } = req.body;

        const directorDB = await Director.findOne({ nombres });

        if (directorDB) {

            return res.status(400).json({
                msg: `El director ${nombres} ya existe`
            });

        }

        const director = new Director(req.body);

        await director.save();

        res.status(201).json(director);

    } catch (error) {

        console.error("Error al crear director:", error);
        res.status(500).json({ msg: "Error al crear director" });

    }

};


const updateDirector = async (req, res) => {

 try {

  const { id } = req.params;

  const directorActualizado = await Director.findByIdAndUpdate(
   id,
   req.body,
   { new: true }
  );

  res.json(directorActualizado);

 } catch (error) {

  console.log(error);

  res.status(500).json({
   msg: "Error al actualizar director"
  });

 }

};

const deleteDirector = async (req, res) => {

 try {

  const { id } = req.params;

  await Director.findByIdAndDelete(id);

  res.json({
   msg: "Director eliminado correctamente"
  });

 } catch (error) {

  console.log(error);

  res.status(500).json({
   msg: "Error al eliminar director"
  });

 }

};

module.exports = {
 getDirectores,
 createDirector,
 updateDirector,
 deleteDirector
};
