const panels = document.querySelectorAll('.panel');

const removeActiveClasses = () => {
    panels.forEach( panel => {
        panel.classList.remove('active');
    })
}

panels.forEach( panel => {
    panel.addEventListener('click', () => {
        removeActiveClasses();
        panel.classList.add('active');
    } );
});


//agregar background a partir de los resultados de un endpoint

const getPicture = async () => {   
    //fallback
    const container = document.querySelector('.container');
    const fallback = document.createElement('div');
    fallback.innerHTML = '<h1> Loading... </h1>';
    fallback.classList.add('fallback');
    container.before(fallback);

    try{
        const res = await fetch('https://picsum.photos/v2/list?limit=5');
        const datas = await res.json();

        datas.forEach( (data, i) => {
            panels[i].style.setProperty('background-image', `url(${data?.download_url})`);
        })
    }
    catch(err){
        console.log('There was an error')
    }

    //remove fallback
    fallback.remove(fallback);
    
}


getPicture();

