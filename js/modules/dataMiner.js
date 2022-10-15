function getData(targeturl, callback) {
    fetch(targeturl) 
        .then(res => res.json()) 
        .then(data => { 
            console.log(data);

            
            callback(data);
        })

    .catch(error => console.error(error));

}

export { getData }