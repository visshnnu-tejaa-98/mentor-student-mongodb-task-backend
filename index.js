/*jshint esversion: 8 */
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const mongoClient = MongoClient;
const mongodb = require('mongodb');
// const dbUrl = 'mongodb://127.0.0.1:27017';
const dbUrl =
	'mongodb+srv://admin-vishnu:vishnu123@vishnu.1nuon.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const app = express();
const port = 3000;

app.use(cors());

let studentsArray = [];
let mentorsArray = [];

app.use(express.json());

app.get('/', async (req, res) => {
	try {
		let client = await mongoClient.connect(dbUrl);
		let db = client.db('student-mentor-task');
		let students = await db.collection('students').find().toArray();
		client.close();
		res.json(students);
	} catch (error) {
		console.log(error);
		res.json({ message: 'Something went wrong' });
	}
});

app.post('/', async (req, res) => {
	try {
		let client = await mongoClient.connect(dbUrl);
		let db = client.db('student-mentor-task');
		await db.collection('students').insertOne({ name: req.body.studentName, mentor: '' });

		client.close();
		res.json({ message: 'Student Added' });
	} catch (error) {
		console.log(error);
		res.json({ message: 'Something went wrong' });
	}
});

app.get('/mentors', async (req, res) => {
	try {
		let client = await mongoClient.connect(dbUrl);
		let db = client.db('student-mentor-task');
		let students = await db.collection('mentors').find({}).toArray();
		console.log(students);
		client.close();
		res.json(students);
	} catch (error) {
		console.log(error);
		res.json({ message: 'Something went wrong' });
	}
});

app.post('/mentors', async (req, res) => {
	try {
		let client = await mongoClient.connect(dbUrl);
		let db = client.db('student-mentor-task');
		await db.collection('mentors').insertOne({ name: req.body.mentorName });
		client.close();
		res.json({ message: 'mentor Added' });
	} catch (error) {
		console.log(error);
		res.json({ message: 'Something went wrong' });
	}
});

app.get('/mentor/:id', async (req, res) => {
	try {
		let client = await mongoClient.connect(dbUrl);
		let db = client.db('student-mentor-task');
		let id = mongodb.ObjectID(req.params.id);
		await db.collection('mentors').findOne({ _id: id });
		client.close();
		res.json({ message: 'mentor Added' });
	} catch (error) {
		console.log(error);
		res.json({ message: 'Something went wrong' });
	}
});

app.put('/mentor/:id', async (req, res) => {
	try {
		console.log(req.body.studentArray);
		let client = await mongoClient.connect(dbUrl);
		let db = client.db('student-mentor-task');
		let id = mongodb.ObjectID(req.params.id);
		await db
			.collection('mentors')
			.updateOne({ _id: id }, { $push: { sudents: req.body.studentArray } });
		client.close();
		res.json({ message: 'mentor Added' });
	} catch (error) {
		console.log(error);
		res.json({ message: 'Something went wrong' });
	}
});

app.put('/update/:id', async (req, res) => {
	try {
		// console.log(req.body.mentor);
		let client = await mongoClient.connect(dbUrl);
		let db = client.db('student-mentor-task');
		let id = mongodb.ObjectID(req.params.id);
		let y = await db.collection('students').findOne({ _id: id });
		// console.log(y);
		await db.collection('students').updateOne({ _id: id }, { $set: { mentor: req.body.mentor } });
		client.close();

		res.json({ message: 'Student Added' });
	} catch (error) {
		console.log(error);
		res.json({ message: 'Something went wrong' });
	}
});

app.delete('/:id', async (req, res) => {
	try {
		let client = await mongoClient.connect(dbUrl);
		let db = client.db('student-mentor-task');
		let id = mongodb.ObjectID(req.params.id);
		await db.collection('students').deleteOne({ _id: id });

		client.close();
		res.json({ message: 'Student Added' });
	} catch (error) {
		console.log(error);
		res.json({ message: 'Something went wrong' });
	}

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname + '/client/build/index.html'));
	});
});
app.listen(process.env.PORT || port, () => console.log(`server started on port : ${port}`));
