$(document).ready(function(){

    $('.add-faculty-btn').click(function() {
        $('#add-faculty-modal').show();
    });

    // Close the modal
    $('.close').click(function() {
        $('#add-faculty-modal').hide();
    });

    // Close the modal when clicking outside of it
    $(window).click(function(e) {
        if ($(e.target).is('#add-faculty-modal')) {
            $('#add-faculty-modal').hide();
        }
    });
    
    $(window).click(function(e) {
        if (e.target == document.getElementById('update-faculty-modal')) {
            $('#update-faculty-modal').hide();
        }
    });
    // Password generation
    $('#faculty-generate-button').click(function() {
        const length = 8;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        $('#faculty-password').val(password);
    });

    $('a.nav-link[data-target="#faculty-management"]').click(function() {
        $.ajax({
            url: '/faculties',
            type: 'POST',
            dataType: 'json',
            success: function(data) {
                const tableBody = $('#faculty-table tbody');
                tableBody.empty();
                data.forEach(function(faculty) {
                    const row = `<tr data-id="${faculty.id}">
                                    <td>${faculty.facultyID}</td>
                                    <td>${faculty.lastName}, ${faculty.firstName} ${faculty.middleInitial}</td>
                                    <td>${faculty.email}</td>
                                    <td>${faculty.contact}</td>
                                    <td>${faculty.department}</td>
                                    <td>
                                        <button class="faculty-update-btn">Update</button>
                                        <button class="faculty-delete-btn" data-id="${faculty.id}">Delete</button>
                                    </td>
                                 </tr>`;
                    tableBody.append(row);
                });
            },
            error: function(xhr, status, error) {
                console.error('Failed to fetch faculties:', error);
            }
        });
    });


    $('#faculty-form').submit(function(e) {
        e.preventDefault();
    
        var facultyid = $('#faculty-id').val();
        var lastName = $('#faculty-last-name').val();
        var firstName = $('#faculty-first-name').val();
        var middleName = $('#faculty-middle-name').val();
        var email = $('#faculty-email').val();
        var password = $('#faculty-password').val();
        var contactNumber = $('#faculty-contact').val();
        var department = $('#faculty-department').val();
        var sex = $('#faculty-gender').val();
        var address = $('#faculty-address').val();
    
        console.log('Faculty ID:', facultyid);
        console.log('Last Name:', lastName);
        console.log('First Name:', firstName);
        console.log('Middle Name:', middleName);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Contact:', contactNumber);
        console.log('Department:', department);
        console.log('Sex:', sex);
        console.log('Address:', address);
    
        $.ajax({
            type: 'POST',
            url: '/faculty/add',
            contentType: 'application/json',
            data: JSON.stringify({
                facultyID: facultyid,
                firstName: firstName,
                middleInitial: middleName,
                lastName: lastName,
                email: email,
                password: password,
                contact: contactNumber,
                department: department,
                sex: sex,
                address: address
            }),
            dataType: 'json',
            success: function(response) {
                console.log("Response:", response); // Log the entire response object
                alert("Faculty added successfully!");
                addFacultyToTable(response);
                $('#add-faculty-modal').hide();
                updateFacultyCount();
            },
            error: function(xhr, status, error) {
                console.error('Error:', xhr.responseText, status, error);
                alert("Error adding Faculty! " + xhr.responseText);
            }            
        });
    
        function addFacultyToTable(faculty) {
            var row = '<tr data-id="' + faculty.id + '">' +
                '<td>' + faculty.facultyID + '</td>' +
                '<td>' + faculty.lastName + ', ' + faculty.firstName + ' ' + faculty.middleInitial + '</td>' +
                '<td>' + faculty.email + '</td>' +
                '<td>' + faculty.contact + '</td>' +
                '<td>' + faculty.department + '</td>' +
                '<td><button class="faculty-update-btn">Update</button> <button class="faculty-delete-btn">Delete</button></td>' +
                '</tr>';
            $('#faculty-table tbody').append(row);
        }        
    
        // Close the modal after submission
        $('#add-faculty-modal').hide(); // Corrected modal ID here
    });
    
    $('#update-faculty-generate-button').click(function() {
        const length = 8;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        $('#update-faculty-password').val(password);
    });

    $(document).on('click', '.faculty-update-btn', function() {
        var facultyID = $(this).closest('tr').find('td:eq(0)').text().trim();
    
        $.ajax({
            type: 'GET',
            url: '/faculty/' + facultyID,
            success: function(faculty) {
                $('#update-faculty-id').val(faculty.facultyID);
                $('#update-faculty-last-name').val(faculty.lastName);
                $('#update-faculty-first-name').val(faculty.firstName);
                $('#update-faculty-middle-name').val(faculty.middleInitial);
                $('#update-faculty-email').val(faculty.email);
                $('#update-faculty-password').val(faculty.password);
                $('#update-faculty-contact').val(faculty.contact);
                $('#update-faculty-department').val(faculty.department);
                $('#update-faculty-gender').val(faculty.sex);
                $('#update-faculty-address').val(faculty.address);
    
                $('#update-faculty-modal').show();
            },
            error: function(xhr, status, error) {
                console.error('Error fetching faculty data:', xhr.responseText, status, error);
                alert("Error fetching faculty data: " + xhr.responseText);
            }
        });
    });
    

    $(document).ready(function() {
        // Update faculty form submission
        $('#update-faculty-form').submit(function(e) {
            e.preventDefault();
    
            var facultyID = $('#update-faculty-id').val();
            var lastName = $('#update-faculty-last-name').val();
            var firstName = $('#update-faculty-first-name').val();
            var middleName = $('#update-faculty-middle-name').val();
            var email = $('#update-faculty-email').val();
            var password = $('#update-faculty-password').val();
            var contactNumber = $('#update-faculty-contact').val();
            var department = $('#update-faculty-department').val();
            var sex = $('#update-faculty-gender').val();
            var address = $('#update-faculty-address').val();
    
            $.ajax({
                type: 'PUT',
                url: '/faculty/update/' + encodeURIComponent(facultyID),
                contentType: 'application/json',
                data: JSON.stringify({
                    facultyID: facultyID,
                    firstName: firstName,
                    middleInitial: middleName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    contact: contactNumber,
                    department: department,
                    sex: sex,
                    address: address
                }),
                dataType: 'json',
                success: function(response) {
                    updateFacultyInTable(response);
                    alert("Faculty updated successfully!");
                    $('#update-faculty-modal').hide();
                },
                error: function(xhr, status, error) {
                    console.error('Error updating faculty:', xhr.responseText, status, error);
                    alert("Error updating faculty! " + xhr.responseText);
                }
            });
        });
    
        // Update table row after successful update
        function updateFacultyInTable(faculty) {
            var row = $('#faculty-table tbody tr[data-id="' + faculty.facultyID + '"]');
            row.find('td:eq(0)').text(faculty.facultyID);
            row.find('td:eq(1)').text(faculty.lastName + ', ' + faculty.firstName + ' ' + faculty.middleInitial);
            row.find('td:eq(2)').text(faculty.email);
            row.find('td:eq(3)').text(faculty.contact);
            row.find('td:eq(4)').text(faculty.department);
        }
    });
    


    // Event handler for closing the modal
    $(document).on('click', '.close, .cancel-btn', function() {
        $('#update-faculty-modal').hide();
    });

    // Event handler for the delete button
    $(document).on('click', '.faculty-delete-btn', function() {
        var id = $(this).data('id'); // Correctly retrieve the data-id from the button
        var row = $(this).closest('tr');
        
        console.log('Faculty ID:', id);  // Debugging line
    
        if (id === undefined) {
            console.error('Faculty ID is undefined.');
            alert('Error: Faculty ID is undefined.');
            return;
        }
    
        if (confirm('Are you sure you want to delete this faculty?')) {
            $.ajax({
                url: '/faculty/delete/' + id,
                type: 'DELETE',
                success: function(result) {
                    row.remove();
                    alert("Faculty deleted successfully!");
                    updateFacultyCount();
                },
                error: function(xhr, status, error) {
                    console.error('Error deleting faculty:', xhr.responseText, status, error);
                    alert("Error deleting faculty.");
                }
            });
        }
    });
    

    
    updateFacultyCount();    
});    

function updateFacultyCount() {
    $.ajax({
        url: '/faculty/count',
        method: 'GET',
        success: function(count) {
            $('#faculty-count').text(count);
        },
        error: function(xhr, status, error) {
            console.error('Error fetching faculty count:', status, error);
        }
    });
}

