<?php
if (isset($_POST['username']) && $_POST['username'] == 'superadmin@lookproxy.com') {
    $response = [
        'status' => 200,
        'token' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkRZVkFMU0EiLCJuYmYiOjE2OTgwNzA0MjIsImV4cCI6MTY5ODA3MjIyMiwiaWF0IjoxNjk4MDcwNDIyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQ5MjIwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0OTIyMCJ9.xMP66w06eZB4tLMaJEEKCpgkX6i_Tk-fTSGLh8P5v5c'
    ];
    echo json_encode($response);
} else {
    $response = [
        'status' => 403,
        'message' => 'Usuario y/o contraseña erroneos'
    ];
    echo json_encode($response);
}