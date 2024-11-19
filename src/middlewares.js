export const logMiddleware = (req, res, next) => {
    console.log("Hello middleware!!");

    next();
};

export const logRequestMiddleware = (req, res, next) => {
    console.log(req.query);
    console.log(req.hostname);
    console.log(req.ip);
    console.log(req.body);
    
    next();
}

// REQUEST ---> ROTA DA API

// REQUEST ---> MIDDLEWARE ---> ROTA API