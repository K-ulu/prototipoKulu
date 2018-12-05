    import R from 'ramda';
    import moment from 'moment';

    import ElementosObjetosAprendizaje from '../api/elementosObjetosAprendizaje';

    function datos(files){
        var data = [];
        files.map((aFile) => {
            data.push({
                id: aFile._id,
                title:aFile.meta.nombreElemento,
                fecha: aFile.meta.fechaInicio,
                descripcion:aFile.meta.descripcionElemento,
                usado: aFile.meta.usado
            })
        })

        return data;
    }

    //almacenamos las imagenes
    function images(files){
        var data = [];
        files.map((aFile) => {
            let link = ElementosObjetosAprendizaje.findOne({_id: aFile._id}).link();  //The "view/download" link      
            data.push({
                id: aFile._id,
                imageUrl:link
            })
        })
        return data;
    }

    function shuffled(inputArray) {
        let j, x, i;
        let a = R.clone(inputArray);
        for (i = a.length; i; i -= 1) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
        return a;
    }

    export function getSampleData(files) {
        var data = datos(files);

        let offset = 0;
        let orderedCities = R.map(city => {
            offset += Math.random() * 100;
            return R.merge({
                dateI: '3.5 M.a.C.',
                dateF: '1D.C.',
                buttonText: 'Play Video',
                onClick: () => {}
            }, city);
        }, (data));
        return orderedCities;
    }

    //Este obtiene las imagenes de manera aleatoria
    export function getImages(inOrder = true, files) {
        var data = images(files);

        const t = inOrder ? array => array : shuffled;
        let imagenes = R.map(city => {
            return R.merge({
            }, city);
        }, t(data));
        return t(imagenes);
    }
