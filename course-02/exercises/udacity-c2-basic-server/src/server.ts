import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { Car, cars as cars_list } from './cars';

(async () => {
  let cars:Car[]  = cars_list;

  //Create an express application
  const app = express();
  //default port to listen
  const port = 8082;

  //use middleware so post bodies 
  //are accessible as req.body.{{variable}}
  app.use(bodyParser.json());

  // Root URI call
  app.get( "/", ( req: Request, res: Response ) => {
    res.status(200).send("Welcome to the Cloud!");
  } );

  // Get a greeting to a specific person 
  // to demonstrate routing parameters
  // > try it {{host}}/persons/:the_name
  app.get( "/persons/:name",
    ( req: Request, res: Response ) => {
      let { name } = req.params;

      if ( !name ) {
        return res.status(400)
          .send(`name is required`);
      }

      return res.status(200)
        .send(`Welcome to the Cloud, ${name}!`);
    } );

  // Get a greeting to a specific person to demonstrate req.query
  // > try it {{host}}/persons?name=the_name
  app.get( "/persons/", ( req: Request, res: Response ) => {
    let { name } = req.query;

    if ( !name ) {
      return res.status(400)
        .send(`name is required`);
    }

    return res.status(200)
      .send(`Welcome to the Cloud, ${name}!`);
  } );

  // Post a greeting to a specific person
  // to demonstrate req.body
  // > try it by posting {"name": "the_name" } as 
  // an application/json body to {{host}}/persons
  app.post( "/persons",
    async ( req: Request, res: Response ) => {

      const { name } = req.body;

      if ( !name ) {
        return res.status(400)
          .send(`name is required`);
      }

      return res.status(200)
        .send(`Welcome to the Cloud, ${name}!`);
    } );

  // it should be filterable by make with a query parameter
  app.get('/cars/', (request: Request, response: Response) => {
    const { make } = request.query;

    let filteredCars = cars;
    if ( make ) {
      filteredCars = cars.filter(car => car.make === make);
    }

    return response.status(200).send(filteredCars);
  });

  // it should require id
  // it should fail gracefully if no matching car is found
  app.get('/cars/:id', (request: Request, response: Response) => {
    const { id } = request.params;

    if ( !id ) {
      return response.status(400)
        .send(`id is required`);
    }

    const car: Car = cars.find(car => car.id.toString() === id);

    if(!car) {
      return response.status(404).send('car not found');
    }

    return response.status(200).send(car);
  });

  // it should require id, type, model, and cost
  app.post('/cars', async (request: Request, response: Response) => {
    const { id, type, model, cost, make } = request.body;

    if ( !id || !type || !model || !cost) {
      return response.status(400)
        .send(`id, type, model, and cost are required`);
    }

    const car: Car = {
      id: id,
      make: make,
      type: type,
      model: model,
      cost: cost
    }
    cars.push(car);

    return response.status(201)
      .send(car);
  });

  // Start the Server
  app.listen( port, () => {
    console.log( `server running http://localhost:${ port }` );
    console.log( `press CTRL+C to stop server` );
  } );
})();
