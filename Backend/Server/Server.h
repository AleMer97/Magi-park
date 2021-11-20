//
// Created by Sebastian on 20/11/2021.
//

#ifndef MAGIPARK_SERVER_H
#define MAGIPARK_SERVER_H

#include <cpprest/http_listener.h>
#include <cpprest/json.h>
#include "../Json.h"
#include "../Map/Map.h"

using namespace web;
using namespace web::http;
using namespace web::http::experimental::listener;

class Server{
private:
    http_listener listener;
    std::atomic_bool running;

    Map map{};

    void handle_get(const http_request& request);
    void handle_post(const http_request &request);

public:
    explicit Server(const std::wstring& url);

    void run();
    bool isRunning();
    void stop();
};

#endif //MAGIPARK_SERVER_H
