class APIFeatures {
    constructor(query, queryString) {
        //Prouduct.find()
        //jo bhi result aayga isse excute hojayega
        this.query = query;

        //URL PARAMS req.query
        //jo bhi user filter lagayega url params me chala jayega
        this.queryString = queryString;

    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryString.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;


    }

    search() {
        //check if user provided keyword for avoud unnescc
        if (this.queryString.keyword) {
            const keyword = {
                name: {
                    $regex: this.queryString.keyword,
                    $options: "i",
                }
            };
            
            this.query = this.query.find({...keyword});
            
        }
        return this;
    
    }

    sort() {
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");

            this.query = this.query.sort(sortBy);

        } else {
            this.query = this.query.sort("-createdAt");
        }
        return this;

    }

    filter() {
    const query = {};

    // category filter
    if (this.queryString.category) {
        query.category = this.queryString.category;
    }

    // price filter
    if (this.queryString.price_gte) {
        query.price = { $gte: Number(this.queryString.price_gte) };
    }

    if (this.queryString.price_lte) {
        query.price = {
            ...query.price,
            $lte: Number(this.queryString.price_lte),
        };
    }

    this.query = this.query.find({...query});

    return this;
}


}

module.exports = APIFeatures;

