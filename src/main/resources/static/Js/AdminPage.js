$(document).ready(function() {
    $('.nav-link').click(function(e) {
        e.preventDefault();
        $('.main-content > div').hide();
        var target = $(this).data('target');
        $(target).show();
    });

    $('#btn').click(function() {
        $('.sidebar').toggleClass('active');
        $('.main-content').toggleClass('shifted');
    });

});

// Fetch and display total number of students on dashboard
window.addEventListener('DOMContentLoaded', function() {
    fetch('/students/count')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(count => {
            // Find the element that displays total students
            const studentCountElem = document.querySelector('.dashboard-card .student-count, .dashboard-card[data-type="students"] .count, .dashboard-card[data-type="students"]');
            // Try to find a card with text 'Total Students' and update its content
            let card = Array.from(document.querySelectorAll('.dashboard-card, div')).find(el => el.textContent && el.textContent.includes('Total Students'));
            if (card) {
                card.innerHTML = card.innerHTML.replace('Loading...', count);
            }
        })
        .catch(error => {
            console.error('Error fetching student count:', error);
        });
});

// Fetch and display total number of faculty on dashboard
fetch('/faculty/count')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(count => {
        let card = Array.from(document.querySelectorAll('.dashboard-card, div')).find(el => el.textContent && el.textContent.includes('Total Faculty'));
        if (card) {
            card.innerHTML = card.innerHTML.replace('Loading...', count);
        }
    })
    .catch(error => {
        console.error('Error fetching faculty count:', error);
    });

// Fetch and display total number of programs on dashboard
fetch('/programs/count')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(count => {
        let card = Array.from(document.querySelectorAll('.dashboard-card, div')).find(el => el.textContent && el.textContent.includes('Total Programs'));
        if (card) {
            card.innerHTML = card.innerHTML.replace('Loading...', count);
        }
    })
    .catch(error => {
        console.error('Error fetching program count:', error);
    });

// Fetch and display total number of courses on dashboard
fetch('/courses/count')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(count => {
        let card = Array.from(document.querySelectorAll('.dashboard-card, div')).find(el => el.textContent && el.textContent.includes('Total Courses'));
        if (card) {
            card.innerHTML = card.innerHTML.replace('Loading...', count);
        }
    })
    .catch(error => {
        console.error('Error fetching course count:', error);
    });

