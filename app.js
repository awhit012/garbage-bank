function Bank() {
	this.baseUrl = 'https://garbagecitybank.firebaseio.com';
	this.storiesExt = '/stories.json';
	this.storiesList = $('#stories-list');
	this.form = $('#form');
	this.storyTextArea = $("#textarea");
	this.horseIcon = '<img src="./assets/horse.png" style="width:60px;">'

}

Bank.prototype.getStories = function() {
	$.get(this.baseUrl + this.storiesExt, function(res, err) {
		app.displayStories(res);
	})
}

Bank.prototype.postStory = function(data) {
	$.post(this.baseUrl + this.storiesExt, JSON.stringify(data), function(res, status) {
  }).done(function() {
		app.storiesList.prepend("<li class='list-group-item'>" + app.horseIcon + data + "</li>")
  })
}

Bank.prototype.displayStories = function(stories) {
	var app = this;
	var tempArray = [];
	$.each(stories, function(index) {
		storyText = stories[index];
		tempArray.push(storyText);
	});
	$.each(tempArray.reverse(), function(index) {
		app.storiesList.append("<li class='list-group-item'>" + app.horseIcon + tempArray[index] + "</li>")
	})
}

Bank.prototype.addEventListeners = function() {
	var app = this;
	this.form.on('submit', function(event) {
		event.preventDefault();
		app.postStory(app.storyTextArea.val().trim());
		app.storyTextArea.val("")
	})
}


app = new Bank();
app.getStories();
app.addEventListeners();


$( document ).ready(function() {
	var offset = $(".wagons").offset();
	$(window).scroll(function(event) {
	  var st = $(this).scrollTop();
	  $(".wagons").css("left", st + offset.left);
	});
});


