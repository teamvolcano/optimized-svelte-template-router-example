


export default function(path){
    let comp = false;
    import(path).then((module) => {
        comp = module.default;
    });

    // do while loop until myImport is loaded
    // then return the default export
    while (!comp) {
        // wait for 100ms 
        // before checking again
        setTimeout(() => {}, 100);
        
    }

    return comp;
}