//
// Created by Sebastian on 20/11/2021.
//

#include "Server.h"
#include <fstream>

void show_json(
        json::value const &jvalue,
        utility::string_t const &prefix) {
    std::wcout << prefix << jvalue.serialize() << std::endl;
}

void Server::handle_get(const http_request& request) {
    std::cout << "get\n";
    auto requestContent = request.extract_json().get();

    double la1, lo1, la2, lo2, l;
    bool lat1 = false, lon1 = false, lat2 = false, lon2 = false, length = false;
    for (const auto &e: requestContent.as_object()) {
        if (e.first == L"lat1") {
            if (e.second.is_double()) {
                la1 = e.second.as_double();
                lat1 = true;
            } else {
                request.reply(status_codes::BadRequest);
                return;
            }
        } else if (e.first == L"lon1") {
            if (e.second.is_double()) {
                lo1 = e.second.as_double();
                lon1 = true;
            } else {
                request.reply(status_codes::BadRequest);
                return;
            }
        } else if (e.first == L"lat2") {
            if (e.second.is_double()) {
                la2 = e.second.as_double();
                lat2 = true;
            } else {
                request.reply(status_codes::BadRequest);
                return;
            }
        } else if (e.first == L"lon2") {
            if (e.second.is_double()) {
                lo2 = e.second.as_double();
                lon2 = true;
            } else {
                request.reply(status_codes::BadRequest);
                return;
            }
        } else if (e.first == L"length") {
            if (e.second.is_double()) {
                l = e.second.as_double();
                length = true;
            } else {
                request.reply(status_codes::BadRequest);
                return;
            }
        }
    }

    if(length && lat1 && lon1 && lat2 && lon2) {
        auto answer = json::value::object();

        MapOutput mapOutput = map.getAvailableParking(la1, lo1, la2, lo2);

        answer[L"availableParking"] = json::value::array();
        answer[L"parkingProbability"] = json::value::array();

        int count = 0;
        for (auto e: mapOutput.availableParkings) {
            auto object = json::value::object();
            if(l <= e.length) {
                object[L"lat"] = e.lat;
                object[L"lon"] = e.lon;
                object[L"length"] = e.length;
                answer[L"availableParking"].as_array()[count++] = object;
            }
        }

        for (auto e: mapOutput.parkingProbability) {
            auto object = json::value::object();
            object[L"lat"] = e.lat;
            object[L"lon"] = e.lon;
            object[L"amount"] = e.length;
            answer[L"parkingProbability"].as_array()[count++] = object;
        }

        request.reply(status_codes::OK, answer);
    }else{
        request.reply(status_codes::BadRequest);
    }
}

void Server::handle_post(const http_request &request) {
    std::cout << "post\n";
    auto requestContent = request.extract_json().get();

    Parking parking{};
    bool lat = false, lon = false, length = false;
    for (const auto &e: requestContent.as_object()) {
        if (e.first == L"lat") {
            if (e.second.is_double()) {
                parking.lat = e.second.as_double();
                lat = true;
            } else {
                request.reply(status_codes::BadRequest);
                return;
            }
        } else if (e.first == L"lon") {
            if (e.second.is_double()) {
                parking.lon = e.second.as_double();
                lon = true;
            } else {
                request.reply(status_codes::BadRequest);
                return;
            }
        } else if (e.first == L"length") {
            if (e.second.is_double()) {
                parking.length = e.second.as_double();
                length = true;
            } else {
                request.reply(status_codes::BadRequest);
                return;
            }
        }
    }

    if (lat && lon && length) {
        map.addParking(parking);
        request.reply(status_codes::OK);
    } else {
        request.reply(status_codes::BadRequest);
    }
}

Server::Server(const std::wstring &url) {
    map = Map();
    running = false;
    listener = http_listener(url);

    listener.support(methods::GET, std::bind(&Server::handle_get, this, std::placeholders::_1));
    listener.support(methods::POST, std::bind(&Server::handle_post, this, std::placeholders::_1));
}

void Server::run() {
    try {
        listener
                .open()
                //.then([this]() { std::cout << "\nstarting to listen\n"; })
                .wait();

        std::cout << "server started\n";
        running = true;
        while(running) {
            std::this_thread::sleep_for(std::chrono::milliseconds(2000));
        }
        std::cout << "shutting down\n";
    }
    catch (std::exception const &e) {
        std::cout << e.what() << std::endl;
    }
}

bool Server::isRunning() {
    return running;
}

void Server::stop() {
    running = false;
}
