const express  = require('express');

const app = express();

//AUtoriser express à revevoir des déonne envoyer en JSON dans le body (le fameux Payload)
app.use(express.json());

let DB_articles = [
    { id: 1, title: 'Premier article', content: 'Contenu du premier article', author: 'Isaac' },
    { id: 2, title: 'Deuxième article', content: 'Contenu du deuxième article', author: 'Sanchez' },
    { id: 3, title: 'Troisième article', content: 'Contenu du troisième article', author: 'Toto' }
];



//Déclarer des routes
app.get('/articles',(request, response) =>{
    //Retourner la réponse json 
    return response.json(DB_articles);
});


app.get('/article/:id', (request, response) => {
    const id = parseInt(request.params.id); // Convertir l'ID en entier
    console.log(id);
    const foundArticle = DB_articles.find(article => article.id === id);
    console.log(foundArticle);
    if (foundArticle) {
        return response.json(foundArticle);
    } else {
        return response.status(404).json({ error: 'Article non trouvé' });
    }
});


app.post('/save-article', (request, response) => {
    //Récupérer l'article envoyé en json
    const articleJSON = request.body;

    let foundArticle = null;
    //ESt - ce on a un id envoyer dans le json 
    if (articleJSON.id != undefined || articleJSON.id) {
        foundArticle = DB_articles.find(article => article.id === articleJSON.id);
    }

    //si je trouve je modifie
    if (foundArticle) {
        foundArticle.title = articleJSON.title;
        foundArticle.content = articleJSON.content;
        foundArticle.author = articleJSON.author;

        return response.json(`L'article a été modifié avec succès`);
    }
    
    //sinon par défaut je créer
    DB_articles.push(articleJSON);

    /*
    const { title, content, author } = request.body;

    // Créer un nouvel article avec un ID unique
    const newArticle = {
        id: articles.length + 1, // Créer un nouvel ID (simple méthode)
        title: title || "mon nouveau article",
        content: content || "Contenu de test",
        author: author || "Tata"
    };
   

    // Ajouter le nouvel article à la liste des articles
 
    articles.push(newArticle);
     */

    // Renvoyer le nouvel article créé avec le statut 201 (créé)
    return response.status(201).json(`article a été créé avec succès`);
});


app.delete('/article/:id', (request, response) => {
    //trouver l'index
    const id = parseInt(request.params.id); // Convertir l'ID en entier

    //trouver l'index
    const foundArticleIndex = articles.findIndex(article => article.id === id);

    //si article trouve erreur
    if (foundArticleIndex < 0) {
        return reponse.json(`Impossible de supprimer un article inexistant`);
    }


    //supprimer grace à l'index
    DB_articles.splice(foundArticleIndex, 1);
    return response.json(`article a été supprimé`)












/*
    const id = parseInt(request.params.id); // Récupérer et convertir l'ID en entier
    const articleIndex = articles.findIndex(article => article.id === id);

    if (articleIndex === -1) {
        return response.status(404).json({ message: `Article avec l'id ${id} non trouvé` });
    }

    // Supprimer l'article de la liste
    articles.splice(articleIndex, 1);

    return response.json({ message: `Article avec l'id ${id} a été supprimé` });
    */
});


//Démarrer le server
//param 1 = le port ou on lance le serveur
//param 2 = que faire quand le serveur à démarrer (afficher un log)
app.listen(3000, () => {
    console.log("le serveur à démarré");
});

