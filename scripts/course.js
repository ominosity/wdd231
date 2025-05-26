const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]
/* Create variables to hold elements */
const courseListElement = document.getElementById('course-list');
const creditsElement = document.getElementById('credits');
const courseDetailsElement = document.getElementById('course-details');

/* Add event listeners to filters */
const allFilter = document.getElementById('all');
const cseFilter = document.getElementById('cse');
const wddFilter = document.getElementById('wdd');

allFilter.addEventListener('click', () => filterCourses('all'));
cseFilter.addEventListener('click', () => filterCourses('cse'));
wddFilter.addEventListener('click', () => filterCourses('wdd'));

function filterCourses(filter) {
    // Clear the list first
    courseListElement.innerHTML = "";
    const creditsArray = [];
    let filteredCourses = [];
    if (filter === "all") {
        filteredCourses = courses;
    } else {
        filteredCourses = courses.filter(course => course.subject.toLowerCase() === filter)
    }

    filteredCourses.forEach(course => {
        const courseItem = document.createElement("li");
        courseItem.textContent = `${course.subject} ${course.number}`;
        courseItem.addEventListener('click', () => generateAndShowModal(course));

        if (course.completed) {
            courseItem.classList.add("completed");
        }
        courseListElement.appendChild(courseItem);
        creditsArray.push(course.credits)
    });

    const creditsShown = creditsArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    creditsElement.innerHTML = `The total number of credits listed below is ${creditsShown}`;
}

/* Create the modal and populate it with course information */
function generateAndShowModal(course) {
    /* Clear existing details */
    courseDetailsElement.innerHTML = '';
    const fragment = document.createDocumentFragment();
    /* Generate fragment elements */
    const button = document.createElement('button');
    const header = document.createElement('h3');
    const courseTitle = document.createElement('h4');
    const credits = document.createElement('p');
    const description = document.createElement('p');
    const certificate = document.createElement('p');
    const techStack = document.createElement('p');
    
    /* Set element attributes */
    button.textContent = `❌`;
    button.addEventListener('click', (event) => {
        courseDetailsElement.close();
    });
    header.textContent = `${course.subject} ${course.number}`;
    courseTitle.textContent = course.title;
    credits.innerHTML = `<strong>Credits: </strong>${course.credits}`;
    description.textContent = course.description;
    certificate.innerHTML = `<strong>Certificate: </strong>${course.certificate}`;
    techStack.innerHTML = `<strong>Technology: </strong>${course.technology}`;
    
    /* Add elements to fragment */
    fragment.appendChild(button);
    fragment.appendChild(header);
    fragment.appendChild(courseTitle);
    fragment.appendChild(credits);
    fragment.appendChild(description);
    fragment.appendChild(certificate);
    fragment.appendChild(techStack);
    
    /* Add fragment to DOM and open the modal */
    courseDetailsElement.appendChild(fragment);
    courseDetailsElement.showModal();
}

/* Prep for initial paint */
filterCourses('all');
