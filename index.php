<?php

$server = new swoole_websocket_server('127.0.0.1', 9080);

// Open
$server->on('open', function (swoole_websocket_server $server, $request) {
    echo "User " . $request->fd . " connect \n";
});

// Close
$server->on('close', function ($server, $fd) {
    echo "User " . $fd . " disconnect \n";
});

// Message
$server->on('message', function (swoole_websocket_server $server, $frame) {
    echo "User " . $frame->fd . " send message" . $frame->data . "\n";

    foreach ($server->connections as $fd) {
        if ($frame->fd != $fd) {
            $server->push($fd, $frame->data);
        }
    }
});

// Start
$server->start();