$(document).ready(function() {
    // Debug: Check jQuery version
    console.log('jQuery version:', $.fn.jquery);

    // Debug: Check if add-student-modal exists
    if ($('#add-student-modal').length) {
        console.log('Add Student modal found');
    } else {
        console.error('Add Student modal NOT found');
    }

    // Add Student Modal - Fix event binding
    $(document).on('click', '.add-student-btn', function() {
        console.log('Add Student button clicked');
        $('#add-student-modal').show();
        $('#student-form')[0].reset();
    });

    // Close modals - Fix event binding
    $(document).on('click', '.close, .cancel-btn', function() {
        $('#add-student-modal, #update-student-modal').hide();
    });

    // Close modal when clicking outside
    $(window).on('click', function(e) {
        if ($(e.target).is('#add-student-modal, #update-student-modal')) {
            $(e.target).hide();
        }
    });

    // Add Student Form - Fix form submission
    $(document).on('submit', '#student-form', function(e) {
        e.preventDefault();
        console.log('Add Student form submitted');

        const studentData = {
            studentID: $('#student-id').val(),
            lastName: $('#student-last-name').val(),
            firstName: $('#student-first-name').val(),
            middleInitial: $('#student-middle-name').val(),
            email: $('#student-email').val(),
            password: $('#student-password').val(),
            contactNumber: $('#student-contact').val(),
            program: $('#student-program').val(),
            year: $('#student-year').val(),
            section: $('#student-section').val(),
            sex: $('#student-sex').val(),
            birthday: $('#student-birthdate').val(),
            address: $('#student-address').val(),
            enabled: true
        };

        $.ajax({
            type: 'POST',
            url: '/students',
            contentType: 'application/json',
            data: JSON.stringify(studentData),
            success: function(response) {
                alert("Student added successfully!");
                addStudentToTable(response);
                $('#add-student-modal').hide();
                updateStudentCount();
            },
            error: function(xhr, status, error) {
                console.error('Error adding student:', xhr.responseText);
                alert("Error adding student: " + xhr.responseText);
            }
        });
    });

    // Update Student Form - Fix form submission
    $(document).on('submit', '#update-student-form', function(e) {
        e.preventDefault();
        console.log('Update Student form submitted');

        const dbId = $('#update-student-db-id').val();
        const studentData = {
            studentID: $('#update-student-id').val(),
            lastName: $('#update-student-last-name').val(),
            firstName: $('#update-student-first-name').val(),
            middleInitial: $('#update-student-middle-name').val(),
            email: $('#update-student-email').val(),
            password: $('#update-student-password').val(),
            contactNumber: $('#update-student-contact').val(),
            program: $('#update-student-program').val(),
            year: $('#update-student-year').val(),
            section: $('#update-student-section').val(),
            sex: $('#update-student-sex').val(),
            birthday: $('#update-student-birthdate').val(),
            address: $('#update-student-address').val(),
            enabled: true
        };

        $.ajax({
            type: 'PUT',
            url: '/students/' + dbId,
            contentType: 'application/json',
            data: JSON.stringify(studentData),
            success: function(response) {
                alert("Student updated successfully!");
                updateStudentInTable(response);
                $('#update-student-modal').hide();
                updateStudentCount();
            },
            error: function(xhr, status, error) {
                console.error('Error updating student:', xhr.responseText);
                alert("Error updating student: " + xhr.responseText);
            }
        });
    });

    // Password generation - Fix event binding
    $(document).on('click', '#student-generate-button, #update-student-generate-button', function() {
        const length = 8;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        $(this).closest('label').next('input[type="text"]').val(password);
    });

    // Load students when student management tab is clicked
    $(document).on('click', 'a.nav-link[data-target="#student-management"]', function() {
        loadStudents();
    });

    // Update button click handler
    $(document).on('click', '.student-update-btn', function() {
        const studentId = $(this).data('id');
        $.ajax({
            type: 'GET',
            url: '/students/' + studentId,
            success: function(student) {
                $('#update-student-db-id').val(student.id);
                $('#update-student-id').val(student.studentID);
                $('#update-student-last-name').val(student.lastName);
                $('#update-student-first-name').val(student.firstName);
                $('#update-student-middle-name').val(student.middleInitial);
                $('#update-student-email').val(student.email);
                $('#update-student-contact').val(student.contactNumber);
                $('#update-student-password').val(student.password);
                $('#update-student-program').val(student.program);
                $('#update-student-year').val(student.year);
                $('#update-student-section').val(student.section);
                $('#update-student-sex').val(student.sex);
                $('#update-student-birthdate').val(student.birthday);
                $('#update-student-address').val(student.address);
                $('#update-student-modal').show();
            },
            error: function(xhr, status, error) {
                console.error('Error fetching student data:', xhr.responseText);
                alert("Error fetching student data: " + xhr.responseText);
            }
        });
    });

    // Delete button click handler
    $(document).on('click', '.student-delete-btn', function() {
        const studentId = $(this).data('id');
        if (confirm('Are you sure you want to delete this student?')) {
            $.ajax({
                type: 'DELETE',
                url: '/students/' + studentId,
                success: function() {
                    $(this).closest('tr').remove();
                    alert('Student deleted successfully!');
                    updateStudentCount();
                },
                error: function(xhr, status, error) {
                    console.error('Error deleting student:', xhr.responseText);
                    alert('Error deleting student: ' + xhr.responseText);
                }
            });
        }
    });

    // Search functionality
    $(document).on('click', '.search-bar button', function() {
        const query = $('.search-bar input').val().toLowerCase();
        $('#student-table tbody tr').each(function() {
            const name = $(this).find('td:eq(1)').text().toLowerCase();
            $(this).toggle(name.includes(query));
        });
    });

    // Initial load
    updateStudentCount();
});

// Load students from server
function loadStudents() {
    $.ajax({
        url: '/students',
        type: 'GET',
        success: function(data) {
            const tableBody = $('#student-table tbody');
            tableBody.empty();
            data.forEach(function(student) {
                addStudentToTable(student);
            });
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch students:', error);
        }
    });
}

// Add student to table
function addStudentToTable(student) {
    const row = `<tr data-id="${student.id}">
        <td>${student.studentID}</td>
        <td>${student.lastName}, ${student.firstName} ${student.middleInitial}</td>
        <td>${student.program}</td>
        <td>${student.year}</td>
        <td>${student.section}</td>
        <td>
            <button class="student-update-btn" data-id="${student.id}">Update</button>
            <button class="student-delete-btn" data-id="${student.id}">Delete</button>
        </td>
    </tr>`;
    $('#student-table tbody').append(row);
}

// Update student in table
function updateStudentInTable(student) {
    const row = $(`#student-table tbody tr[data-id="${student.id}"]`);
    row.find('td:eq(0)').text(student.studentID);
    row.find('td:eq(1)').text(`${student.lastName}, ${student.firstName} ${student.middleInitial}`);
    row.find('td:eq(2)').text(student.program);
    row.find('td:eq(3)').text(student.year);
    row.find('td:eq(4)').text(student.section);
}

// Update student count
function updateStudentCount() {
    $.ajax({
        url: '/students/count',
        method: 'GET',
        success: function(count) {
            $('#student-count').text(count);
        },
        error: function(xhr, status, error) {
            console.error('Error fetching student count:', error);
        }
    });
}