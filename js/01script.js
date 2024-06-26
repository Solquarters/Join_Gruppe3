let contactsJSON =
[
    {
        firstName: "Bob",
        lastName: "Johnson",
        phone: "0123 55 66 77",
        email: "bob@johnson.com"
    },
    {
        firstName: "Fred",
        lastName: "Theman",
        phone: "0123 55 66 77",
        email: "fred@man.com"
    },{
        firstName: "Claudia",
        lastName: "Müller",
        phone: "0123 55 66 77",
        email: "claudia@woman.com"
    },
    {
        firstName: "Stefan",
        lastName: "Schulz",
        phone: "0123 55 66 77",
        email: "stefan@schulz.com"
    },
    {
        firstName: "Julia",
        lastName: "Roberts",
        phone: "0123 55 66 77",
        email: "julia@roberts.com"
    }

];

let toDoCardsJSON = [
    {
        title: "title0",
        description:"description0",
        assignedToArray: [contactsJSON[0],contactsJSON[1],contactsJSON[2]],
        dueDate: "05.01.2025",
        prio: "low",
        category: "Technical task",
        subtaskJson: [
        { subtaskText: "subtask0-0", subtaskDone: false},
        { subtaskText: "subtask0-1", subtaskDone: false},
        ],
        toDoStatus: "To do",
    },
    {
        title: "title1",
        description:"description1",
        assignedToArray: [contactsJSON[0],contactsJSON[1],],
        dueDate: "28.02.2025",
        prio: "medium",
        category: "User Story",
        subtaskJson: [
            { subtaskText: "subtask1-0", subtaskDone: false},
            { subtaskText: "subtask1-1", subtaskDone: false},
            { subtaskText: "subtask1-2", subtaskDone: false},
            ],
        toDoStatus: "Await feedback",
    },
    {
        title: "title2",
        description:"description2",
        assignedToArray: [contactsJSON[3],contactsJSON[4]],
        dueDate: "17.05.2025",
        prio: "urgent",
        category: "Technical task",
        subtaskJson: [
            { subtaskText: "subtask2-0", subtaskDone: false},
            ],
        toDoStatus: "To do",
    },
    {
        title: "title3",
        description:"description3",
        assignedToArray: [contactsJSON[1],contactsJSON[3],contactsJSON[4]],
        dueDate: "05.07.2024",
        prio: "medium",
        category: "User Story",
        subtaskJson: [
            { subtaskText: "subtask3-0", subtaskDone: false},
            { subtaskText: "subtask3-1", subtaskDone: false},
            { subtaskText: "subtask3-2", subtaskDone: false},
            { subtaskText: "subtask3-3", subtaskDone: false},
            ],
        toDoStatus: "Done",
    },
    {
        title: "title4",
        description:"description4",
        assignedToArray: [contactsJSON[0],contactsJSON[1],contactsJSON[3]],
        dueDate: "14.02.2025",
        prio: "low",
        category: "Technical task",
        subtaskJson: [
            { subtaskText: "subtask4-0", subtaskDone: false},
            { subtaskText: "subtask4-1", subtaskDone: false},
            { subtaskText: "subtask4-2", subtaskDone: false},
            { subtaskText: "subtask4-3", subtaskDone: false},
            ],
        toDoStatus: "In progress",
    },
];





let userLoginJson = JSON.parse(localStorage.getItem('userLoginJson')) || [];



