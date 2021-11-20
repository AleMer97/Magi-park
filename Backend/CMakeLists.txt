cmake_minimum_required(VERSION 3.0)
project(Magipark)

set(CMAKE_CXX_STANDARD 14)

find_package(cpprestsdk REQUIRED)

add_executable(Magipark main.cpp Server/Server.h Server/Server.cpp Map/KD-Tree.h Map/Map.h Json.h Map/Map.cpp Map/KD-Tree.cpp)

target_link_libraries(Magipark PRIVATE cpprestsdk::cpprest)