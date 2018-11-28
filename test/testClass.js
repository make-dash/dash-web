//Import and config testing files
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

//Import our model
const Student = require('../models/Student');

chai.use(chaiHttp);


