const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
// Connection to the database "recipe-app"
mongoose
	.connect(
		MONGODB_URI,
		{

		}
	)
	.then((self) => {
		console.log(`Connected to the database: "${self.connection.name}"`);
		// Before adding any recipes to the database, let's remove all existing ones
		return Recipe.deleteMany();
	})
	.then(() => {
		// Run your code here, after you have insured that the connection was made
		//-------------------------------------------------------------------
		// Iteration 2
		Recipe.create({
			title: 'Arroz cubano - re-done after changes',
			level: 'UltraPro Chef',
			ingredients: [
				'3 1/2 pounds boneless pork shoulder, cut into large pieces',
				'1 tablespoon freshly ground black pepper',
				'1 tablespoon kosher salt, or more to taste',
				'2 tablespoons vegetable oil',
				'2 bay leaves',
				'2 teaspoons ground cumin',
				'1 teaspoon dried oregano',
				'1/4 teaspoon cayenne pepper',
				'1 orange, juiced and zested'
			],
			cuisine: 'American',
			dishType: 'main_course',
			image: 'https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg',
			duration: 160,
			creator: 'Chef John'
		});
	
		// Iteraction 3
		Recipe.insertMany(data).then((recipes) => {
			recipes.forEach((element) => {
				console.log(element.title);
			});

			//Iteration 4
			const promise1 = Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });

			//Iteration 5
			const promise2 = Recipe.deleteOne({ title: 'Carrot Cake' });

			//Iteracion 6
			Promise.all([ promise1, promise2 ]).then(() => {
				console.log('Everything has been inserted');
				mongoose.connection.close();
			});
		});
	})
	.then(() => {
		console.log('Create working');
		console.log('Título de la receta #1 ', recipe.title);
		console.log('----------------------------------------');
		console.log('Update working.');
		console.log('----------------------------------------');
		console.log('Delete working.');
		console.log('----------------------------------------');
		console.log('Insert many working');
		console.log('----------------------------------------');
	})
	.catch((error) => {
		console.error('Error connecting to the database', error);
	});