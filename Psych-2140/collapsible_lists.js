// Get current cookie setting
var currenti=getCurrState() 
function getCurrState() {
  var label = "currIndex="
  var labelLen = label.length 
  var cLen = document.cookie.length
  var i = 0
  while (i < cLen) {
    var j = i + labelLen
    if (document.cookie.substring(i,j) == label) {
      var cEnd = document.cookie.indexOf(";",j)
      if (cEnd == -1) { cEnd = document.cookie.length }
      return unescape(document.cookie.substring(j,cEnd))
    }
    i++
  }
  return ""
}

// Record current settings in cookie
function setCurrState(setting) {
  var expire = new Date();
  expire.setTime(expire.getTime() + ( 7*24*60*60*1000 ) ); // expire in 1 week
  document.cookie = "currIndex=" + escape(setting) + "; expires=" + expire.toGMTString(); 
}

// toggles an outline mother entry, storing new value in the cookie 
function toggle(n) { 
  if (n != 0) { 
  var newString = "" 
  var expanded = currenti.substring(n-1,n) // of clicked item 
  newString += currenti.substring(0,n-1) 
  newString += expanded ^ 1 // Bitwise XOR clicked item 
  newString += currenti.substring(n,currenti.length) 
  setCurrState(newString) // write new state back to cookie 
}}

// returns padded spaces (in mulTIPles of 2) for indenting 
function pad(n) {
  var result = "" 
  for (var i = 1; i <= n; i++) { result += "&nbsp;&nbsp;&nbsp;&nbsp;" }
  return result
}
 
// Expand everything
function explode() {
  currenti = "";
  initState="";
  for (var i = 1; i < dbi.length; i++) { 
    initState += "1"
    currenti += "1"
  }
  setCurrState(initState);
  history.go(0);
}
 
// Collapse everything
function contract() {
  currenti = "";
  initState="";
  for (var i = 1; i < dbi.length; i++) { 
    initState += "0"
    currenti += "0"
  }
  setCurrState(initState);
  history.go(0);
}
 
function tree_close() {
  parent.close();
}
 
// Set the initial state if no current state or length changed
 if (currenti == "" || currenti.length != (dbi.length-1)) {
   currenti= ""
   initState = ""
   for (i = 1; i < dbi.length; i++) { 
     initState += "0"
     currenti += "0"
     }
   setCurrState(initState)
   }
 var prevIndentDisplayed = 0
 var showMyDaughter = 0
 // end 

 var Outline=""
 // cycle through each entry in the outline array
 for (var i = 1; i < dbi.length; i++) {
   var currIndent = dbi[i].indent           // get the indent level
   var expanded = currenti.substring(i-1,i) // current state
   var top = dbi[i].top
   if (top == "") { top="main" }
   // display entry only if it meets one of three criteria
   if (currIndent == 0 || currIndent <= prevIndentDisplayed || (showMyDaughter == 1 && (currIndent - prevIndentDisplayed == 1))) {
   Outline += pad(currIndent)
 
 
 // Insert the appropriate GIF and HREF
   newitem = "";
   if (dbi[i].newitem==1) { newitem="_new"; }
   if (!(dbi[i].mother)) {
     Outline += "<IMG SRC=text.gif BORDER=0>"
     } 
   else { 
       if (currenti.substring(i-1,i) == 1) {
         Outline += "<A HREF=\"javascript:history.go(0)\" onClick=\"toggle(" + i + ")\">"
         Outline += "<IMG SRC=closefolder.gif BORDER=0>"
         Outline += "</A>"
         }
       else {
  Outline += "<A HREF=\"javascript:history.go(0)\" onClick=\"toggle(" + i + ")\">"
         Outline += "<IMG SRC=openfolder.gif BORDER=0>"
         Outline += "</A>"
         }
       }
     Outline += "&nbsp;";
 
     if (dbi[i].URL == "" || dbi[i].URL == null) {
       Outline += " " + dbi[i].display      // no link, just a listed item  
       }
  else 
 {
 if (dbi[i].newitem==3) 
 {
 Outline += " <A HREF=\"#\" onClick=\"showGlossary()\">" + dbi[i].display + "</A>";
       }
  else{
       Outline += " <A HREF=\"" + dbi[i].URL + "\"TARGET=\"" + top + "\">" + dbi[i].display + "</A>";
       }
 }
//   Bold if at level 0
//     if (currIndent == 0) { 
//       Outline = "<B>" + Outline + "</B>"
//       }
     Outline += "<BR>"	
     prevIndentDisplayed = currIndent
     showMyDaughter = expanded
//     if (i == 1) { Outline = ""}
     if (dbi.length > 25) {
       document.write(Outline)
       Outline = ""
       }
     }
   }
 document.write(Outline)
 // end 