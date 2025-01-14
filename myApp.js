require('dotenv').config();

const mongoose = require("mongoose");
const { Schema } =  mongoose;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const newPerson = new Person({
    name: "Elizabeth Mary",
    age: 33,
    favoriteFoods: ["Cireng", "Lumpia", "Dimsum"]
  });

  newPerson.save(function(err, data) {
    if (err) {
      return console.error("ERROR");
    }
    done(null, data);
 });
};

const createManyPeople = (arrayOfPeople, done) => {
  const people = Person.create(arrayOfPeople, function(err, data) {
    if (err) {
      return console.error("ERROR");
    }
    done(null, data);
 });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, data) {
    if (err) {
      return console.error("ERROR");
    }
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: [food] }, function(err, data) {
    if (err) {
      return console.error("ERROR");
    }
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if (err) {
      return console.error("ERROR");
    }
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person) {
    if (err) {
      return console.error("ERROR");
    }

    person.favoriteFoods.push(foodToAdd);
    person.save(function(err, data) {
      if (err) {
        return console.error("ERROR");
      }
      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function(err, person) {
    if (err) {
      return console.error("ERROR");
    }
    done(null, person);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, person) {
    if (err) {
      return console.error("ERROR");
    }
    done(null, person);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function(err, jsonObject) {
    if (err) {
      return console.error("ERROR");
    }
    done(null, jsonObject);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 'asc' })
    .limit(2)
    .select(['name', 'favoriteFoods'])
    .exec(function(err, documents) {
      if (err) {
        return console.error("ERROR");
      }
      done(null, documents);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
