const Api_Farm = require('../models/farm');

const CreateFarm = (req,res,next) => {
    let newfarm = new Api_Farm ({
        name: req.body.name,
        crop: req.body.crop,
        acreage: req.body.acreage
    })

    newfarm.save((err, newfarm) => {
        if (err) return res.send('Error!');
        return res.send({msg: 'Farm Created!', newfarm});
    })
}

const GetFarms = async(req,res,next) => {
    try {
        let results = await Api_Farm.find();
        res.send(results);
    } catch (error) {
        res.send(error);
    }
}


const GetFarm = async(req,res,next) => {
    try {
        let result = await Api_Farm.findById(req.params._id);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
    
}

const UpdateFarm = async(req,res,next) => {
    try {
        let uid =req.params._id;
        await Api_Farm.findByIdAndUpdate(uid,{$set:req.body}, {new: true}, function(err,results){
        if (err) return res.send("Error!")
        res.send({msg: 'Farm Updated!', results})
        });
       
    } catch (error) {
        res.send(error);
    }
}

// controller to delete 
const DeleteFarm = async(req,res,next) => {
    try {
        let uid =req.params._id;
        let results = await Api_Farm.findByIdAndRemove(uid);
        res.send({msg: 'Farm Deleted!', results});

    } catch (error) {
        res.send(error)
    }    
}

// Controller to search for farm by name or crop
const SearchFarms = async(req,res,next) => {
    try {
        await Api_Farm.find( { $or: [{ name : { "$regex" : new RegExp(`${req.body.name}`), $options:"$i"} }, { crop : { "$regex" : new RegExp(`${req.body.crop}`), $options:"$i"} }]}, {_id: false, v: 0, createdAt: 0, updatedAt:0},function(err,farms){
            if (err) return res.send('Error!');
            if(req.body.name == ''){
                return res.send({success: false, data:'No farm name entered!'});
            }
            else if(req.body.crop == ''){
                return res.send({success: false, data:'No crop name entered!'});
            }
            if(farms.length > 0){
                res.send({success: true, data: farms});
            }else{
                res.send({success: false, data:'No farm found'});
            }
        });
    }catch (error) {
        res.send(error);
    }  
}

const FullSearchFarm = async(req,res,next) => {
    try {
        await Api_Farm.find({ '$text': {'$search' : `"\"${req.body.name}\""`} },{score:{$meta:'textScore'}},function(err,farm){
            if (err) return res.send('Error!');
            if(req.body.name == ''){
                return res.send({success: false, data:'No farm name entered!'});
            }
            else if(farm.length > 0){
                return res.send({success: true, data: farm});
            }else{
                return res.send({success: false, data:'No farm found'});
            }
        });
    } catch (error) {
        res.send(error);
    }  
}

module.exports = {CreateFarm, GetFarms, GetFarm, UpdateFarm, DeleteFarm, SearchFarms, FullSearchFarm};