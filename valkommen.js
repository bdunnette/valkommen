People = new Mongo.Collection('people');

if (Meteor.isClient) {
  Template.CurrentVolunteers.helpers({
    volunteers: function () {
      return People.find();
    }
  });

  Template.CurrentVolunteers.events({
    'click button': function () {
      People.insert({name: chance.name()});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('CurrentVolunteers');
});

Router.route('/volunteer/:_id', function () {
  this.render('VolunteerView');
},{name: 'volunteer.view', data: function () {
    return {volunteer: People.findOne({_id: this.params._id})};
  }});
