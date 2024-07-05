<?php
    if (isset($_POST['name'])) {
        $object = [
            'id' => 8,
            'name' => 'Pepito Perez',
            'email' => 'pepito@gmail.com',
            'idAccount' => 1
        ];
        echo json_encode($object);
    } else {
        $object = [
            [
                'id' => 1,
                'name' => 'Pedro Parrales',
                'email' => 'pparrales@gmail.com',
                'idAccount' => 1,
                'fields' => [
                    'campo1' => [
                        'id' => 1,
                        'type' => 1,
                        'value' => 'Prueba'
                    ],
                    'campo2' => [
                        'id' => 2,
                        'type' => 1,
                        'value' => 'sjadfhf'
                    ],
                    'campo3' => [
                        'id' => 3,
                        'type' => 2,
                        'value' => 216546
                    ],
                    'campo4' => [
                        'id' => 4,
                        'type' => 3,
                        'value' => '2023-10-01 10:55:32'
                    ],
                    'campo5' => [
                        'id' => 5,
                        'type' => 4,
                        'idValue' => 1,
                        'value' => 'Prueba selector'
                    ]
                ]
            ],
            [
                'id' => 2,
                'name' => 'Laura Fernandez',
                'email' => 'laura@gmail.com',
                'idAccount' => 1,
                'fields' => [
                    'campo1' => [
                        'id' => 1,
                        'type' => 1,
                        'value' => 'djhfgjkhjhk'
                    ],
                    'campo2' => [
                        'id' => 2,
                        'type' => 1,
                        'value' => 'rtuuiulghf'
                    ],
                    'campo3' => [
                        'id' => 3,
                        'type' => 2,
                        'value' => 45678345
                    ],
                    'campo4' => [
                        'id' => 4,
                        'type' => 3,
                        'value' => '1990-05-02 00:00:00'
                    ],
                    'campo5' => [
                        'id' => 5,
                        'type' => 4,
                        'idValue' => 2,
                        'value' => 'Segunda opcion'
                    ]
                ]
            ]
        ];
        echo json_encode($object);
    }
?>