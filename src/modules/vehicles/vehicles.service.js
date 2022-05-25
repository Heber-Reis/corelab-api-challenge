import Vehicles from './vehicles.model'

export const NewVehicle = async (data) => {

  try {
    const savedData = await Vehicles.create(data)
    return savedData
  } catch (error) {
    throw error
  }

}

export const UpdateVehicle = async (data) => {

  try {
    const UpdatedVehicle = await Vehicles.findOneAndReplace({_id: data._id}, data.newData, {new: true})
    if(UpdatedVehicle === null) throw new Error('Vehicle_not_found')
    return UpdatedVehicle
  } catch (error) {
    throw error
  }
}

export const DeleteVehicle = async (data) => {

  try {
    const DeletedVehicle = await Vehicles.findByIdAndDelete(data._id)
    return DeletedVehicle
  } catch (error) {
    throw error
  }
}

export const GetAllVehicles = async () => {

  try {
    const DataVehicles = await Vehicles.find()
    if(DataVehicles === null) throw new Error('no_vehicle_found')
    return DataVehicles
  } catch (error) {
    throw error
  }

}

export const GetFilteredVehicles = async (data) => {

  try {
    let VehiclesData = {}
    const Search = []
    const filter = data.filters

    //manipulando o objeto de filtro para deixar no formato aceito pelo mongoDB
    if(filter.price !== undefined) {
      filter.price['$gte'] = filter.price['minPrice']
      filter.price['$lte'] = filter.price['maxPrice']
      delete filter.price['minPrice']
      delete filter.price['maxPrice']
    
      Object.entries(filter.price).forEach(([key, value]) => {
        if (value === undefined) delete filter.price[key]
      })
  
      (JSON.stringify(filter.price) === '{}') && delete filter['price']
    }

    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== 'Todos') {
        Search.push({ [key]: value })
      }
    })

    VehiclesData = Search.length > 0 ? await Vehicles.find({ $and: Search }) : await Vehicles.find()

    //filtrando pela palavra chave
    let DataVehicles = []
    DataVehicles = VehiclesData.filter(Element => 
      Object.entries(Element._doc).find(([key,value]) => {
        if(value === data.keyword || data.keyword === undefined){
          return true
        }
      })
    )

    if(VehiclesData.length === 0) throw new Error('no_vehicle_found')
    return DataVehicles

  } catch (error) {
    throw error
  }
}

export const SetFavorite = async (data) => {

  try {
    const Favorite = await Vehicles.updateOne({_id: data._id},{isFavorite: data.isFavorite})
    return Favorite
  } catch (error) {
    throw error
  }
}

export const GetDataForFilters = async () => {
  try {
    const DataFilters = {
      brand : await Vehicles.distinct("brand"),
      color: await Vehicles.distinct("color"),
      year: await Vehicles.distinct("year")
    }
    return DataFilters
  } catch (error) {
    throw error
  }
}