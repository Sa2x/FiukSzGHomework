#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <stdexcept>
#include "CaffParser.h"

int main(int argc, char *argv[]) {
    std::string file_name;
    if(argc == 2) {
        file_name = argv[1];
    }
    else{
        std::cout << "Please give the parse to be file";
    }
    std::ifstream fin(file_name, std::ios::binary);
    if(!fin){
        throw std::invalid_argument("Wrong file name!");
    }
    CaffParser parser(fin);

    parser.parse();
    return 0;
}
