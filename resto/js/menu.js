
    // Función para cargar el archivo XML y mostrar los datos
    function loadMenu() {
        fetch('https://raw.githubusercontent.com/xavifarmar/PAC5/refs/heads/main/resto/menu.xml')
            .then(response => response.text())
            .then(data => {
                // Parseamos el XML
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, "application/xml");

                // Obtenemos todas las categorías de menú
                const categories = xmlDoc.getElementsByTagName('category');
                
                // Iteramos sobre las categorías
                for (let i = 0; i < categories.length; i++) {
                    const category = categories[i];
                    const categoryName = category.getAttribute('name');
                    const items = category.getElementsByTagName('item');
                    
                    // Creamos el contenedor para la categoría
                    const categoryDiv = document.createElement('div');
                    categoryDiv.classList.add('col-lg-4', 'menu-wrap');
                    
                    // Creamos el encabezado de la categoría
                    const heading = document.createElement('div');
                    heading.classList.add('heading-menu');
                    const h3 = document.createElement('h3');
                    h3.classList.add('text-center', 'mb-5');
                    h3.textContent = categoryName;
                    heading.appendChild(h3);
                    categoryDiv.appendChild(heading);
                    
                    // Iteramos sobre los items de la categoría
                    for (let j = 0; j < items.length; j++) {
                        const item = items[j];
                        const itemName = item.getElementsByTagName('name')[0].textContent;
                        const itemPrice = item.getElementsByTagName('price')[0].textContent;
                        const itemDescription = item.getElementsByTagName('description')[0].textContent;
                        const itemImage = item.getElementsByTagName('image')[0].textContent;
                        
                        // Creamos la estructura del plato
                        const menuItem = document.createElement('div');
                        menuItem.classList.add('menus', 'd-flex', 'align-items-center');
                        
                        // Imagen del plato
                        const menuImg = document.createElement('div');
                        menuImg.classList.add('menu-img', 'rounded-circle');
                        const img = document.createElement('img');
                        img.classList.add('img-fluid');
                        img.src = itemImage;  // Ruta de la imagen
                        img.alt = itemName;
                        menuImg.appendChild(img);
                        
                        // Información del plato
                        const textWrap = document.createElement('div');
                        textWrap.classList.add('text-wrap');
                        const row = document.createElement('div');
                        row.classList.add('row', 'align-items-start');
                        
                        const colName = document.createElement('div');
                        colName.classList.add('col-8');
                        const nameH4 = document.createElement('h4');
                        nameH4.textContent = itemName;
                        colName.appendChild(nameH4);
                        
                        const colPrice = document.createElement('div');
                        colPrice.classList.add('col-4');
                        const priceH4 = document.createElement('h4');
                        priceH4.classList.add('text-muted', 'menu-price');
                        priceH4.textContent = itemPrice;
                        colPrice.appendChild(priceH4);
                        
                        row.appendChild(colName);
                        row.appendChild(colPrice);
                        textWrap.appendChild(row);
                        const descriptionP = document.createElement('p');
                        descriptionP.textContent = itemDescription;
                        textWrap.appendChild(descriptionP);
                        
                        menuItem.appendChild(menuImg);
                        menuItem.appendChild(textWrap);
                        categoryDiv.appendChild(menuItem);
                    }
                    
                    // Insertamos la categoría en el HTML
                    document.querySelector('#gtco-menu .container .row').appendChild(categoryDiv);
                }
            })
            .catch(error => console.error('Error al cargar el XML:', error));
    }

    // Llamamos a la función para cargar el menú al cargar la página
    window.onload = loadMenu;

