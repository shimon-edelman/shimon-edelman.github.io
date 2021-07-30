function togglePlusMinusButton(element) {
	//we take the last 8 characters of the source and compare it to plus.gif and minus.gif
	strLength = element.src.length;
	imgSource = element.src.substr(strLength - 9, 9);
	if (imgSource == 'minus.gif') {
		element.src = 'plus_.gif';
	}
	else if (imgSource == 'plus_.gif') {
		element.src = 'minus.gif';
	}
}

function getLastChildElementOfType(parentElement, tagName) {
	var lastChildNode = parentElement.lastChild;

	while (lastChildNode != null) {
		if (lastChildNode.nodeType == 1 && lastChildNode.tagName.toLowerCase() == tagName) {
			return lastChildNode;
		}
		lastChildNode = lastChildNode.previousSibling;
	}
	return null;
}

function setUpListTree(listRoot) {

	if( !document.createElement || !document.childNodes ) { return; }
	var listRoot = document.getElementById(listRoot);

	liElements = listRoot.getElementsByTagName('li');
	for (var i = 0; i < liElements.length; i++) {
		var liBeforeElement = document.createElement('span');
		liBeforeElement.className = 'liBefore';

		var imgElementOne = document.createElement('img');

		//check if this element is it's parent's last child:
		if (getLastChildElementOfType(liElements[i].parentNode, 'li') == liElements[i]) {
			//adjust the classname to emulate a css 'li:last-child' 
			liElements[i].className = liElements[i].className + ' liLastChild';

			//adjust the content to emulate a css 'li:last-child:before'
			imgElementOne.src = 'last_child.gif';
		} else {
			imgElementOne.src = 'i_th_child.gif';
		}

		var imgElementTwo = document.createElement('img');
		imgElementTwo.src = 'closed_folder.gif';

		liBeforeElement.appendChild(imgElementOne);
		liBeforeElement.appendChild(imgElementTwo);

		liElements[i].insertBefore(liBeforeElement, liElements[i].firstChild);
	}
}


