import axios from 'axios';


export async function AdminPostApi(url : string, data : any){

    try {
        console.log("url is", url);
        console.log("data is", data);
        
        let response = await fetch(url, {
            method : 'POST',
            body : JSON.stringify(data),
        })
        
        let result = await response.json();
        console.log(result);
        return {result}

    } catch(e){
        console.log(e);
        return {success : false, message : "Error occured at client side"}
    }
    
}

export async  function AdminGetApi(url : string){

    try{
        
        let response = await fetch(url)
        // let response = await axios.get(url)
        
        let result = await response.json();
        return {result}
        
    } catch(e){
        console.log(e);
        return {success : false, message : "Error occured at client side"}
    }
    
}

export async  function DeleteApi(url : string, body : any, queryParams : any){

    try{
        
        let data = await axios.delete(url)
        console.log("in delete api", data)
        return data
        
    } catch(e){
        console.log(e);
        return {success : false, message : "Error occured at client side"}
    }
    
}