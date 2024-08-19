
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Us Message</title>
</head>

<body style="font-family: 'Arial', sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; text-align: center;">
    <h2 style="color: #333; text-align: center; margin-bottom: 10px;">Toyota Rawal Motors</h2>

    <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <!-- Header - Register -->
        <h3 style="color: #333; text-align: left; margin-bottom: 10px;"></h3>

        <!-- User Data -->
        <div style="text-align: left; color: #555; font-size: 14px; margin-bottom: 15px;">
            <p>User Name: <strong style="color: #333;">{{ $data['name'] }}</strong></p>
            <p>We have received your message and will get back to you soon.</p>
            <p>User Email: <strong style="color: #007bff;">{{ $data['email'] }}</strong></p>
            <p>User Phone:<strong style="color: #007bff;"> {{ $data['phone'] }}</strong></p>
            <p>Query Type:<strong style="color: #007bff;"> {{ $data['query_type'] }}</strong></p>
            <p>Message:<strong style="color: #007bff;"> {{ $data['message'] }}</strong></p>
        </div>

        <!-- Footer - Regards CollaborationHub -->
        <p style="color: #777; font-size: 14px; text-align: left; margin-bottom: 40px;">
            Regards<br>
            Toyota Rawal Motors Customer Support Team
        </p>
    </div>
</body>

</html>