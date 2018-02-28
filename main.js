//construct array of students
const studentsArray = document.getElementsByClassName('student-item');

//hide all students
function hideAllStudents() {
    for (let i =0; i < studentsArray.length; i++) {
        $(studentsArray[i]).hide();
    }
}

//links for first 10 students
function displayStudents(paginationLinkIndex, array) {
    //call hide students function
    hideAllStudents();
    
    let indexStartPos = ((paginationLinkIndex * 10) - 10);
    let indexEndPos = ((paginationLinkIndex * 10) - 1);
    
    // if end of the array, set end pos at end of the array
    if (indexEndPos > array.length - 1) { 
        indexEndPos = array.length - 1; 
    }
    
    // show the students within the scope
    for (let i = indexStartPos; i <= indexEndPos; i++) {
        $(array[i]).show();
    }
}

//create pagination buttons
function createPaginationButtons(paginationLinkIndex, array) {

    //remove old divs with pagination class
    if ($('.pagination')) { 
        $('.pagination').remove(); 
    }

    //add HTML to DOM with pagination
    let htmlString = '<div class="pagination"><ul>';
    let numButtons = (array.length / 10);
    
    if (array.length % 10 > 0) numButtons++;
    
    for (let i = 1; i <= numButtons; i++) {
        htmlString += '<li><a ';
        if (paginationLinkIndex === i) { 
            htmlString += 'class="active" '; 
        }
        htmlString += 'href="#">' + i + '</a></li>';
    }
    
    htmlString += '</ul></div>';

    //add HTML string to page
    $('.page').append(htmlString);

    //add event handler to pagination div to handle events on a tags
    $('.pagination').on("click", "a", function(event) {
    
        //find which button was clicked on
        let buttonPressed = $(event.target).parent().index() + 1;
        
        // reload information on the page with students in scope of which button was clicked
        displayStudents(buttonPressed, array);
        createPaginationButtons(buttonPressed, array);
    });

    //remove pagination if there are less than 10 students
    if (array.length <= 10) {
        $('.pagination').remove();
    }
}

displayStudents(1, studentsArray);
createPaginationButtons(1, studentsArray);