import * as ai from '../services/ai.service.js';

export const getResult = async (req, res) => {
    try{
        const {prompt} = req.query;
        const result = await ai.generateResult(prompt);
        res.send(result);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
}