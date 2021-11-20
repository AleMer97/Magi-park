#include <iostream>
#include "Server/Server.h"
#include <cpprest/http_client.h>

using namespace web;
using namespace web::http;
using namespace web::http::client;

void display_json(
        json::value const & jvalue,
        utility::string_t const & prefix)
{
    std::wcout << prefix << jvalue.serialize() << std::endl;
}

pplx::task<http_response> make_task_request(
        http_client & client,
        method mtd,
        json::value const & jvalue)
{
    return (mtd == methods::GET || mtd == methods::HEAD) ?
           client.request(mtd, L"/Magipark") :
           client.request(mtd, L"/Magipark", jvalue);
}

void make_request(
        http_client & client,
        method mtd,
        json::value const & jvalue)
{
    make_task_request(client, mtd, jvalue)
            .then([](http_response response)
                  {
                      if (response.status_code() == status_codes::OK)
                      {
                          return response.extract_json();
                      }
                      return pplx::task_from_result(json::value());
                  })
            .then([](pplx::task<json::value> previousTask)
                  {
                      try
                      {
                          display_json(previousTask.get(), L"R: ");
                      }
                      catch (http_exception const & e)
                      {
                          std::cout << e.what() << std::endl;
                      }
                  })
            .wait();
}

int main() {
    Server server(L"http://10.0.0.146:8080/Magipark");
    std::thread server_thread(&Server::run, &server);
    while(!server.isRunning());

    /*http_client client(U("http://10.0.0.146:8080"));

    auto parking = json::value::object();
    parking[L"lat"] = json::value::number(44.8);
    parking[L"lon"] = json::value::number(85.32);
    parking[L"length"] = json::value::number(10.5);

    display_json(parking, L"Input: ");
    make_request(client, methods::POST, parking);*/
    while(true);

    server.stop();
    server_thread.join();
    return 0;
}
