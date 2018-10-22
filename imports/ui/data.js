    import R from 'ramda';
    import moment from 'moment';

    import ContenidosMultimedia from '../api/contenidosMultimedia';

    const ipsum = `Sed leo elit, pellentesque sit amet congue quis, ornare nec lorem. Phasellus tincidunt rhoncus magna,
    eget elementum odio rutrum fermentum. Ut a justo lacus. Maecenas blandit molestie felis ac viverra. Pellentesque
    sagittis ligula neque, sit amet feugiat massa tempor sed. Duis id bibendum ex, pulvinar tincidunt orci. Curabitur
    id sem urna. Maecenas sed elit malesuada, cursus ligula ut, vestibulum lorem. Suspendisse vitae ultrices libero.
    Mauris maximus, ligula vitae tincidunt scelerisque, ipsum magna euismod massa, eu vulputate enim est tempus sem.
    Maecenas id nibh vitae ante volutpat facilisis nec eget velit. Proin et ligula feugiat, auctor tellus sit amet,
    accumsan neque. Quisque porttitor lectus quis elit fermentum, a facilisis est suscipit. Integer consectetur dapibus
    nisi, ut lacinia enim vulputate vitae. Curabitur id diam mauris. Duis dictum, dolor at porttitor aliquet, justo libero
    mattis magna, eu pellentesque augue mauris eget erat. Pellentesque lacinia velit nec ullamcorper mollis. Pellentesque
    lacus tortor, maximus eget tincidunt non, luctus scelerisque odio. Suspendisse potenti. Etiam vel augue blandit, auctor
    sem sit amet, imperdiet dolor. Ut a quam laoreet, feugiat orci sed, feugiat nulla. Nulla gravida nisi eu ex egestas
    dapibus.`;

    function datos(files){
        var data = [];
        files.map((aFile) => {
            let link = ContenidosMultimedia.findOne({_id: aFile._id}).link();  //The "view/download" link
            let tipo = aFile.type;
            let arregloDeSubCadenas = tipo.split("/");
            tipo = arregloDeSubCadenas[0];
            if (tipo == "image"){
                data.push({
                    title:aFile.name,
                    imageUrl:link
                })
            }
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

    function randomLengthText(){
        const minLength = 50;
        return ipsum.slice(0, Math.random() * (R.length(ipsum) - minLength) + minLength);
    }

    export function getSampleData(inOrder = true, files) {
        var data = datos(files);

        let offset = 0;
        const t = inOrder ? array => array : shuffled;
        let orderedCities = R.map(city => {
            offset += Math.random() * 100;
            return R.merge({
                date: moment('2018-10-19').add(offset, 'days'),
                text: randomLengthText(),
                buttonText: 'Read More',
                onClick: () => {},
                extras: {
                    foo: '#Travel'
                }
            }, city);
        }, t(data));
        return t(orderedCities);
    }


