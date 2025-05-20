$('.add-student-btn').click(function() {
    $('#add-student-modal').show();

    $('#student-form')[0].reset();

});

$('.close').click(function() {
    $('#add-student-modal').hide();
});

$(window).click(function(e) {
    if (e.target == document.getElementById('add-student-modal')) {
        $('#add-student-modal').hide();
    }
});

$(window).click(function(e) {
    if (e.target == document.getElementById('update-student-modal')) {
        $('#update-student-modal').hide();
    }
});

$('#student-form').submit(function(e) {
    e.preventDefault();

    var studentID = $('#student-id').val();
    var lastName = $('#student-last-name').val();
    var firstName = $('#student-first-name').val();
    var middleName = $('#student-middle-name').val();
    var email = $('#student-email').val();
    var password = $('#student-password').val();
    var contactNumber = $('#student-contact').val();
    var course = $('#student-course').val();
    var year = $('#student-year').val();
    var section = $('#student-section').val();
    var sex = $('#student-gender').val();
    var birthdate = $('#student-birthdate').val();
    var address = $('#student-address').val();

    console.log('Student ID:', studentID);
    console.log('Last Name:', lastName);
    console.log('First Name:', firstName);
    console.log('Middle Name:', middleName);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Contact:', contactNumber);
    console.log('Course:', course);
    console.log('Year:', year);
    console.log('Section:', section);
    console.log('Sex:', sex);
    console.log('Birthdate:', birthdate);
    console.log('Address:', address);

    $.ajax({
        type: 'POST',
        url: '/student/add',
        contentType: 'application/json',
        data: JSON.stringify({
            studentID: studentID,
            firstname: firstName,
            middleinitial: middleName,
            lastname: lastName,
            email: email,
            password: password,
            contact: contactNumber,
            course: course,
            year: year,
            section: section,
            sex: sex,
            birthdate: birthdate,
            address: address
        }),
        dataType: 'json',
        success: function(response) {
            alert("Student added successfully!");
            addStudentToTable(response);
            $('#add-student-modal').hide();
        },
        error: function(xhr, status, error) {
            console.error('Error:', xhr.responseText, status, error);
            alert("Error adding student! " + xhr.responseText);
            
        }
        
    });
    
    function addStudentToTable(student) {
        var row = '<tr data-id="' + student.id + '">' +
            '<td>' + student.studentID + '</td>' +
            '<td>' + student.lastname + ', ' + student.firstname + ' ' + student.middleinitial + '</td>' +
            '<td>' + student.course + '</td>' +
            '<td>' + student.year + '</td>' +
            '<td>' + student.section + '</td>' +
            '<td><button class="student-update-btn">Update</button> <button class="student-delete-btn">Delete</button></td>' +
            '</tr>';
        $('#student-table tbody').append(row);
    }

// Close the modal after submission
    $('#add-student-modal').hide(); // Corrected modal ID here
});

// Cancel button handling
$('.cancel-btn').click(function() {
    $('#add-student-modal').hide(); // Corrected modal ID here
});

$('#student-generate-button').click(function() {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    $('#student-password').val(password);
});

$('a.nav-link[data-target="#student-management"]').click(function() {
    $.ajax({
        url: '/student',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            console.log('Response Data:', data); // Log the response data
            const tableBody = $('#student-table tbody');
            tableBody.empty();
            data.forEach(function(student) {
                console.log('Student Object:', student); // Log each student object
                const row = `<tr>
                            <td>${student.studentID}</td>
                            <td>${student.lastname}, ${student.firstname} ${student.middleinitial}</td>
                            <td>${student.course}</td>
                            <td>${student.year}</td>
                            <td>${student.section}</td>
                            <td>
                                <button class="student-update-btn">Update</button>
                                <button class="student-delete-btn" data-id="${student.id}">Delete</button>
                            </td>
                         </tr>`;
                tableBody.append(row);
            });
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch students:', error);
        }
    });
});

$('#update-student-generate-button').click(function() {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    $('#update-student-password').val(password);
});

