class APIFeatures {
  constructor(query, queryStr) {
    this.query = query; // La requête Mongoose à exécuter
    this.queryStr = queryStr; // Les paramètres de requête (query string) passés dans l'URL
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            // recherche depuis le nom du produit dans la collection
            $regex: this.queryStr.keyword, // utilisation d'un mot clé dans la recherche
            $options: "i", // paramètre pour ignorer la casse
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr }; // Créer une copie  de la  requête sans affecté l'original

    const removeFields = ["keyword", "limit", "page"]; // champs à exclure
    removeFields.forEach((e) => delete queryCopy[e]); //  supprime les champs à exclure

    //requête avancé pour les autres champs de la collection (price, ratings...)
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`); // Remplace les opérateurs par ceux de MongoDB

    // Ajoute les conditions filtrées à la requête
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
