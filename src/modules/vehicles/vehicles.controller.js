import { Router } from "express";

import { NewVehicle, UpdateVehicle, GetFilteredVehicles, GetAllVehicles, DeleteVehicle, SetFavorite, GetDataForFilters } from "./vehicles.service";

const router = Router()

router.post('/new', async (req, res) => {
  try {
    const savedData = await NewVehicle(req.body)
    res.status(201).send(savedData)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/update', async (req, res) => {
  try {
    const UpdatedVehicle = await UpdateVehicle(req.body)
    res.status(200).send(UpdatedVehicle)
  } catch (error) {

    if(error.message === 'Vehicle_not_found') res.status(404).send(error.message)
    else res.status(500).send(error.message)
  }
})

router.delete('/delete/:id?', async (req, res) => {

  try {
    const Deleted = await DeleteVehicle(req.params.id)
    res.status(200).send(Deleted)
  } catch (error) {
    if(error.message === 'Vehicle_not_found') res.status(404).send(error.message)
    else res.status(500).send(error.message)
  }
})

router.get('/get_all', async (req, res) => {
  try {
    const Data = await GetAllVehicles()
    res.status(200).send(Data)
  } catch (error) {
    if(error.message === 'no_vehicle_found') res.status(404).send(error.message)
    else res.status(500).send(error.message)
  }
})

router.get('/get_filtered', async (req, res) => {
  try {
    const Data = await GetFilteredVehicles(req.query)
    res.status(200).send(Data)
  } catch (error) {
    if(error.message === 'no_vehicle_found') res.status(404).send(error.message)
    else res.status(500).send(error.message)
  }
})

router.post('/set_favorite', async (req,res) => {
  try {
    const Favorite = await SetFavorite(req.body)
    res.status(200).send(Favorite)
  } catch (error) {
    res.status(500).send(error.message)
  }
})


router.get('/get_filters', async (req,res) => {
  try {
    const Filters = await GetDataForFilters()
    res.status(200).send(Filters)
  } catch (error) {
    res.status(500).send(error.message)
  }
})
export default router