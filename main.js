$(document).ready(function () {
    $('#subscribeForm').submit(function (event) {
        event.preventDefault();

        const formData = {
            name: $('#name').val().trim(),
            email: $('#email').val().trim(),
        };

        if (!formData.name || !formData.email) {
            $('#responseMessage').html('<p>Please fill out both fields.</p>');
            return;
        }

        $.ajax({
            type: 'POST',
            url: '/post-subscribe',
            data: formData,
            dataType: 'json',
            success: function (response) {
                $('#responseMessage').html(`<p>${response.message}</p>`);
                $('#subscribeForm').html(`<p>Thank you for subscribing, ${response.name}!</p>`);
            },
            error: function (xhr) {
                $('#responseMessage').html('<p>There was an error submitting the form. Please try again later.</p>');
            },
        });
    });
});
