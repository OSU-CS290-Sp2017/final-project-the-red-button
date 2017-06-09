////////Provent duplicates//////
var textArray = [];
var numLeft = document.getElementsByClassName('word-container-left')[0].getElementsByTagName('p').length;
var numRight = document.getElementsByClassName('word-container-right')[0].getElementsByTagName('p').length;

for (var i = 0; i != numLeft; i++){
  textArray.push(document.getElementsByClassName('word-container-left')[0].getElementsByTagName('p')[i].textContent)
}
for (var i = 0; i != numRight; i++){
  textArray.push(document.getElementsByClassName('word-container-right')[0].getElementsByTagName('p')[i].textContent)
}

////////Send to Server/////////
function storeData(word, side){
    var postRequest = new XMLHttpRequest();
    postRequest.open('POST', '/');
    postRequest.setRequestHeader('Content-Type', 'application/json');

    if (side == 'left'){
        var bodyPost = {
          button: word,
          right: '',
          left: word
        }
    } else if (side == 'right'){
        var bodyPost = {
          button: word,
          right: word,
          left: ''
        }
    }
    postRequest.send(JSON.stringify(bodyPost));
}

////////Model = visable////////
var leftRight = 0;
function unHide (event){
  for(var i = 0; i != buttonTextModle.length; i++){
    buttonTextModle[i].style.display = "block";
  }
  var check = document.getElementById('text').textContent;
  for (var i = 0; i != textArray.length; i++){
    if (check == textArray[i]){
      var copy = 1;
    }
  }
  if (!copy){
    textArray.push(check);

    //Add new word to left/right containers
    if (leftRight == 0){
      var leftContainer = document.getElementsByClassName('word-container-left')[0];
      var leftParagraph = document.createElement('p');
      leftParagraph.setAttribute('id','word-left');
      leftParagraph.setAttribute('class','text-left');
      leftParagraph.textContent = check;
      leftContainer.appendChild(leftParagraph);
      leftRight++;
      storeData(check, 'left');

    } else if(leftRight == 1){

      var rightContainer = document.getElementsByClassName('word-container-right')[0];
      var rightParagraph = document.createElement('p');
      rightParagraph.setAttribute('id','word-right');
      rightParagraph.setAttribute('class','text-right');
      rightParagraph.textContent = check;
      rightContainer.appendChild(rightParagraph);
      leftRight--;
      storeData(check, 'right');
    }

  }
}

function unVanish (event){
  for(var i = 0; i != editTextModle.length; i++){
    editTextModle[i].style.display = "block";
  }
}

////////Red button eventHandeling/////////
var redButton = document.getElementById('map');
var redButtonTextEvent = document.getElementById('text');
redButton.addEventListener('click', unHide);
redButtonTextEvent.addEventListener('click', unHide);
var buttonTextModle = document.getElementsByClassName('hidden');
var textArray;

////////Edit button eventHandeling////////
var editButton = document.getElementById('edit');
editButton.addEventListener('click', unVanish);
var editTextModle = document.getElementsByClassName('vanish');

////////Model = Hidden////////
function hide(event){
  for(var i = 0; i != buttonTextModle.length; i++){
    buttonTextModle[i].style.display = 'none';
  }
}

var exit = document.getElementById('text-display');
exit.addEventListener('click', hide);


////////EditText Window eventHandeling////////
function Window(event){
  var redButtonText = document.getElementById('edit-text-input');

  if (event.target.className == 'cancel-button'){
    for(var i = 0; i != editTextModle.length; i++){
      editTextModle[i].style.display = 'none';
    }
    document.getElementById('edit-text-input').value = '';

  } else if (event.target.className == 'ok-button'){
      if (document.getElementById('edit-text-input').value == ''){
        alert("Fill in the box before pressing 'ok'");
      } else {
          redButtonText = document.getElementById('edit-text-input').value;
          document.getElementById('text').innerHTML = redButtonText;
          document.getElementById('displayText').innerHTML = "That was " + redButtonText;
          for(var i = 0; i != editTextModle.length; i++){
            editTextModle[i].style.display = 'none';
          }
          document.getElementById('edit-text-input').value = '';
      }
  }
}

var cancelButton = document.getElementById('cancel');
cancelButton.addEventListener('click', Window);

var okButton = document.getElementById('ok');
okButton.addEventListener('click', Window);
