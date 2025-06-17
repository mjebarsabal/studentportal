$(document).ready(function(){

    $('.add-program-btn').click(function() {
        $('#add-program-modal').show();
        $('#program-form')[0].reset();
    });

    $('.close').click(function() {
        $('#add-program-modal').hide();
    });

    $(window).click(function(e) {
        if (e.target == document.getElementById('add-program-modal')) {
            $('#add-program-modal').hide();
        }
    });

    $('#program-form').submit(function(e) {
        e.preventDefault();

        var programCode = $('#program-code').val();
        var programDescription = $('#program-description').val();

        console.log('Program Code', programCode);
        console.log('Program Description', programDescription);


        $.ajax({
            type: 'POST',
            url: '/program/add',
            contentType: 'application/json',
            data: JSON.stringify({
                programCode: programCode, // Use camelCase to match Java fields
                programDesc: programDescription // Use camelCase to match Java fields
            }),
            dataType: 'json',
            success: function(response) {
                alert("Program added successfully!");
                addProgramToTable(response);
                $('#add-program-modal').hide();
                updateProgramCount();
            },
            error: function(xhr, status, error) {
                console.error('Error:', xhr.responseText, status, error);
                alert("Error adding program! " + xhr.responseText);
            }
        });
    });

    function addProgramToTable(program) {
        var row = '<tr data-id="' + program.id + '">' +
            '<td>' + program.id + '</td>' +
            '<td>' + program.programCode + '</td>' +
            '<td>' + program.programDesc + '</td>' +
            '<td><button class="program-update-btn">Update</button> <button class="program-delete-btn">Delete</button></td>' +
            '</tr>';
        $('#program-table tbody').append(row);
    }

    // Close the modal after submission
        $('#add-program-modal').hide(); // Corrected modal ID here

    // Cancel button handling
    $('.cancel-btn').click(function() {
        $('#add-program-modal').hide(); // Corrected modal ID here
    });

    $('a.nav-link[data-target="#program-management"]').click(function() {
        $.ajax({
            url: '/program',
            type: 'POST',
            dataType: 'json',
            success: function(data) {
                console.log('Response Data:', data);
                const tableBody = $('#program-table tbody');
                tableBody.empty();
                data.forEach(function(program) {
                    console.log('Program', program);
                    const row = `<tr data-id="${program.id}">
                                    <td>${program.id}</td>
                                    <td>${program.programCode}</td>
                                    <td>${program.programDesc}</td>
                                    <td>
                                        <button class="program-update-btn">Update</button>
                                        <button class="program-delete-btn">Delete</button>
                                    </td>
                                 </tr>`;
                    tableBody.append(row);
                });
            },
            error: function(xhr, status, error) {
                console.error('Failed to fetch courses:', error);
            }
        });
    });

    $(document).on('click', '.program-delete-btn', function() {
        var row = $(this).closest('tr');
        var id = row.data('id');

        console.log('Deleting program with ID:', id);

        if (id) {
            if (confirm('Are you sure you want to delete this student?')) {
            $.ajax({
                url: '/program/delete/' + id,
                type: 'DELETE',
                success: function(result) {
                    row.remove();
                    alert("Program deleted successfully!");
                    updateProgramCount();
                },
                error: function(xhr, status, error) {
                    console.error('Error deleting program:', xhr.responseText, status, error);
                    alert("Error deleting program.");
                }
            });
            }     
        } else {
            alert("Program ID not found.");
        }
    })

    $(document).on('click', '.program-update-btn', function() {
        var row = $(this).closest('tr');
        var id = row.find('td:eq(0)').text();
        var programCode = row.find('td:eq(1)').text();
        var programDesc = row.find('td:eq(2)').text();


        $('#update-program-id').val(id);
        $('#update-program-code').val(programCode);
        $('#update-program-description').val(programDesc);
        
        
        $('#update-program-modal').show(); // Show the update modal
    });

    $('#update-program-form').submit(function(e) {
        e.preventDefault();

        var id = $('#update-program-id').val();
        var programCode = $('#update-program-code').val();
        var programDescription = $('#update-program-description').val();

        $.ajax({
            type: 'PUT',
            url: '/program/update/' + id,
            contentType: 'application/json',
            data: JSON.stringify({
                programCode: programCode,
                programDesc: programDescription
            }),
            dataType: 'json',
            success: function(response) {
                alert("Program updated successfully!");
                updateCourseInTable(response);
                $('#update-program-modal').hide();
            },
            error: function(xhr, status, error) {
                console.error('Error updating program:', xhr.responseText, status, error);
                alert("Error updating program! " + xhr.responseText);
            }
        });
    });

    // Function to update the subject details in the table
    function updateCourseInTable(program) {
        var row = $('#program-table tbody tr[data-id="' + program.id + '"]');
        row.find('td:eq(0)').text(program.id);
        row.find('td:eq(1)').text(program.programCode);
        row.find('td:eq(2)').text(program.programDesc);
    }

    // Close modals
    $(document).on('click', '.close, .cancel-btn', function() {
        $('#update-program-modal').hide();
    });
    updateProgramCount();
});

function updateProgramCount() {
    $.ajax({
        url: '/program/count',
        method: 'GET',
        success: function(count) {
            $('#program-count').text(count);
        },
        error: function(xhr, status, error) {
            console.error('Error fetching program count:', status, error);
        }
    });
}