$(document).on('click', '.student-update-btn', function() {
    var studentID = $(this).closest('tr').find('td:eq(0)').text().trim();
    
    $.ajax({
        type: 'GET',
        url: '/student/' + studentID,
        success: function(student) {
            // Populate the form with the student's current data
            $('#update-student-id').val(student.studentID);
            $('#update-student-last-name').val(student.lastname);
            $('#update-student-first-name').val(student.firstname);
            $('#update-student-middle-name').val(student.middleinitial);
            $('#update-student-email').val(student.email);
            $('#update-student-contact').val(student.contact);
            $('#update-student-password').val(student.password);
            $('#update-student-course').val(student.course);
            $('#update-student-year').val(student.year);
            $('#update-student-section').val(student.section);
            $('#update-student-gender').val(student.sex);
            $('#update-student-birthdate').val(student.birthdate);
            $('#update-student-address').val(student.address);

            // Show the update modal
            $('#update-student-modal').show();
        },
        error: function(xhr, status, error) {
            console.error('Error fetching student data:', xhr.responseText, status, error);
            alert("Error fetching student data: " + xhr.responseText);
        }
    });
});

$(document).ready(function() {
    $('#update-student-form').submit(function(e) {
        e.preventDefault();
    
        var studentID = $('#update-student-id').val();
        var lastName = $('#update-student-last-name').val();
        var firstName = $('#update-student-first-name').val();
        var middleName = $('#update-student-middle-name').val();
        var email = $('#update-student-email').val();
        var contactNumber = $('#update-student-contact').val();
        var password = $('#update-student-password').val();
        var course = $('#update-student-course').val();
        var year = $('#update-student-year').val();
        var section = $('#update-student-section').val();
        var sex = $('#update-student-gender').val();
        var birthdate = $('#update-student-birthdate').val(); // Ensure this is in the correct format
        var address = $('#update-student-address').val();
    
        $.ajax({
            type: 'PUT',
            url: '/student/update/' + studentID,
            contentType: 'application/json',
            data: JSON.stringify({
                studentID: studentID,
                firstname: firstName,
                middleinitial: middleName,
                lastname: lastName,
                email: email,
                password: password,
                contact: contactNumber,
                course: course,
                year: year,
                section: section,
                sex: sex,
                birthdate: birthdate,
                address: address
            }),
            dataType: 'json',
            success: function(response) {
                updateStudentInTable(response);
                $('#update-student-modal').hide();
                alert("Student updated successfully!");
                updateStudentCount(); // If you have a function to update the student count
            },
            error: function(xhr, status, error) {
                console.error('Error updating student:', xhr.responseText, status, error);
                alert("Error updating student! " + xhr.responseText);
            }
        });
    });    
    
    function updateStudentInTable(student) {
        var row = $('#student-table tbody tr[data-id="' + student.studentID + '"]');
        row.find('td:eq(0)').text(student.studentID);
        row.find('td:eq(1)').text(student.lastname + ', ' + student.firstname + ' ' + student.middleinitial);
        row.find('td:eq(2)').text(student.course);
        row.find('td:eq(3)').text(student.year);
        row.find('td:eq(4)').text(student.section);
    }
});


$(document).on('click', '.close, .cancel-btn', function() {
    $('#update-student-modal').hide();
});

$(document).on('click', '.student-delete-btn', function() {
    var id = $(this).data('id'); // Make sure 'id' matches the data attribute name in your HTML
    var row = $(this).closest('tr');

        // Confirm deletion
        if (confirm('Are you sure you want to delete this student?')) {
            $.ajax({
                url: '/student/delete/' + id,
                type: 'DELETE',
                success: function(response) {
                    row.remove();
                    alert('Student deleted successfully!');
                    updateStudentCount();
                },
                error: function(xhr, status, error) {
                    // Log the error and show a generic message
                    console.error('Error deleting student:', xhr.responseText, status, error);
                    alert('Error deleting student!');
                }
            });
        }
});
updateStudentCount();

function updateStudentCount() {
$.ajax({
    url: '/student/count',
    method: 'GET',
    success: function(count) {
        $('#student-count').text(count);
    },
    error: function(xhr, status, error) {
        console.error('Error fetching student count:', status, error);
    }
});
}